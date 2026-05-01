/**
 * 格式化日期
 */
const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second);
};

/**
 * 格式化相对时间
 */
const formatRelativeTime = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return '刚刚';
  if (diff < hour) return `${Math.floor(diff / minute)}分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)}小时前`;
  if (diff < 7 * day) return `${Math.floor(diff / day)}天前`;

  return formatDate(timestamp);
};

/**
 * 格式化数字（重量、围度等）
 */
const formatNumber = (num, unit = '') => {
  if (typeof num !== 'number') return num;
  return `${num}${unit}`;
};

/**
 * 格式化训练动作
 */
const formatWorkoutExercise = (exercise) => {
  const sets = exercise.sets.map(s => `${s.weight}kg×${s.reps}`).join(' / ');
  return `${exercise.exerciseName}: ${sets}`;
};

/**
 * 格式化围度
 */
const formatMeasurement = (bodyPart, value) => {
  const partNames = {
    chest: '胸围',
    waist: '腰围',
    hips: '臀围',
    biceps: '臂围',
    thighs: '大腿',
    calves: '小腿',
    weight: '体重',
    bodyFat: '体脂'
  };
  return `${partNames[bodyPart] || bodyPart}: ${value}cm`;
};

/**
 * 截断文本
 */
const truncate = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

module.exports = {
  formatDate,
  formatRelativeTime,
  formatNumber,
  formatWorkoutExercise,
  formatMeasurement,
  truncate
};