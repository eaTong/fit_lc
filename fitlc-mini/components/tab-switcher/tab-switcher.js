Component({
  properties: {
    tabs: { type: Array, value: [] },
    current: { type: String, value: '' }
  },

  methods: {
    onTabTap(e) {
      const tab = e.currentTarget.dataset.tab;
      this.triggerEvent('change', { tab });
    }
  }
});