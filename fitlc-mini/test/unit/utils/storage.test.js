const storage = require('../../../utils/storage');

// Mock wx API
global.wx = {
  getStorageSync: jest.fn(),
  setStorageSync: jest.fn()
};

describe('storage utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCachedMessages', () => {
    test('返回空数组当无缓存', () => {
      wx.getStorageSync.mockReturnValue(null);
      expect(storage.getCachedMessages()).toEqual([]);
    });

    test('返回null当解析失败', () => {
      wx.getStorageSync.mockReturnValue('invalid-json');
      expect(storage.getCachedMessages()).toBeNull();
    });

    test('返回解析后的缓存数据', () => {
      const messages = [{ id: '1', text: 'hello' }];
      wx.getStorageSync.mockReturnValue(JSON.stringify(messages));
      expect(storage.getCachedMessages()).toEqual(messages);
    });
  });

  describe('setCachedMessages', () => {
    test('正确存储消息', () => {
      const messages = [{ id: '1', text: 'hello' }];
      const result = storage.setCachedMessages(messages);
      expect(result).toBe(true);
      expect(wx.setStorageSync).toHaveBeenCalledWith(
        'fitlc_messages',
        JSON.stringify(messages)
      );
    });

    test('存储失败返回false', () => {
      wx.setStorageSync.mockImplementation(() => {
        throw new Error('storage error');
      });
      const result = storage.setCachedMessages([]);
      expect(result).toBe(false);
    });
  });
});