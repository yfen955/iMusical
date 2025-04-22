// index.js
Page({
  data: {
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '音乐剧投票'
    });
  },

  goToVote() {
    wx.navigateTo({
      url: '/pages/vote/vote'
    });
  },

  goToRanking() {
    wx.navigateTo({
      url: '/pages/ranking/ranking'
    });
  }
});
