export default defineAppConfig({
  pages: [
    'pages/chat/index',
    'pages/records/index',
    'pages/trends/index',
    'pages/exercises/index',
    'pages/plans/index',
    'pages/profile/index',
    'pages/settings/index',
    'pages/badges/index',
    'pages/calendar/index'
  ],
  subPackages: [
    {
      root: 'subpkg/knowledge',
      pages: [
        'exercises/detail',
        'muscles/detail',
        'plans/execute'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#0A0A0A',
    navigationBarTitleText: 'FitLC',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#888888',
    selectedColor: '#FF4500',
    backgroundColor: '#1A1A1A',
    borderStyle: 'black',
    list: [
      { pagePath: 'pages/chat/index', text: '对话', iconPath: 'assets/tab-chat.png', selectedIconPath: 'assets/tab-chat-active.png' },
      { pagePath: 'pages/records/index', text: '记录', iconPath: 'assets/tab-records.png', selectedIconPath: 'assets/tab-records-active.png' },
      { pagePath: 'pages/trends/index', text: '趋势', iconPath: 'assets/tab-trends.png', selectedIconPath: 'assets/tab-trends-active.png' },
      { pagePath: 'pages/exercises/index', text: '动作库', iconPath: 'assets/tab-exercises.png', selectedIconPath: 'assets/tab-exercises-active.png' },
      { pagePath: 'pages/profile/index', text: '我的', iconPath: 'assets/tab-profile.png', selectedIconPath: 'assets/tab-profile-active.png' }
    ]
  },
  permission: {
    'scope.userLocation': {
      desc: '获取位置用于记录训练'
    }
  }
})