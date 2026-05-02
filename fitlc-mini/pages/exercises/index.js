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
    loadingMore: false,
    showMuscleTree: false,
    expandedMuscles: [],
    selectedMuscleInfo: null,
    filteredExerciseCount: 0,
    muscleExpanded: false,
    pageSize: 20,
    page: 1,
    hasMore: true
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
    console.log('[Exercises] Starting to load data...');
    Promise.all([
      exerciseActions.fetchExercises(1, 20),
      exerciseActions.fetchHierarchy()
    ]).then(([result, hierarchy]) => {
      console.log('[Exercises] Data loaded:', { exercisesCount: result?.exercises?.length, total: result?.pagination?.total, hierarchyCount: hierarchy?.length });
      const expandedMuscles = hierarchy.filter(m => m.children && m.children.length > 0).map(m => m.id);
      this.setData({
        exercises: result.exercises,
        muscleHierarchy: hierarchy,
        expandedMuscles,
        filteredExerciseCount: result.exercises.length,
        page: 1,
        hasMore: result.pagination.page < result.pagination.totalPages,
        loading: false
      });
    }).catch(err => {
      this.setData({ loading: false });
      console.error('load exercises failed:', err);
    });
  },

  onMuscleTreeToggle() {
    this.setData({ showMuscleTree: !this.data.showMuscleTree });
  },

  onMuscleToggle() {
    this.setData({ muscleExpanded: !this.data.muscleExpanded });
  },

  onAllMuscles() {
    this.setData({
      selectedMuscleId: null,
      selectedMuscleInfo: null,
      expandedMuscles: [],
      muscleExpanded: false,
      filteredExerciseCount: 0
    });
    this.filterExercises();
  },

  onMuscleSelect(e) {
    const muscleId = e.currentTarget.dataset.id;
    const { muscleHierarchy, expandedMuscles } = this.data;

    let isChild = false;
    for (const group of muscleHierarchy) {
      if (group.children) {
        const child = group.children.find(c => c.id === muscleId);
        if (child) {
          isChild = true;
          break;
        }
      }
    }

    let muscleInfo = null;
    for (const group of muscleHierarchy) {
      if (group.id === muscleId) {
        muscleInfo = group;
        break;
      }
      if (group.children) {
        const child = group.children.find(c => c.id === muscleId);
        if (child) {
          muscleInfo = child;
          break;
        }
      }
    }

    let newExpandedMuscles = [...expandedMuscles];

    if (isChild) {
      this.setData({
        selectedMuscleId: muscleId,
        selectedMuscleInfo: muscleInfo,
        muscleExpanded: false
      });
    } else {
      if (newExpandedMuscles.includes(muscleId)) {
        newExpandedMuscles = newExpandedMuscles.filter(id => id !== muscleId);
      } else {
        newExpandedMuscles.push(muscleId);
      }
      this.setData({
        selectedMuscleId: muscleId,
        expandedMuscles: newExpandedMuscles,
        selectedMuscleInfo: muscleInfo,
        muscleExpanded: false
      });
    }
    this.filterExercises();
  },

  onSearch(e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    this.filterExercises();
  },

  onFilterEquipment(e) {
    const equipment = e.currentTarget.dataset.value;
    const current = this.data.filters.equipment;
    this.setData({
      filters: { ...this.data.filters, equipment: current === equipment ? '' : equipment }
    });
    this.filterExercises();
  },

  onFilterDifficulty(e) {
    const difficulty = e.currentTarget.dataset.value;
    const current = this.data.filters.difficulty;
    this.setData({
      filters: { ...this.data.filters, difficulty: current === difficulty ? '' : difficulty }
    });
    this.filterExercises();
  },

  clearFilters() {
    this.setData({
      selectedMuscleId: null,
      searchKeyword: '',
      filters: { category: '', equipment: '', difficulty: '' },
      selectedMuscleInfo: null,
      expandedMuscles: []
    });
    this.filterExercises();
  },

  filterExercises() {
    this.setData({ loading: true });
    const filters = {};
    if (this.data.selectedMuscleId) {
      filters.muscleId = this.data.selectedMuscleId;
    }
    exerciseActions.fetchExercises(1, 20, filters).then(result => {
      this.setData({
        exercises: result.exercises,
        filteredExerciseCount: result.exercises.length,
        page: 1,
        hasMore: result.pagination.page < result.pagination.totalPages,
        loading: false
      });
    }).catch(err => {
      console.error('filter exercises failed:', err);
      this.setData({ loading: false });
    });
  },

  onScrollToLower() {
    if (this.data.loadingMore || !this.data.hasMore) return;
    this.loadMore();
  },

  loadMore() {
    const { page, exercises, selectedMuscleId } = this.data;
    const nextPage = page + 1;

    this.setData({ loadingMore: true });

    const filters = {};
    if (selectedMuscleId) {
      filters.muscleId = selectedMuscleId;
    }

    exerciseActions.fetchExercises(nextPage, 20, filters).then(result => {
      const newExercises = [...exercises, ...result.exercises];
      this.setData({
        exercises: newExercises,
        filteredExerciseCount: newExercises.length,
        page: nextPage,
        hasMore: result.pagination.page < result.pagination.totalPages,
        loadingMore: false
      });
    }).catch(err => {
      console.error('load more failed:', err);
      this.setData({ loadingMore: false });
    });
  },

  onExerciseTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/packageC/pages/exercise-detail/index?id=${id}` });
  },

  onMusclePageTap() {
    // 肌肉库已移除，不跳转
  }
});