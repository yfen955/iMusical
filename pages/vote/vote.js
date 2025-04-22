import { mockMusicals } from '../../data/mockMusicals';

Page({
  data: {
    voteItems: [],
    rankingList: []
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '音乐剧投票'
    });
    this.fetchMusicalList();
  },

  onShow() {
    // 每次页面显示时重新获取数据
    this.fetchMusicalList();
  },

  // 返回首页
  goToHome() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  },

  // 使用API获取数据
  fetchMusicalList() {
    // 获取音乐剧列表
    wx.request({
      url: 'http://y.saoju.net/yyj/api/musical/',
      success: (res) => {
        let items = [];
        
        // 处理API返回的数据
        if (res.data && Array.isArray(res.data)) {
          // 只筛选制作中的剧目
          const upcomingMusicals = res.data.filter(item => 
            item.fields.progress === 'ZZ'
          );
          
          // 处理数据
          items = upcomingMusicals
            .slice(0, 5) // 只取前5个
            .map((musical, index) => {
              // 获取首演日期
              const premiereDate = musical.fields.premiere_date || musical.fields.premiere_date_text;
              
              // 格式化日期
              let formattedDate = '';
              if (premiereDate) {
                if (musical.fields.premiere_date) {
                  const date = new Date(premiereDate);
                  formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                } else {
                  formattedDate = premiereDate; // 直接使用文字描述
                }
              }

              return {
                id: index + 1,
                name: musical.fields.name,
                progress: musical.fields.progress,
                showDate: formattedDate,
                votes: Math.floor(Math.random() * 100)
              };
            });
        }

        // 获取API数据中的剧名列表
        const apiMusicalNames = items.map(item => item.name);
        
        // 过滤掉假数据中与API数据重复的剧目
        const filteredMockMusicals = mockMusicals.filter(mock => 
          !apiMusicalNames.includes(mock.name)
        );

        // 合并API数据和过滤后的假数据
        const combinedItems = [...items, ...filteredMockMusicals];
        
        // 确保每个项目都有唯一的ID
        const finalItems = combinedItems.map((item, index) => ({
          ...item,
          id: index + 1
        }));

        // 按照票数排序
        const sortedItems = [...finalItems].sort((a, b) => b.votes - a.votes);

        this.setData({
          voteItems: sortedItems,
          rankingList: sortedItems
        });
      },
      fail: (error) => {
        console.error('获取音乐剧列表失败：', error);
        // API调用失败时只使用假数据
        const sortedMockMusicals = [...mockMusicals].sort((a, b) => b.votes - a.votes);
        this.setData({
          voteItems: sortedMockMusicals,
          rankingList: sortedMockMusicals
        });
      }
    });
  },

  handleVote(e) {
    const id = e.currentTarget.dataset.id;
    const voteItems = this.data.voteItems.map(item => {
      if (item.id === id) {
        return { ...item, votes: item.votes + 1 };
      }
      return item;
    });

    // 按照票数排序更新voteItems
    const sortedVoteItems = [...voteItems].sort((a, b) => b.votes - a.votes);
    
    // 更新排行榜
    const rankingList = sortedVoteItems;

    this.setData({
      voteItems: sortedVoteItems,
      rankingList
    });

    wx.showToast({
      title: '投票成功',
      icon: 'success',
      duration: 1500,
      success: () => {
        // 投票成功后跳转到排行榜页面
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/ranking/ranking'
          });
        }, 1500);
      }
    });
  }
}); 