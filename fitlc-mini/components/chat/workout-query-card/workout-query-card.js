Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  data: {
    formattedWorkouts: []
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
      if (!data || !data.workouts) return

      const workouts = data.workouts.slice(0, 5).map(w => {
        const d = new Date(w.date)
        const dayName = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()]
        const dateStr = `${d.getMonth() + 1}-${d.getDate()}`
        const exercises = w.exercises || []
        const mainExercise = exercises[0] ? `${exercises[0].name}` : ''
        const sets = exercises[0] ? `${exercises[0].sets}×${exercises[0].reps}` : ''
        const weight = exercises[0] && exercises[0].weight ? `@${exercises[0].weight}kg` : ''
        return {
          dayName,
          dateStr,
          mainExercise,
          sets,
          weight,
          summary: [sets, weight].filter(Boolean).join(' ')
        }
      })

      this.setData({ formattedWorkouts: workouts })
    },

    formatVolume(volume) {
      if (!volume) return '0'
      if (volume >= 1000) return (volume / 1000).toFixed(1) + 'k'
      return volume.toString()
    }
  }
})