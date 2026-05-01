const { exerciseActions } = require('../../store/actions');
const { authActions } = require('../../store/actions');

Page({
  data: {
    exercises: [],
    muscleHierarchy: [],
    selectedMuscleId: null,
    searchKeyword: '',
    filters: {
      category: '',
      equipment: '',
      difficulty: ''
    },
    loading: false,
    showMuscleTree: true
  },

  onLoad() {
    if (!authActions.checkAuth()) {
      wx.redirectTo({ url: '/pages/login/index' });
      return;
    }

    this.loadData();
  },

  loadData() {
    this.setData({ loading: true });

    Promise.all([
      exerciseActions.fetchExercises(),
      exerciseActions.fetchHierarchy()
    ]).then(([exercises, hierarchy]) => {
      this.setData({
        exercises,
        muscleHierarchy: hierarchy,
        loading: false
      });
    }).catch(err => {
      this.setData({ loading: false });
      console.error('load exercises failed:', err);
    });
  },

  onMuscleSelect(e) {
    const muscleId = e.currentTarget.dataset.id;
    this.setData({ selectedMuscleId: muscleId });
    // 重新筛选
    this.filterExercises();
  },

  onAllMuscles() {
    this.setData({ selectedMuscleId: null });
    this.filterExercises();
  },

  onSearch(e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    this.filterExercises();
  },

  onMuscleTreeToggle() {
    this.setData({ showMuscleTree: !this.showMuscleTree });
  },

  onMusclePageTap() {
    // 肌肉库已移除，不跳转
  },

  filterExercises() {
    const { exercises, selectedMuscleId, searchKeyword, filters } = this.data;
    let filtered = exercises;

    if (selectedMuscleId) {
      filtered = filtered.filter(ex =>
        ex.muscles && ex.muscles.some(m => m.id === selectedMuscleId)
      );
    }

    if (searchKeyword) {
      const kw = searchKeyword.toLowerCase();
      filtered = filtered.filter(ex =>
        ex.name.toLowerCase().includes(kw)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(ex => ex.category === filters.category);
    }

    if (filters.equipment) {
      filtered = filtered.filter(ex => ex.equipment === filters.equipment);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(ex => ex.difficulty === filters.difficulty);
    }

    this.setData({ filteredExercises: filtered });
  },

  onExerciseTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/packageC/pages/exercise-detail/index?id=${id}` });
  },

  clearFilters() {
    this.setData({
      selectedMuscleId: null,
      searchKeyword: '',
      filters: { category: '', equipment: '', difficulty: '' }
    });
    this.filterExercises();
  },

  getFilteredExercises() {
    return this.data.filteredExercises || this.data.exercises;
  }
});