Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  data: {
    schedulePreview: []
  },

  lifetimes: {
    attached() {
      this.formatData()
    }
  },

  observers: {
    'data': function() {
      this.formatData()
    }
  },

  methods: {
    formatData() {
      const { data } = this.properties
      if (!data || !data.schedule) return

      const preview = data.schedule.slice(0, 4).map(item => ({
        dayName: item.dayName,
        muscle: this.getMuscleFromExercises(item.exercises)
      }))

      this.setData({ schedulePreview: preview })
    },

    getMuscleFromExercises(exercises) {
      if (!exercises || exercises.length === 0) return ''
      // 获取第一个动作的主要目标肌肉
      // 这里简化处理，实际可以从 exercise 中获取
      return exercises[0].exerciseName || '训练'
    },

    getGoalText(goal) {
      const map = { 'bulk': '增肌', 'cut': '减脂', 'maintain': '保持' }
      return map[goal] || goal
    },

    getExpText(exp) {
      const map = { 'beginner': '初级', 'intermediate': '中级', 'advanced': '高级' }
      return map[exp] || exp
    },

    onViewDetail() {
      const { data } = this.properties
      if (data && data.planId) {
        wx.navigateTo({
          url: `/packageA/pages/plan-detail/index?id=${data.planId}`
        })
      }
    },

    onStartExecute() {
      const { data } = this.properties
      if (data && data.planId) {
        wx.navigateTo({
          url: `/packageA/pages/plan-execute/index?id=${data.planId}`
        })
      }
    }
  }
})