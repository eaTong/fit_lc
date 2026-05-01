const { formatRelativeTime, formatWeight } = require('../../../../utils/format');

describe('format utils', () => {
  describe('formatRelativeTime', () => {
    test('返回刚刚（< 1分钟）', () => {
      const now = Date.now();
      expect(formatRelativeTime(now)).toBe('刚刚');
    });

    test('返回N分钟前（< 1小时）', () => {
      const fiveMinAgo = Date.now() - 5 * 60000;
      expect(formatRelativeTime(fiveMinAgo)).toBe('5分钟前');
    });

    test('返回N小时前（< 1天）', () => {
      const twoHoursAgo = Date.now() - 2 * 3600000;
      expect(formatRelativeTime(twoHoursAgo)).toBe('2小时前');
    });

    test('返回N天前（< 7天）', () => {
      const threeDaysAgo = Date.now() - 3 * 86400000;
      expect(formatRelativeTime(threeDaysAgo)).toBe('3天前');
    });
  });

  describe('formatWeight', () => {
    test('格式kg', () => {
      expect(formatWeight(100)).toBe('100kg');
    });

    test('格式t（>= 1000kg）', () => {
      expect(formatWeight(1500)).toBe('1.5t');
    });
  });
});