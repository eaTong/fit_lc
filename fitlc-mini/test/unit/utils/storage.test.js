const storage = require('../../../../utils/storage');

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

    test('返回解析后的缓存数据', () => {
      const messages = [{ id: '1', text: 'hello' }];
      wx.getStorageSync.mockReturnValue(JSON.stringify(messages));
      expect(storage.getCachedMessages()).toEqual(messages);
    });
  });

  describe('setCachedMessages', () => {
    test('正确存储消息', () => {
      const messages = [{ id: '1', text: 'hello' }];
      storage.setCachedMessages(messages);
      expect(wx.setStorageSync).toHaveBeenCalledWith(
        'fitlc_messages',
        JSON.stringify(messages)
      );
    });
  });
});