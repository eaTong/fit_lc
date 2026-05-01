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
      this.setData({
        exercises: result.exercises,
        muscleHierarchy: hierarchy,
        expandedMuscles,
        filteredExercises: result.exercises,
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
    const { selectedMuscleId, searchKeyword, filters, expandedMuscles } = state;
    let filtered = exercises;

    if (selectedMuscleId) {
      filtered = filtered.filter(ex =>
        ex.muscles && ex.muscles.some(em => em.muscleId === selectedMuscleId || em.muscle?.parentId === selectedMuscleId)
      );

      // 排序：主肌肉匹配排前面，辅助肌群匹配排后面，再按器械分组
      filtered.sort((a, b) => {
        const aMuscles = a.muscles || [];
        const bMuscles = b.muscles || [];

        // 检查主肌肉匹配（直接匹配）
        const aIsPrimary = aMuscles.some(em => em.muscleId === selectedMuscleId && em.role === 'primary');
        const bIsPrimary = bMuscles.some(em => em.muscleId === selectedMuscleId && em.role === 'primary');

        if (aIsPrimary && !bIsPrimary) return -1;
        if (!aIsPrimary && bIsPrimary) return 1;

        // 都在主肌肉匹配中，按器械分组
        const equipmentOrder = ['barbell', 'dumbbell', 'cable', 'machine', 'bodyweight'];
        const aIdx = equipmentOrder.indexOf(a.equipment);
        const bIdx = equipmentOrder.indexOf(b.equipment);
        const aOrder = aIdx === -1 ? 999 : aIdx;
        const bOrder = bIdx === -1 ? 999 : bIdx;

        if (aOrder !== bOrder) return aOrder - bOrder;

        // 同组内按名称排序
        return a.name.localeCompare(b.name);
      });
    }

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

  onAllMuscles() {
    this.setData({ selectedMuscleId: null, selectedMuscleInfo: null, expandedMuscles: [] });
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
        selectedMuscleInfo: muscleInfo
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
        selectedMuscleInfo: muscleInfo
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
    // 筛选时重新从后端加载第一页
    this.setData({ loading: true });
    exerciseActions.fetchExercises(1, 20).then(result => {
      const filtered = this.filterExercisesInternal(result.exercises);
      this.setData({
        exercises: result.exercises,
        filteredExercises: filtered,
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
    const { page, exercises } = this.data;
    const nextPage = page + 1;

    this.setData({ loadingMore: true });

    exerciseActions.fetchExercises(nextPage, 20).then(result => {
      const newExercises = [...exercises, ...result.exercises];
      this.setData({
        exercises: newExercises,
        filteredExercises: newExercises,
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