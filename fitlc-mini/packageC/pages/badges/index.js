const { achievementActions } = require('../../../store/actions');
const { authActions } = require('../../../store/actions');

Component({
  data: {
    badges: [],
    groupedBadges: {},
    loading: false,
    earnedCount: 0,
    totalCount: 0
  },

  lifetimes: {
    attached() {
      this.initStore();
      this.loadData();
    }
  },

  pageLifetimes: {
    show() {
      this.initStore();
      this.loadData();
    }
  },

  methods: {
    initStore() {
      const app = getApp();
      this.store = app.store;
    },

    loadData() {
      this.setData({ loading: true });
      this.fetchAllBadges();
    },

    fetchAllBadges() {
      if (!authActions.checkAuth()) {
        wx.redirectTo({ url: '/pages/login/index' });
        return;
      }

      achievementActions.fetchAllBadges().then(badges => {
        const categoryList = this.buildCategoryList(badges);
        const earnedCount = badges.filter(b => b.earned).length;
        this.setData({
          badges,
          categoryList,
          earnedCount,
          totalCount: badges.length,
          loading: false
        });
      }).catch(err => {
        this.setData({ loading: false });
        console.error('fetch badges failed:', err);
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
    },

    buildCategoryList(badges) {
      const categoryNames = {
        workout: '训练类',
        measurement: '围度类',
        streak: '连续打卡',
        volume: '累计训练量'
      };
      const grouped = {};
      badges.forEach(badge => {
        const category = badge.category || 'other';
        if (!grouped[category]) {
          grouped[category] = {
            name: categoryNames[category] || category,
            badges: [],
            earnedCount: 0
          };
        }
        grouped[category].badges.push(badge);
        if (badge.earned) {
          grouped[category].earnedCount++;
        }
      });
      // Convert to array sorted by category order
      const order = ['workout', 'measurement', 'streak', 'volume'];
      return Object.keys(grouped)
        .sort((a, b) => order.indexOf(a) - order.indexOf(b))
        .map(key => grouped[key]);
    },

    onBadgeTap(e) {
      const badge = e.currentTarget.dataset.badge;
      this.showBadgeDetail(badge);
    },

    showBadgeDetail(badge) {
      const conditionText = this.getConditionText(badge);
      if (badge.earned) {
        const date = badge.achievedAt ? this.formatDate(badge.achievedAt) : '';
        wx.showModal({
          title: badge.name,
          content: `${badge.description}\n\n获得时间：${date}\n积分：+${badge.points}`,
          showCancel: false,
          confirmText: '知道了'
        });
      } else {
        wx.showModal({
          title: badge.name,
          content: `${badge.description}\n\n获取条件：${conditionText}\n积分：+${badge.points}`,
          showCancel: false,
          confirmText: '加油'
        });
      }
    },

    getConditionText(badge) {
      const { conditionType, conditionValue } = badge;
      switch (conditionType) {
        case 'first':
          return conditionValue?.type === 'workout' ? '完成第一次训练' : '完成第一次围度记录';
        case 'count':
          const statNames = {
            total_workouts: '训练次数',
            total_measurements: '围度记录次数',
            total_volume: '累计训练量(kg)',
            pr_count: '个人记录数'
          };
          const statName = statNames[conditionValue?.statType] || conditionValue?.statType;
          return `累计${statName}达到${conditionValue?.count}`;
        case 'streak':
          return `连续打卡${conditionValue?.days}天`;
        case 'pr':
          return '建立个人记录';
        default:
          return '未知条件';
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return '-';
      const date = new Date(dateStr);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}月${day}日`;
    },

    onRefresh() {
      this.fetchAllBadges();
    }
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
});