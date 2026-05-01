Component({
  properties: {
    show: { type: Boolean, value: false },
    title: { type: String, value: '' },
    closable: { type: Boolean, value: true }
  },

  methods: {
    onClose() {
      this.triggerEvent('close');
    },
    onMaskTap() {
      if (this.properties.closable) {
        this.onClose();
      }
    }
  }
});