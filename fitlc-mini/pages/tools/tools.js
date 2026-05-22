const routes = {
  '10x10': '/pages/tools-detail-10x10/tools-detail-10x10',
  'counter': '/pages/tools-detail-counter/tools-detail-counter',
  'timer': '/pages/tools-detail-timer/tools-detail-timer'
};

Page({
  onCardTap(e) {
    const type = e.currentTarget.dataset.type;
    const url = routes[type];
    if (url) {
      wx.navigateTo({ url });
    }
  }
});