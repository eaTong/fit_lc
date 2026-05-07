import { describe, it, expect, beforeEach } from '@jest/globals';

// Create mock functions at module scope
const mockCreate = jest.fn();
const mockFindUnique = jest.fn();
const mockFindMany = jest.fn();
const mockUpdateMany = jest.fn();

// Mock the entire prisma module with __esModule flag
jest.mock('../../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    albumPhoto: {
      create: mockCreate,
      findUnique: mockFindUnique,
      findMany: mockFindMany,
      updateMany: mockUpdateMany,
    },
  },
}));

// Import after mock is set up
import { albumRepository } from '../../../src/repositories/albumRepository';

describe('AlbumRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a photo with correct fields', async () => {
      const input = {
        userId: 1,
        ossUrl: 'https://example.com/photo.jpg',
        thumbnailUrl: 'https://example.com/thumb.jpg',
        chatMessageId: 10,
      };

      const expectedPhoto = {
        id: 1,
        ...input,
        createdAt: new Date(),
        deletedAt: null,
      };

      mockCreate.mockResolvedValue(expectedPhoto);

      const result = await albumRepository.create(input);

      expect(mockCreate).toHaveBeenCalledWith({ data: input });
      expect(result).toEqual(expectedPhoto);
      expect(result.id).toBe(1);
      expect(result.ossUrl).toBe('https://example.com/photo.jpg');
      expect(result.userId).toBe(1);
      expect(result.chatMessageId).toBe(10);
    });

    it('should create a photo without optional fields', async () => {
      const input = {
        userId: 1,
        ossUrl: 'https://example.com/photo.jpg',
      };

      const expectedPhoto = {
        id: 2,
        ...input,
        thumbnailUrl: null,
        chatMessageId: null,
        createdAt: new Date(),
        deletedAt: null,
      };

      mockCreate.mockResolvedValue(expectedPhoto);

      const result = await albumRepository.create(input);

      expect(mockCreate).toHaveBeenCalledWith({ data: input });
      expect(result.thumbnailUrl).toBeNull();
      expect(result.chatMessageId).toBeNull();
    });
  });

  describe('findByUserAndMonth', () => {
    it('should filter photos by userId and month correctly', async () => {
      const userId = 1;
      const year = 2026;
      const month = 4;

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);

      const expectedPhotos = [
        {
          id: 1,
          userId: 1,
          ossUrl: 'https://example.com/photo1.jpg',
          thumbnailUrl: null,
          chatMessageId: null,
          deletedAt: null,
          createdAt: new Date(2026, 3, 15),
        },
        {
          id: 2,
          userId: 1,
          ossUrl: 'https://example.com/photo2.jpg',
          thumbnailUrl: null,
          chatMessageId: null,
          deletedAt: null,
          createdAt: new Date(2026, 3, 20),
        },
      ];

      mockFindMany.mockResolvedValue(expectedPhotos);

      const result = await albumRepository.findByUserAndMonth(userId, year, month);

      expect(mockFindMany).toHaveBeenCalledWith({
        where: {
          userId,
          deletedAt: null,
          createdAt: { gte: startDate, lte: endDate },
        },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it('should return empty array when no photos exist for the month', async () => {
      mockFindMany.mockResolvedValue([]);

      const result = await albumRepository.findByUserAndMonth(999, 2026, 4);

      expect(result).toEqual([]);
      expect(mockFindMany).toHaveBeenCalled();
    });
  });

  describe('softDelete', () => {
    it('should set deletedAt on the photo', async () => {
      const photoId = 1;
      const userId = 1;

      mockUpdateMany.mockResolvedValue({ count: 1 });

      await albumRepository.softDelete(photoId, userId);

      expect(mockUpdateMany).toHaveBeenCalledWith({
        where: { id: photoId, userId },
        data: { deletedAt: expect.any(Date) },
      });
    });

    it('should not affect other users photos', async () => {
      mockUpdateMany.mockResolvedValue({ count: 0 });

      await albumRepository.softDelete(999, 999);

      expect(mockUpdateMany).toHaveBeenCalledWith({
        where: { id: 999, userId: 999 },
        data: { deletedAt: expect.any(Date) },
      });
    });
  });

  describe('findById', () => {
    it('should return a photo by id', async () => {
      const expectedPhoto = {
        id: 1,
        userId: 1,
        ossUrl: 'https://example.com/photo.jpg',
        thumbnailUrl: null,
        chatMessageId: null,
        deletedAt: null,
        createdAt: new Date(),
      };

      mockFindUnique.mockResolvedValue(expectedPhoto);

      const result = await albumRepository.findById(1);

      expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(expectedPhoto);
    });

    it('should return null when photo not found', async () => {
      mockFindUnique.mockResolvedValue(null);

      const result = await albumRepository.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('findByUserAll', () => {
    it('should return all photos for a user ordered by createdAt desc', async () => {
      const userId = 1;
      const expectedPhotos = [
        {
          id: 2,
          userId: 1,
          ossUrl: 'https://example.com/photo2.jpg',
          thumbnailUrl: null,
          chatMessageId: null,
          deletedAt: null,
          createdAt: new Date(2026, 3, 20),
        },
        {
          id: 1,
          userId: 1,
          ossUrl: 'https://example.com/photo1.jpg',
          thumbnailUrl: null,
          chatMessageId: null,
          deletedAt: null,
          createdAt: new Date(2026, 3, 15),
        },
      ];

      mockFindMany.mockResolvedValue(expectedPhotos);

      const result = await albumRepository.findByUserAll(userId);

      expect(mockFindMany).toHaveBeenCalledWith({
        where: { userId, deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(2); // newest first
      expect(result[1].id).toBe(1);
    });

    it('should return empty array when user has no photos', async () => {
      mockFindMany.mockResolvedValue([]);

      const result = await albumRepository.findByUserAll(999);

      expect(result).toEqual([]);
      expect(mockFindMany).toHaveBeenCalled();
    });

    it('should exclude deleted photos', async () => {
      const userId = 1;
      mockFindMany.mockResolvedValue([]);

      await albumRepository.findByUserAll(userId);

      expect(mockFindMany).toHaveBeenCalledWith({
        where: { userId, deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});