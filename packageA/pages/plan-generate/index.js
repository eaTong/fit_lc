const { planActions } = require('../../../store/actions');
const { checkAuth } = require('../../../store/actions');

Component({
  data: {
    isLoading: false,
    error: '',
    formData: {
      goal: 'bulk',
      frequency: 4,
      durationMinutes: 60,
      focusAreas: []
    },
    goalRange: ['增肌', '减脂', '维持'],
    goalValues: ['bulk', 'cut', 'maintain'],
    durationRange: ['30分钟', '45分钟', '60分钟', '90分钟'],
    durationValues: [30, 45, 60, 90],
    focusAreaOptions: ['胸部', '背部', '肩部', '手臂', '腿部', '核心'],
    selectedFocusAreas: []
  },

  lifetimes: {
    attached() {
      if (!checkAuth()) {
        wx.redirectTo({ url: '/pages/login/index' });
        return;
      }
    }
  },

  methods: {
    onGoalChange(e) {
      const index = e.detail.value;
      this.setData({
        'formData.goal': this.data.goalValues[index]
      });
    },

    onFrequencyChange(e) {
      const frequency = parseInt(e.detail.value) + 1;
      this.setData({
        'formData.frequency': frequency
      });
    },

    onDurationChange(e) {
      const index = e.detail.value;
      this.setData({
        'formData.durationMinutes': this.data.durationValues[index]
      });
    },

    onFocusAreaChange(e) {
      const values = e.detail.value;
      this.setData({
        selectedFocusAreas: values,
        'formData.focusAreas': values
      });
    },

    validateForm() {
      const { formData } = this.data;
      if (!formData.goal) {
        wx.showToast({ title: '请选择训练目标', icon: 'none' });
        return false;
      }
      if (!formData.frequency || formData.frequency < 1 || formData.frequency > 7) {
        wx.showToast({ title: '请选择每周训练天数', icon: 'none' });
        return false;
      }
      if (!formData.durationMinutes) {
        wx.showToast({ title: '请选择每次训练时长', icon: 'none' });
        return false;
      }
      return true;
    },

    onSubmit() {
      if (!this.validateForm()) return;

      this.setData({ isLoading: true, error: '' });

      const { formData } = this.data;
      const userProfile = {
        goal: formData.goal,
        frequency: formData.frequency,
        durationMinutes: formData.durationMinutes,
        focusAreas: formData.focusAreas
      };

      planActions.generatePlan(userProfile).then(plan => {
        this.setData({ isLoading: false });
        wx.showToast({ title: '计划生成成功', icon: 'success' });
        setTimeout(() => {
          wx.navigateTo({
            url: `/packageA/pages/plan-detail/index?id=${plan.id}`
          });
        }, 1500);
      }).catch(err => {
        console.error('generatePlan failed:', err);
        this.setData({
          isLoading: false,
          error: err.message || '生成失败，请重试'
        });
        wx.showToast({
          title: err.message || '生成失败',
          icon: 'none'
        });
      });
    },

    onBack() {
      wx.navigateBack();
    }
  }
});