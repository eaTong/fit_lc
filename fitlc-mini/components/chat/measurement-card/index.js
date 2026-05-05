Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  methods: {
    formatDate(dateStr) {
      if (!dateStr) return ''
      const d = new Date(dateStr)
      return `${d.getMonth() + 1}-${d.getDate()}`
    },

    getPartName(bodyPart) {
      const map = {
        'chest': '胸围',
        'waist': '腰围',
        'hips': '臀围',
        'biceps': '臂围',
        'biceps_l': '左臂围',
        'biceps_r': '右臂围',
        'thigh': '大腿围',
        'thigh_l': '左大腿围',
        'thigh_r': '右大腿围',
        'calf': '小腿围',
        'calf_l': '左小腿围',
        'calf_r': '右小腿围',
        'weight': '体重',
        'bodyFat': '体脂率'
      }
      return map[bodyPart] || bodyPart
    },

    getUnit(bodyPart) {
      if (bodyPart === 'weight') return 'kg'
      if (bodyPart === 'bodyFat') return '%'
      return 'cm'
    },

    getAchievements() {
      const { data } = this.properties
      if (!data || !data.achievements) return []
      const { badges, milestones } = data.achievements
      const result = []
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