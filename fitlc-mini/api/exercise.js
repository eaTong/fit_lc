const client = require('./client');

/**
 * 搜索动作
 * @param {string} keyword - 搜索关键词
 * @param {number} pageSize - 返回数量，默认 20
 * @returns {Promise<Array>} 动作列表
 */
function searchExercises(keyword, pageSize = 20) {
  return client.get('/exercises', {
    name: keyword,
    status: 'published',
    pageSize: pageSize
  }).then(res => {
    return res.exercises || [];
  });
}

module.exports = {
  searchExercises
};