Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  data: {
    formattedExercises: []
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
      if (!data || !data.exercises) return

      const exercises = data.exercises.map(ex => {
        let detail = ''
        if (ex.sets && ex.reps) {
          detail += `${ex.sets}组 × ${ex.reps}次`
        }
        if (ex.weight) {
          detail += ` @ ${ex.weight}kg`
        }
        if (ex.duration) {
          detail += ` ${ex.duration}分钟`
        }
        if (ex.distance) {
          detail += ` ${ex.distance}km`
        }
        return {
          name: ex.name,
          detail: detail.trim(),
          weight: ex.weight || null
        }
      })

      this.setData({ formattedExercises: exercises })
    },

    formatDate(dateStr) {
      if (!dateStr) return ''
      const d = new Date(dateStr)
      return `${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
    },

    getAchievements() {
      const { data } = this.properties
      if (!data || !data.achievements) return []
      const { isNewPR, prRecords, badges, milestones } = data.achievements
      const result = []
      if (isNewPR) result.push('🏆 PR突破')
      if (badges && badges.length > 0) {
        badges.forEach(b => result.push(`🎖️ ${b}`))
      }
      if (milestones && milestones.length > 0) {
        milestones.forEach(m => result.push(`⭐ ${m}`))
      }
      return result
    }
  }
})