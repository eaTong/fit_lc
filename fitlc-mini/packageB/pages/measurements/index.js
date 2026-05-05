// Measurements Page - 围度记录页
const { recordActions, authActions } = require('../../../store/actions');

// 部位映射
const PART_MAP = {
  weight: { name: '体重', unit: 'kg' },
  chest: { name: '胸围', unit: 'cm' },
  waist: { name: '腰围', unit: 'cm' },
  hips: { name: '臀围', unit: 'cm' },
  biceps_l: { name: '左臂围', unit: 'cm' },
  biceps_r: { name: '右臂围', unit: 'cm' },
  thigh_l: { name: '左大腿', unit: 'cm' },
  thigh_r: { name: '右大腿', unit: 'cm' },
  calf_l: { name: '左小腿', unit: 'cm' },
  calf_r: { name: '右小腿', unit: 'cm' },
  bodyFat: { name: '体脂率', unit: '%' }
};

Component({
  data: {
    activeTab: 'list', // 'list' | 'trend'
    dateRange: '30', // '30' | '90' | '365'
    latestMeasurement: null,
    measurements: [],
    loading: false,
    isEmpty: false,

    // Input modal state
    showInputModal: false,
    inputTargetPart: '',      // body_part 标识
    inputTargetPartName: '',  // 中文名，如"左臂围"
    inputTargetUnit: '',      // 单位
    inputValue: '',           // 输入值

    // Trend data
    workoutTrendData: { categories: [], series: [] },
    musclePieData: [],
    measurementTrendEc: {},
    workoutTrendEc: {},
    musclePieEc: {}
  },

  lifetimes: {
    attached() {
      this.initStore();
      this.loadData();
    }
  },

  pageLifetimes: {
    show() {
      this.initStore();
      this.loadData();
    }
  },

  methods: {
    initStore() {
      const app = getApp();
      this.store = app.store;

      this.unsubscribe = this.store.subscribe(state => {
        this.setData({
          measurements: state.measurements || [],
          latestMeasurement: state.latestMeasurement || this.getLatestFromList(state.measurements)
        });
        this.updateEmptyState();
      });
    },

    getLatestFromList(measurements) {
      if (!measurements || measurements.length === 0) return null;
      const sorted = [...measurements].sort((a, b) =>
        new Date(b.date) - new Date(a.date)
      );
      return sorted[0];
    },

    loadData() {
      this.setData({ loading: true });
      this.fetchData();
    },

    fetchData() {
      if (!authActions.checkAuth()) {
        wx.redirectTo({ url: '/pages/login/index' });
        return;
      }

      const { dateRange } = this.data;
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - parseInt(dateRange));

      Promise.all([
        recordActions.fetchMeasurements(),
        recordActions.fetchLatestMeasurement(),
        recordActions.fetchWorkouts(
          start.toISOString().split('T')[0],
          end.toISOString().split('T')[0]
        )
      ]).then(([measurements, latestMeasurement, workouts]) => {
        this.setData({
          measurements: measurements || [],
          latestMeasurement: latestMeasurement || this.getLatestFromList(measurements),
          workouts: workouts || [],
          loading: false
        });
        this.updateEmptyState();
        if (this.data.activeTab === 'trend') {
          this.processTrendData();
        }
      }).catch(err => {
        this.setData({ loading: false });
        console.error('fetch measurements failed:', err);
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
    },

    updateEmptyState() {
      const { measurements } = this.data;
      this.setData({ isEmpty: !measurements || measurements.length === 0 });
    },

    onTabChange(e) {
      const tab = e.currentTarget.dataset.tab;
      this.setData({ activeTab: tab }, () => {
        if (tab === 'trend') {
          this.processTrendData();
        }
      });
    },

    onDateRangeChange(e) {
      const range = e.currentTarget.dataset.range;
      this.setData({ dateRange: range }, () => {
        this.loadData();
      });
    },

    processTrendData() {
      const { measurements, workouts } = this.data;
      this.processMeasurementTrend(measurements);
      this.processWorkoutTrend(workouts);
      this.processMusclePieData(workouts);
    },

    processMeasurementTrend(measurements) {
      if (!measurements || measurements.length === 0) {
        this.setData({ measurementTrendEc: { categories: [], series: [] } });
        return;
      }

      const sorted = [...measurements].sort((a, b) =>
        new Date(a.date) - new Date(b.date)
      );

      const categories = sorted.map(m => this.formatDateShort(m.date));
      const totalItemsData = sorted.map(m => m.items ? m.items.length : 0);

      this.setData({
        measurementTrendEc: {
          categories,
          series: [{
            name: '测量部位数',
            type: 'line',
            smooth: true,
            data: totalItemsData,
            color: '#FF4500',
            areaStyle: { color: 'rgba(255, 69, 0, 0.2)' }
          }]
        }
      });
    },

    processWorkoutTrend(workouts) {
      if (!workouts || workouts.length === 0) {
        this.setData({ workoutTrendEc: { categories: [], series: [] } });
        return;
      }

      const weekCount = {};
      workouts.forEach(w => {
        const date = new Date(w.date);
        const weekStart = this.getWeekStart(date);
        const weekKey = `${weekStart.getFullYear()}-${weekStart.getMonth()}-${weekStart.getDate()}`;
        weekCount[weekKey] = (weekCount[weekKey] || 0) + 1;
      });

      const sortedWeeks = Object.keys(weekCount).sort();
      const categories = sortedWeeks.map(k => {
        const [year, month, day] = k.split('-');
        return `${month}/${day}`;
      });
      const values = sortedWeeks.map(k => weekCount[k]);

      this.setData({
        workoutTrendEc: {
          categories,
          series: [{
            name: '训练次数',
            type: 'bar',
            data: values,
            color: '#FF4500'
          }]
        }
      });
    },

    processMusclePieData(workouts) {
      if (!workouts || workouts.length === 0) {
        this.setData({ musclePieData: [] });
        return;
      }

      const muscleCount = {};
      workouts.forEach(w => {
        if (w.exercises) {
          w.exercises.forEach(ex => {
            if (ex.muscles && ex.muscles.length > 0) {
              ex.muscles.forEach(m => {
                muscleCount[m] = (muscleCount[m] || 0) + (ex.sets || 1);
              });
            }
          });
        }
      });

      const pieData = Object.keys(muscleCount).map(key => ({
        name: key,
        value: muscleCount[key]
      }));

      pieData.sort((a, b) => b.value - a.value);
      const topMuscles = pieData.slice(0, 8);

      this.setData({
        musclePieData: topMuscles
      });
    },

    getWeekStart(date) {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.setDate(diff));
    },

    formatDateShort(dateStr) {
      const date = new Date(dateStr);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },

    onMeasurementTap(e) {
      const measurement = e.currentTarget.dataset.measurement;
      wx.navigateTo({
        url: `/pages/chat/index?measurementId=${measurement.id}`
      });
    },

    onRefresh() {
      this.fetchData();
    },

    formatDate(dateStr) {
      if (!dateStr) return '-';
      const date = new Date(dateStr);
      const now = new Date();
      const diff = now - date;
      const oneDay = 24 * 60 * 60 * 1000;

      if (diff < oneDay) {
        return '今天';
      } else if (diff < 2 * oneDay) {
        return '昨天';
      } else if (diff < 7 * oneDay) {
        return `${Math.floor(diff / oneDay)}天前`;
      } else {
        return `${date.getMonth() + 1}月${date.getDate()}日`;
      }
    },

    formatDetailDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    },

    getMeasurementParts(measurement) {
      if (!measurement.items || measurement.items.length === 0) return '-';
      return measurement.items.map(item => item.body_part).join('、');
    },

    onCellTap(e) {
      const part = e.currentTarget.dataset.part;
      const partInfo = PART_MAP[part] || {};
      const currentValue = this.data.latestMeasurement?.[part] || null;

      this.setData({
        showInputModal: true,
        inputTargetPart: part,
        inputTargetPartName: partInfo.name || part,
        inputTargetUnit: partInfo.unit || 'cm',
        inputValue: currentValue ? String(currentValue) : ''
      });
    },

    onInputChange(e) {
      this.setData({ inputValue: e.detail.value });
    },

    onInputConfirm() {
      const { inputTargetPart, inputValue } = this.data;
      if (!inputValue) return;

      recordActions.saveMeasurementPart(null, inputTargetPart, inputValue)
        .then(() => {
          this.setData({ showInputModal: false });
          this.loadData();
        })
        .catch(err => {
          wx.showToast({ title: '保存失败', icon: 'none' });
        });
    },

    onInputCancel() {
      this.setData({ showInputModal: false });
    },

    onModalTap() {
      this.setData({ showInputModal: false });
    },

    noop() {}  // 空方法，用于 catchtap
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
});