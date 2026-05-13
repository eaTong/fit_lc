Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    type: {
      type: String,
      value: 'first_workout'
    },
    data: {
      type: Object,
      value: {}
    }
  },

  data: {
    animation: null,
    visible: false
  },

  observers: {
    'show': function(show) {
      if (show) {
        this.playEnterAnimation();
      }
    }
  },

  methods: {
    playEnterAnimation() {
      this.setData({ visible: true });

      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease'
      });

      animation.opacity(1).scale(1).step();
      this.setData({ animation: animation.export() });

      // 3秒后自动退出
      this.exitTimer = setTimeout(() => {
        this.playExitAnimation();
      }, 3000);
    },

    playExitAnimation() {
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease'
      });

      animation.opacity(0).scale(0.8).step();
      this.setData({ animation: animation.export() });

      setTimeout(() => {
        this.setData({ visible: false });
        this.triggerEvent('complete');
      }, 300);
    },

    onTap() {
      if (this.exitTimer) {
        clearTimeout(this.exitTimer);
      }
      this.playExitAnimation();
    }
  }
});