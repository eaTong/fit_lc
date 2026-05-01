Component({
  properties: {
    show: { type: Boolean, value: false },
    title: { type: String, value: '确认' },
    message: { type: String, value: '' },
    confirmText: { type: String, value: '确认' },
    cancelText: { type: String, value: '取消' },
    confirmType: { type: String, value: 'primary' }
  },

  methods: {
    onConfirm() {
      this.triggerEvent('confirm');
    },
    onCancel() {
      this.triggerEvent('cancel');
    }
  }
});