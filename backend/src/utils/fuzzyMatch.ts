/**
 * 模糊匹配两个动作名称
 * 支持同义词、简称匹配
 * @param name1 计划中的动作名称
 * @param name2 用户训练的动作名称
 * @returns 是否匹配
 */
export function fuzzyMatch(name1: string, name2: string): boolean {
  const n1 = name1.toLowerCase().trim();
  const n2 = name2.toLowerCase().trim();

  // 完全相等
  if (n1 === n2) return true;

  // 包含匹配
  if (n1.includes(n2) || n2.includes(n1)) return true;

  // 移除常见词后匹配
  const clean1 = removeCommonWords(n1);
  const clean2 = removeCommonWords(n2);
  if (clean1 === clean2 && clean1.length > 0) return true;

  // Levenshtein 距离 ≤ 3
  if (levenshteinDistance(n1, n2) <= 3) return true;

  return false;
}

function removeCommonWords(name: string): string {
  const commonWords = [
    '杠铃', '哑铃', '器械', '训练', '练习',
    'barbell', 'dumbbell', 'machine', 'cable'
  ];
  let result = name;
  for (const word of commonWords) {
    result = result.replace(new RegExp(word, 'gi'), '');
  }
  return result.trim().replace(/\s+/g, '');
}

function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}
