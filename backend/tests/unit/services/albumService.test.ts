import { describe, it, expect } from '@jest/globals';
import { albumService } from '../../../src/services/albumService';

// Mock repositories
jest.mock('../../../src/repositories/albumRepository');
jest.mock('../../../src/config/prisma');

describe('AlbumService', () => {
  describe('method existence', () => {
    it('should have syncPhotosFromMessage method', () => {
      expect(typeof albumService.syncPhotosFromMessage).toBe('function');
    });

    it('should have getPhotosByMonth method', () => {
      expect(typeof albumService.getPhotosByMonth).toBe('function');
    });

    it('should have deletePhoto method', () => {
      expect(typeof albumService.deletePhoto).toBe('function');
    });

    it('should have getAllPhotos method', () => {
      expect(typeof albumService.getAllPhotos).toBe('function');
    });
  });
});