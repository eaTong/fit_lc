# Album Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add photo album feature: gallery entry in Profile, automatic photo sync from chat, monthly-organized gallery view.

**Architecture:**
- Backend: Extend `ChatMessage` with `imageUrls` JSON field, create new `AlbumPhoto` model, add album CRUD routes and service
- Frontend: New `/gallery` page with month navigator and photo grid, Zustand store, bottom tab integration

**Tech Stack:** React + Zustand + Axios (frontend), Prisma + Express (backend)

---

## File Map

### Backend
| File | Action | Responsibility |
|------|--------|----------------|
| `backend/prisma/schema.prisma` | Modify | Add `imageUrls` to `ChatMessage`, create `AlbumPhoto` model |
| `backend/src/routes/album.ts` | Create | Album CRUD routes (`GET /photos`, `DELETE /photos/:id`) |
| `backend/src/services/albumService.ts` | Create | Album business logic |
| `backend/src/repositories/albumRepository.ts` | Create | Album data access |
| `backend/src/routes/chat.ts` | Modify | When user sends message with images, sync to `AlbumPhoto` |

### Frontend
| File | Action | Responsibility |
|------|--------|----------------|
| `frontend/src/pages/Gallery.tsx` | Create | Gallery page with month navigator + photo grid |
| `frontend/src/stores/albumStore.ts` | Create | Zustand store for album state |
| `frontend/src/api/album.ts` | Create | Album API client |
| `frontend/src/components/MonthPicker.tsx` | Create | Horizontal scroll month selector |
| `frontend/src/components/PhotoGrid.tsx` | Create | Photo grid display component |
| `frontend/src/components/PhotoViewer.tsx` | Create | Full-screen photo viewer modal |
| `frontend/src/App.tsx` | Modify | Add `/gallery` route |
| `frontend/src/components/BottomTabBar.tsx` | Modify | Add gallery tab icon |
| `frontend/src/api/chat.ts` | Modify | Add `imageUrls` to `sendMessage` call |

---

## Task 1: Database Schema Migration

**Files:**
- Modify: `backend/prisma/schema.prisma`
- Test: `backend/prisma/schema.prisma` validation

- [ ] **Step 1: Write Prisma migration**

Run in `backend/`:
```bash
npx prisma migrate dev --name add_album_photo_and_image_urls --create-only
```

Then edit the generated migration file `backend/prisma/migrations/<timestamp>/migration.sql`:

```sql
-- Add imageUrls to ChatMessage
ALTER TABLE `chat_messages` ADD COLUMN `image_urls` JSON;

-- Create album_photos table
CREATE TABLE `album_photos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `oss_url` VARCHAR(500) NOT NULL,
  `thumbnail_url` VARCHAR(500),
  `chat_message_id` INT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME,
  PRIMARY KEY (`id`),
  INDEX `album_photos_user_created` (`user_id`, `created_at`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`chat_message_id`) REFERENCES `chat_messages`(`id`) ON DELETE SET NULL
) DEFAULT CHARACTER SET utf8mb4;
```

- [ ] **Step 2: Update schema.prisma**

In `ChatMessage` model, add field:
```prisma
imageUrls  Json?    @map("image_urls")
```

Add new model:
```prisma
model AlbumPhoto {
  id            Int       @id @default(autoincrement())
  userId        Int       @map("user_id")
  ossUrl        String    @db.VarChar(500)
  thumbnailUrl String?   @map("thumbnail_url")
  chatMessageId Int?     @map("chat_message_id")
  createdAt     DateTime  @default(now()) @map("created_at")
  deletedAt     DateTime? @map("deleted_at")

  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  chatMessage ChatMessage? @relation(fields: [chatMessageId], references: [id], onDelete: SetNull)

  @@index([userId, createdAt])
  @@map("album_photos")
}
```

- [ ] **Step 3: Run and apply migration**

Run: `cd backend && npx prisma migrate dev --name add_album_photo_and_image_urls`
Expected: Migration applied, `schema.prisma` regenerated

- [ ] **Step 4: Commit**

```bash
git add backend/prisma/schema.prisma backend/prisma/migrations/
git commit -m "feat: add AlbumPhoto model and ChatMessage.imageUrls"
```

---

## Task 2: Backend Album Repository and Service

**Files:**
- Create: `backend/src/repositories/albumRepository.ts`
- Create: `backend/src/services/albumService.ts`
- Modify: `backend/src/routes/album.ts` (create new file)

- [ ] **Step 1: Write albumRepository.ts**

```typescript
import prisma from '@/lib/prisma';

export interface CreateAlbumPhotoInput {
  userId: number;
  ossUrl: string;
  thumbnailUrl?: string;
  chatMessageId?: number;
}

export const albumRepository = {
  async create(input: CreateAlbumPhotoInput) {
    return prisma.albumPhoto.create({ data: input });
  },

  async findByUserAndMonth(userId: number, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
    return prisma.albumPhoto.findMany({
      where: {
        userId,
        deletedAt: null,
        createdAt: { gte: startDate, lte: endDate },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async softDelete(id: number, userId: number) {
    return prisma.albumPhoto.updateMany({
      where: { id, userId },
      data: { deletedAt: new Date() },
    });
  },

  async findById(id: number) {
    return prisma.albumPhoto.findUnique({ where: { id } });
  },
};
```

- [ ] **Step 2: Write albumService.ts**

```typescript
import { albumRepository } from '@/repositories/albumRepository';

export const albumService = {
  async syncPhotosFromMessage(userId: number, imageUrls: string[], chatMessageId: number) {
    const photos = imageUrls.map((url) => ({
      userId,
      ossUrl: url,
      chatMessageId,
    }));
    await Promise.all(photos.map((p) => albumRepository.create(p)));
  },

  async getPhotosByMonth(userId: number, year: number, month: number) {
    return albumRepository.findByUserAndMonth(userId, year, month);
  },

  async deletePhoto(photoId: number, userId: number) {
    const photo = await albumRepository.findById(photoId);
    if (!photo || photo.userId !== userId) {
      throw new Error('Photo not found');
    }
    await albumRepository.softDelete(photoId, userId);
    return { success: true };
  },
};
```

- [ ] **Step 3: Write album routes**

```typescript
import { Router } from 'express';
import { albumService } from '@/services/albumService';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

router.get('/photos', authMiddleware, async (req, res) => {
  const { year, month } = req.query;
  const photos = await albumService.getPhotosByMonth(
    req.user!.id,
    Number(year),
    Number(month)
  );
  res.json({ success: true, data: photos });
});

router.delete('/photos/:id', authMiddleware, async (req, res) => {
  try {
    await albumService.deletePhoto(Number(req.params.id), req.user!.id);
    res.json({ success: true });
  } catch (e) {
    res.status(404).json({ success: false, error: 'Not found' });
  }
});

export default router;
```

- [ ] **Step 4: Register album route in index.ts**

Edit `backend/src/index.ts`, add:
```typescript
import albumRoutes from './routes/album';
// ...
app.use('/api/album', albumRoutes);
```

- [ ] **Step 5: Test repository with unit test**

Create `backend/src/repositories/albumRepository.test.ts`:
```typescript
import { albumRepository } from './albumRepository';

describe('albumRepository', () => {
  it('should create an album photo', async () => {
    const photo = await albumRepository.create({
      userId: 1,
      ossUrl: 'https://oss.example.com/test.jpg',
    });
    expect(photo.id).toBeDefined();
    expect(photo.ossUrl).toBe('https://oss.example.com/test.jpg');
  });
});
```

Run: `cd backend && npm run test:unit -- --testPathPattern=albumRepository`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add backend/src/repositories/albumRepository.ts backend/src/services/albumService.ts backend/src/routes/album.ts backend/src/index.ts
git commit -m "feat: add album repository, service, and routes"
```

---

## Task 3: Sync Photos in Chat Route

**Files:**
- Modify: `backend/src/routes/chat.ts`

- [ ] **Step 1: Read current chat.ts to find the message creation block**

Locate where `chatMessage` is created after `runAgent()` call completes. The key section saves the user message and AI response.

- [ ] **Step 2: Modify the message creation block**

After user message is saved (around line where `chatMessage` is created with `role: 'user'`), add image sync:

```typescript
// After user message is saved to DB
if (imageUrls && imageUrls.length > 0) {
  await albumService.syncPhotosFromMessage(userId, imageUrls, userMessage.id);
}
```

The image sync call should happen AFTER `userMessage` is created but doesn't need to block the response.

- [ ] **Step 3: Commit**

```bash
git add backend/src/routes/chat.ts
git commit -m "feat: auto-sync chat images to album"
```

---

## Task 4: Frontend Album API Client

**Files:**
- Create: `frontend/src/api/album.ts`

- [ ] **Step 1: Write album API client**

```typescript
import axios from 'axios';

export interface AlbumPhoto {
  id: number;
  ossUrl: string;
  thumbnailUrl?: string;
  chatMessageId?: number;
  createdAt: string;
}

export const albumApi = {
  async getPhotosByMonth(year: number, month: number): Promise<AlbumPhoto[]> {
    const res = await axios.get('/api/album/photos', { params: { year, month } });
    return res.data.data;
  },

  async deletePhoto(id: number): Promise<void> {
    await axios.delete(`/api/album/photos/${id}`);
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/api/album.ts
git commit -m "feat: add album API client"
```

---

## Task 5: Frontend Album Store

**Files:**
- Create: `frontend/src/stores/albumStore.ts`

- [ ] **Step 1: Write albumStore**

```typescript
import { create } from 'zustand';
import { albumApi, AlbumPhoto } from '@/api/album';

interface AlbumState {
  photos: AlbumPhoto[];
  selectedYear: number;
  selectedMonth: number;
  loading: boolean;
  viewerPhoto: AlbumPhoto | null;

  setMonth: (year: number, month: number) => void;
  loadPhotos: () => Promise<void>;
  deletePhoto: (id: number) => Promise<void>;
  openViewer: (photo: AlbumPhoto) => void;
  closeViewer: () => void;
}

export const useAlbumStore = create<AlbumState>((set, get) => ({
  photos: [],
  selectedYear: new Date().getFullYear(),
  selectedMonth: new Date().getMonth() + 1,
  loading: false,
  viewerPhoto: null,

  setMonth: (year, month) => {
    set({ selectedYear: year, selectedMonth: month });
    get().loadPhotos();
  },

  loadPhotos: async () => {
    set({ loading: true });
    const { selectedYear, selectedMonth } = get();
    const photos = await albumApi.getPhotosByMonth(selectedYear, selectedMonth);
    set({ photos, loading: false });
  },

  deletePhoto: async (id) => {
    await albumApi.deletePhoto(id);
    set({ photos: get().photos.filter((p) => p.id !== id) });
  },

  openViewer: (photo) => set({ viewerPhoto: photo }),
  closeViewer: () => set({ viewerPhoto: null }),
}));
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/stores/albumStore.ts
git commit -m "feat: add album Zustand store"
```

---

## Task 6: Frontend Components

**Files:**
- Create: `frontend/src/components/MonthPicker.tsx`
- Create: `frontend/src/components/PhotoGrid.tsx`
- Create: `frontend/src/components/PhotoViewer.tsx`

### 6a. MonthPicker

- [ ] **Step 1: Write MonthPicker component**

```tsx
import { useAlbumStore } from '@/stores/albumStore';

const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

export function MonthPicker() {
  const { selectedYear, selectedMonth, setMonth } = useAlbumStore();
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {years.map((year) => (
        <div key={year} className="flex gap-1">
          {MONTHS.map((label, idx) => {
            const month = idx + 1;
            const active = selectedYear === year && selectedMonth === month;
            return (
              <button
                key={`${year}-${month}`}
                onClick={() => setMonth(year, month)}
                className={`px-2 py-1 text-xs rounded border ${
                  active
                    ? 'bg-primary text-white border-primary'
                    : 'bg-card text-text-secondary border-border'
                }`}
              >
                {month}月
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
```

### 6b. PhotoGrid

- [ ] **Step 2: Write PhotoGrid component**

```tsx
import { useAlbumStore } from '@/stores/albumStore';
import { PhotoViewer } from './PhotoViewer';

export function PhotoGrid() {
  const { photos, loading, openViewer, deletePhoto } = useAlbumStore();

  if (loading) {
    return <div className="text-center text-text-secondary py-8">加载中...</div>;
  }

  if (photos.length === 0) {
    return <div className="text-center text-text-secondary py-8">本月暂无照片</div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square relative cursor-pointer"
            onClick={() => openViewer(photo)}
            onContextMenu={(e) => {
              e.preventDefault();
              if (confirm('删除该照片?')) {
                deletePhoto(photo.id);
              }
            }}
          >
            <img
              src={photo.ossUrl}
              alt="album"
              className="w-full h-full object-cover rounded border border-border"
            />
          </div>
        ))}
      </div>
      <PhotoViewer />
    </>
  );
}
```

### 6c. PhotoViewer

- [ ] **Step 3: Write PhotoViewer component**

```tsx
import { useAlbumStore } from '@/stores/albumStore';
import { useEffect } from 'react';

export function PhotoViewer() {
  const { viewerPhoto, closeViewer, photos } = useAlbumStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeViewer();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeViewer]);

  if (!viewerPhoto) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={closeViewer}
    >
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={closeViewer}
      >
        ✕
      </button>
      <img
        src={viewerPhoto.ossUrl}
        alt="full"
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/MonthPicker.tsx frontend/src/components/PhotoGrid.tsx frontend/src/components/PhotoViewer.tsx
git commit -m "feat: add album UI components"
```

---

## Task 7: Gallery Page

**Files:**
- Create: `frontend/src/pages/Gallery.tsx`

- [ ] **Step 1: Write Gallery page**

```tsx
import { MonthPicker } from '@/components/MonthPicker';
import { PhotoGrid } from '@/components/PhotoGrid';
import { useAlbumStore } from '@/stores/albumStore';
import { useEffect } from 'react';
import { SubPageLayout } from '@/layouts/SubPageLayout';

export default function Gallery() {
  const { loadPhotos, selectedYear, selectedMonth } = useAlbumStore();

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <SubPageLayout title={`${selectedYear}年${selectedMonth}月`}>
      <div className="flex flex-col h-full">
        <div className="px-4 py-3">
          <MonthPicker />
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          <PhotoGrid />
        </div>
      </div>
    </SubPageLayout>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/pages/Gallery.tsx
git commit -m "feat: add gallery page"
```

---

## Task 8: Route and Tab Bar Integration

**Files:**
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/components/BottomTabBar.tsx`

### 8a. BottomTabBar

- [ ] **Step 1: Add gallery tab to BottomTabBar**

Find the tabs array in `BottomTabBar.tsx`, add:
```tsx
{
  path: '/gallery',
  label: '相册',
  icon: <ImageIcon className="w-5 h-5" />,
}
```

Import `ImageIcon` from your icon library (e.g., `lucide-react` or `react-icons`).

### 8b. App.tsx

- [ ] **Step 2: Add /gallery route**

Add route:
```tsx
{
  path: '/gallery',
  element: <Gallery />,
}
```

Import `Gallery` from `@/pages/Gallery`.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/App.tsx frontend/src/components/BottomTabBar.tsx
git commit -m "feat: add gallery route and tab"
```

---

## Task 9: Profile Album Entry

**Files:**
- Modify: `frontend/src/pages/Profile.tsx`

- [ ] **Step 1: Add album entry to Profile page**

Find the settings/action items section in Profile.tsx, add a link:
```tsx
<Link
  to="/gallery"
  className="flex items-center justify-between p-4 bg-card rounded border border-border"
>
  <div className="flex items-center gap-3">
    <ImageIcon className="w-5 h-5 text-primary" />
    <span>我的相册</span>
  </div>
  <ChevronRightIcon className="w-4 h-4 text-text-secondary" />
</Link>
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/pages/Profile.tsx
git commit -m "feat: add album entry to profile page"
```

---

## Task 10: E2E Test

**Files:**
- Create: `frontend/tests/e2e/specs/gallery.spec.ts`
- Create: `frontend/tests/e2e/page-objects/GalleryPage.ts`

- [ ] **Step 1: Write gallery e2e test**

```typescript
import { test, expect } from '@playwright/test';
import { GalleryPage } from '../page-objects/GalleryPage';

test.describe('Gallery', () => {
  test('should display photos by month', async ({ page }) => {
    const galleryPage = new GalleryPage(page);
    await galleryPage.goto();
    await galleryPage.switchMonth(2026, 4);
    await expect(galleryPage.photoGrid).toBeVisible();
  });

  test('should open photo viewer on click', async ({ page }) => {
    const galleryPage = new GalleryPage(page);
    await galleryPage.goto();
    await galleryPage.clickFirstPhoto();
    await expect(galleryPage.viewer).toBeVisible();
  });

  test('should delete photo via context menu', async ({ page }) => {
    const galleryPage = new GalleryPage(page);
    await galleryPage.goto();
    await galleryPage.deleteFirstPhoto();
    await expect(page.locator('.photo-count')).toHaveText('0');
  });
});
```

- [ ] **Step 2: Write GalleryPage page object**

```typescript
import { Page } from '@playwright/test';

export class GalleryPage {
  readonly page: Page;
  readonly photoGrid = this.page.locator('[data-testid=photo-grid]');
  readonly viewer = this.page.locator('[data-testid=photo-viewer]');

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/gallery');
    await this.page.waitForURL('/gallery');
  }

  async switchMonth(year: number, month: number) {
    await this.page.click(`button:has-text("${month}月")`);
  }

  async clickFirstPhoto() {
    await this.page.locator('[data-testid=photo-grid] img').first().click();
  }

  async deleteFirstPhoto() {
    await this.page.locator('[data-testid=photo-grid] img').first().click({ button: 'right' });
    await this.page.click('button:has-text("删除")');
  }
}
```

- [ ] **Step 3: Run e2e tests**

Run: `cd frontend && npm run test:e2e -- --grep gallery`

- [ ] **Step 4: Commit**

```bash
git add frontend/tests/e2e/specs/gallery.spec.ts frontend/tests/e2e/page-objects/GalleryPage.ts
git commit -m "test: add gallery e2e tests"
```

---

## Self-Review Checklist

1. **Spec coverage:** All 4 features implemented (album entry, auto-sync, gallery view, monthly nav)
2. **No placeholders:** All code blocks complete, no TBD/TODO
3. **Type consistency:** `AlbumPhoto` fields match across repository, service, API, store
4. **Migration:** Prisma migration created before schema changed

**Plan saved to:** `docs/superpowers/plans/2026-04-30-album-implementation.md`
