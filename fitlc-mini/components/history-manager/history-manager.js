Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    messages: {
      type: Object,
      value: {}
    }
  },

  data: {
    groupedMessages: {}
  },

  observers: {
    'messages': function(messages) {
      this.groupMessagesByDate(messages);
    }
  },

  methods: {
    groupMessagesByDate(messages) {
      if (!messages) {
        this.setData({ groupedMessages: { today: [], yesterday: [], earlier: [] } });
        return;
      }

      const now = new Date();
      const today = now.toDateString();
      const yesterday = new Date(now.getTime() - 86400000).toDateString();

      const grouped = { today: [], yesterday: [], earlier: [] };

      // 按时间倒序排列
      const sortedMessages = [...messages].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      sortedMessages.forEach(msg => {
        const msgDate = new Date(msg.createdAt).toDateString();
        const timeStr = this.formatTime(msg.createdAt);

        const msgWithTime = { ...msg, timeStr };

        if (msgDate === today) {
          grouped.today.push(msgWithTime);
        } else if (msgDate === yesterday) {
          grouped.yesterday.push(msgWithTime);
        } else {
          grouped.earlier.push(msgWithTime);
        }
      });

      this.setData({ groupedMessages: grouped });
    },

    formatTime(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    },

    formatDate(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}月${day}日`;
    },

    onDeleteMessage(e) {
      const messageId = e.currentTarget.dataset.id;
      this.triggerEvent('delete', { messageId });
    },

    onClearAll() {
      this.triggerEvent('clearall');
    },

    onClose() {
      this.triggerEvent('close');
    }
  }
});