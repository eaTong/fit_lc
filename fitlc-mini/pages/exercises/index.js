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
    filteredExercises: [],
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
      // 初始展开所有有子肌肉的项
      const expandedMuscles = hierarchy.filter(m => m.children && m.children.length > 0).map(m => m.id);
      const filteredExercises = this.filterExercisesInternal(result.exercises, {
        selectedMuscleId: null,
        searchKeyword: '',
        filters: { category: '', equipment: '', difficulty: '' },
        expandedMuscles
      });
      this.setData({
        exercises: result.exercises,
        muscleHierarchy: hierarchy,
        expandedMuscles,
        filteredExercises,
        page: 1,
        hasMore: result.pagination.page < result.pagination.totalPages,
        loading: false
      });
    }).catch(err => {
      this.setData({ loading: false });
      console.error('load exercises failed:', err);
    });
  },

  filterExercisesInternal(exercises, stateOverride) {
    const state = stateOverride || this.data;
    const { searchKeyword, filters } = state;
    let filtered = exercises;

    if (searchKeyword) {
      const kw = searchKeyword.toLowerCase();
      filtered = filtered.filter(ex => ex.name.toLowerCase().includes(kw));
    }

    if (filters.equipment) {
      filtered = filtered.filter(ex => ex.equipment === filters.equipment);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(ex => ex.difficulty === filters.difficulty);
    }

    return filtered;
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
  },

  onMuscleSelect(e) {
    const muscleId = e.currentTarget.dataset.id;
    const { muscleHierarchy, selectedMuscleId, expandedMuscles } = this.data;

    // 判断是否为子肌肉（点击的是子肌肉）
    let isChild = false;
    let parentMuscle = null;
    for (const group of muscleHierarchy) {
      if (group.children) {
        const child = group.children.find(c => c.id === muscleId);
        if (child) {
          isChild = true;
          parentMuscle = group;
          break;
        }
      }
    }

    // 找到选中的肌肉信息
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
      // 点击子肌肉：只选择，不改变展开状态
      this.setData({
        selectedMuscleId: muscleId,
        selectedMuscleInfo: muscleInfo,
        muscleExpanded: false
      });
    } else {
      // 点击父肌肉：切换展开状态
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
    // 筛选时重新从后端加载第一页，带上 muscleId 参数
    this.setData({ loading: true });
    const filters = {};
    if (this.data.selectedMuscleId) {
      filters.muscleId = this.data.selectedMuscleId;
    }
    exerciseActions.fetchExercises(1, 20, filters).then(result => {
      const filtered = this.filterExercisesInternal(result.exercises);
      this.setData({
        exercises: result.exercises,
        filteredExercises: filtered,
        filteredExerciseCount: filtered.length,
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
        filteredExercises: this.filterExercisesInternal(newExercises),
        page: nextPage,
        hasMore: result.pagination.page < result.pagination.totalPages,
        loadingMore: false
      });
    }).catch(err => {
      console.error('load more failed:', err);
      this.setData({ loadingMore: false });
    });
  },

  getFilteredExercises() {
    return this.data.filteredExercises;
  },

  onExerciseTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/packageC/pages/exercise-detail/index?id=${id}` });
  },

  onMusclePageTap() {
    // 肌肉库已移除，不跳转
  }
});