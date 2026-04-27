// 日期工具函数

/**
 * Convert Date to YYYY-MM-DD string
 * @param {Date|string|number} d - Date object, ISO string, or timestamp
 */
export function toDateStr(d) {
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) {
    throw new Error('无效的日期参数');
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Add n days to a date
 * @param {Date|string|number} d - Date object, ISO string, or timestamp
 * @param {number} n - Number of days to add (can be negative)
 */
export function addDays(d, n) {
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) {
    throw new Error('无效的日期参数');
  }
  date.setDate(date.getDate() + n);
  return toDateStr(date);
}

/**
 * Get week boundary dates
 * @param {Date|string|number} [date=new Date()] - Reference date
 * Returns Monday as start of week (ISO convention)
 */
export function getWeekBounds(date = new Date()) {
  const today = date instanceof Date ? date : new Date(date);
  if (isNaN(today.getTime())) {
    throw new Error('无效的日期参数');
  }

  // Get day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
  const dayOfWeek = today.getDay();

  // Calculate offset to Monday (ISO week: Monday=1, Sunday=7)
  // If Sunday (0), offset is 6 (go back 6 days to Monday)
  // Otherwise, offset is (dayOfWeek - 1)
  const offsetToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const monday = new Date(today);
  monday.setDate(today.getDate() - offsetToMonday);

  const tuesday = new Date(monday);
  tuesday.setDate(monday.getDate() + 1);

  const wednesday = new Date(monday);
  wednesday.setDate(monday.getDate() + 2);

  const lastMonday = new Date(monday);
  lastMonday.setDate(monday.getDate() - 7);

  const lastSunday = new Date(monday);
  lastSunday.setDate(monday.getDate() - 1);

  return {
    today: toDateStr(today),
    yesterday: addDays(today, -1),
    tomorrow: addDays(today, 1),
    dayAfterTomorrow: addDays(today, 2),
    startOfThisWeek: toDateStr(monday),
    startOfLastWeek: toDateStr(lastMonday),
    endOfLastWeek: toDateStr(lastSunday),
    startOfWeekStr: toDateStr(monday) // Alias for compatibility
  };
}
