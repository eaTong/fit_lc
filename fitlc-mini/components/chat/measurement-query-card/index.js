Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  data: {
    formattedMeasurements: []
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
      if (!data || !data.measurements) return

      // 简化展示，只显示最新几条
      const measurements = data.measurements.slice(0, 5).map(m => {
        const d = new Date(m.date)
        const dateStr = `${d.getMonth() + 1}-${d.getDate()}`
        return {
          bodyPart: this.getPartName(m.body_part),
          value: m.value,
          unit: this.getUnit(m.body_part),
          dateStr
        }
      })

      this.setData({ formattedMeasurements: measurements })
    },

    getPartName(bodyPart) {
      const map = {
        'chest': '胸围', 'waist': '腰围', 'hips': '臀围',
        'biceps': '臂围', 'biceps_l': '左臂', 'biceps_r': '右臂',
        'thigh': '大腿', 'thigh_l': '左大腿', 'thigh_r': '右大腿',
        'calf': '小腿', 'calf_l': '左小腿', 'calf_r': '右小腿',
        'weight': '体重', 'bodyFat': '体脂'
      }
      return map[bodyPart] || bodyPart
    },

    getUnit(bodyPart) {
      if (bodyPart === 'weight') return 'kg'
      if (bodyPart === 'bodyFat') return '%'
      return 'cm'
    }
  }
})