Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  methods: {
    getCompletionText() {
      const { stats } = this.properties.data || {}
      if (!stats) return ''
      return `${stats.completionRate || 0}%`
    },

    getStatItems() {
      const { stats } = this.properties.data || {}
      if (!stats) return []
      return [
        { icon: '✓', count: stats.completed || 0, label: '已完成', color: '#4CAF50' },
        { icon: '✗', count: stats.skipped || 0, label: '跳过', color: '#FF9800' },
        { icon: '○', count: stats.pending || 0, label: '待完成', color: '#888888' }
      ]
    },

    getSuggestions() {
      const { suggestions } = this.properties.data || {}
      return suggestions || []
    }
  }
})