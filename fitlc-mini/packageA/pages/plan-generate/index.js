const { planActions } = require('../../../store/actions');
const { checkAuth } = require('../../../store/actions');

Component({
  data: {
    isLoading: false,
    error: '',
    currentStep: 1,
    totalSteps: 3,
    formData: {
      goal: 'bulk',
      duration_weeks: 12,
      frequency: 4,
      equipment: [],
      experience: 'beginner',
      height: '',
      body_weight: '',
      body_fat: '',
      conditions: ''
    },
    // Step 1 options
    goalOptions: [
      { value: 'bulk', label: '增肌', icon: '💪', desc: '+肌肉量' },
      { value: 'cut', label: '减脂', icon: '🔥', desc: '-体脂率' },
      { value: 'maintain', label: '维持', icon: '⚖️', desc: '保持现状' }
    ],
    cycleOptions: [4, 8, 12, 24],
    // Step 2 options
    equipmentOptions: ['哑铃', '杠铃', '龙门架', '器械', '跑步机', '拉力带', '自重'],
    experienceOptions: [
      { value: 'beginner', label: '初学者' },
      { value: 'intermediate', label: '中级' },
      { value: 'advanced', label: '高级' }
    ],
    selectedEquipment: []
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
    // Step 1: Goal & Cycle
    onGoalSelect(e) {
      const value = e.currentTarget.dataset.value;
      this.setData({ 'formData.goal': value });
    },

    onCycleSelect(e) {
      const weeks = e.currentTarget.dataset.weeks;
      this.setData({ 'formData.duration_weeks': weeks });
    },

    onStep1Next() {
      this.setData({ currentStep: 2 });
    },

    // Step 2: Frequency & Equipment
    onFrequencyChange(e) {
      const frequency = parseInt(e.detail.value) + 1;
      this.setData({ 'formData.frequency': frequency });
    },

    onEquipmentToggle(e) {
      const eq = e.currentTarget.dataset.eq;
      const selected = this.data.selectedEquipment;
      const index = selected.indexOf(eq);
      if (index > -1) {
        selected.splice(index, 1);
      } else {
        selected.push(eq);
      }
      this.setData({ selectedEquipment: selected });
    },

    onExperienceSelect(e) {
      const exp = e.currentTarget.dataset.value;
      this.setData({ 'formData.experience': exp });
    },

    onStep2Next() {
      if (this.data.selectedEquipment.length === 0) {
        wx.showToast({ title: '请至少选择一种器械', icon: 'none' });
        return;
      }
      this.setData({
        currentStep: 3,
        'formData.equipment': this.data.selectedEquipment.join(',')
      });
    },

    onStep2Back() {
      this.setData({ currentStep: 1 });
    },

    // Step 3: Body Data
    onHeightInput(e) {
      this.setData({ 'formData.height': e.detail.value });
    },

    onWeightInput(e) {
      this.setData({ 'formData.body_weight': e.detail.value });
    },

    onBodyFatInput(e) {
      this.setData({ 'formData.body_fat': e.detail.value });
    },

    onConditionsInput(e) {
      this.setData({ 'formData.conditions': e.detail.value });
    },

    onStep3Back() {
      this.setData({ currentStep: 2 });
    },

    onSubmit() {
      const { formData } = this.data;
      if (!formData.height || !formData.body_weight) {
        wx.showToast({ title: '请填写身高和体重', icon: 'none' });
        return;
      }

      this.setData({ isLoading: true, error: '' });

      const userProfile = {
        goal: formData.goal,
        duration_weeks: formData.duration_weeks,
        frequency: formData.frequency,
        equipment: formData.equipment,
        experience: formData.experience,
        height: Number(formData.height),
        body_weight: Number(formData.body_weight),
        body_fat: formData.body_fat ? Number(formData.body_fat) : undefined,
        conditions: formData.conditions || undefined
      };

      planActions.generatePlan({ userProfile }).then(res => {
        this.setData({ isLoading: false });
        wx.showToast({ title: '计划生成成功', icon: 'success' });
        setTimeout(() => {
          wx.navigateTo({
            url: `/packageA/pages/plan-detail/index?id=${res.planId}`
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

    getGoalLabel(goal) {
      const labels = { bulk: '增肌', cut: '减脂', maintain: '维持' };
      return labels[goal] || goal;
    },

    isGoalSelected(goal) {
      return this.data.formData.goal === goal;
    },

    isCycleSelected(weeks) {
      return this.data.formData.duration_weeks === weeks;
    },

    isExperienceSelected(exp) {
      return this.data.formData.experience === exp;
    },

    isEquipmentSelected(eq) {
      return this.data.selectedEquipment.includes(eq);
    }
  }
});