// 模拟音乐剧数据
const mockMusicals = [
  {
    id: 1,
    name: '中国《风声》',
    progress: 'ZZ',
    expectedDate: '2025年10月',
    votes: Math.floor(Math.random() * 100)
  },
  {
    id: 2,
    name: '德国《摇滚莫扎特》',
    progress: 'ZZ',
    expectedDate: '2025年12月',
    votes: Math.floor(Math.random() * 100)
  },
  {
    id: 3,
    name: '法国《摇滚红与黑》',
    progress: 'BD', //部分已定档
    expectedDate: '2025年10月',
    votes: Math.floor(Math.random() * 100)
  },
  {
    id: 4,
    name: '英国《歌剧魅影》',
    progress: 'ZZ',
    expectedDate: '2025年12月',
    votes: Math.floor(Math.random() * 100)
  },
  {
    id: 5,
    name: '德国《伊丽莎白》',
    progress: 'ZZ',
    expectedDate: '2025年12月',
    votes: Math.floor(Math.random() * 100)
  }
];

module.exports = {
  mockMusicals
}; 