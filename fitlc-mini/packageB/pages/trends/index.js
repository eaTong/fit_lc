// Trends Page - 趋势分析页
// Tab: 围度趋势 / 训练趋势
const { recordActions, authActions } = require('../../../store/actions');
const Store = require('../../../store');

Component({
  data: {
    activeTab: 'measurement', // 'measurement' | 'workout'
    dateRange: '30', // '30' | '90' | '365'
    loading: false,

    // 围度趋势数据
    measurementTrendData: {
      categories: [],
      series: []
    },

    // 训练趋势数据
    workoutTrendData: {
      categories: [],
      series: []
    },

    // 肌肉容量饼图数据
    musclePieData: [],

    // 所有记录原始数据
    workouts: [],
    measurements: []
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
      this.store = app.store || new Store();

      this.unsubscribe = this.store.subscribe(state => {
        this.setData({
          workouts: state.workouts || [],
          measurements: state.measurements || []
        });
        this.processData();
      });
    },

    loadData() {
      this.setData({ loading: true });
      this.fetchRecords();
    },

    fetchRecords() {
      if (!authActions.checkAuth()) {
        wx.redirectTo({ url: '/pages/login/index' });
        return;
      }

      const { dateRange } = this.data;
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - parseInt(dateRange));

      Promise.all([
        recordActions.fetchWorkouts(
          start.toISOString().split('T')[0],
          end.toISOString().split('T')[0]
        ),
        recordActions.fetchMeasurements(
          start.toISOString().split('T')[0],
          end.toISOString().split('T')[0]
        )
      ]).then(([workouts, measurements]) => {
        this.setData({
          workouts: workouts || [],
          measurements: measurements || [],
          loading: false
        });
        this.processData();
      }).catch(err => {
        this.setData({ loading: false });
        console.error('fetch records failed:', err);
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
    },

    processData() {
      const { workouts, measurements, dateRange } = this.data;
      this.processMeasurementTrend(measurements);
      this.processWorkoutTrend(workouts);
      this.processMusclePieData(workouts);
    },

    processMeasurementTrend(measurements) {
      if (!measurements || measurements.length === 0) {
        this.setData({ measurementTrendData: { categories: [], series: [] } });
        return;
      }

      // Sort by date
      const sorted = [...measurements].sort((a, b) =>
        new Date(a.date) - new Date(b.date)
      );

      // Get all unique body parts
      const bodyParts = new Set();
      sorted.forEach(m => {
        if (m.items) {
          m.items.forEach(item => {
            bodyParts.add(item.body_part);
          });
        }
      });

      // Group by date (only show dates with measurements)
      const categories = sorted.map(m => this.formatDateShort(m.date));
      const series = [];

      // For simplicity, show total measurement count per day
      // or average of key measurements
      const totalItemsData = sorted.map(m => ({
        date: m.date,
        value: m.items ? m.items.length : 0
      }));

      series.push({
        name: '测量部位数',
        type: 'line',
        smooth: true,
        data: totalItemsData.map(d => d.value),
        color: '#FF4500',
        areaStyle: {
          color: 'rgba(255, 69, 0, 0.2)'
        }
      });

      this.setData({
        measurementTrendData: {
          categories,
          series,
          option: this.buildLineChartOption(categories, series, '围度记录趋势')
        }
      });
    },

    processWorkoutTrend(workouts) {
      if (!workouts || workouts.length === 0) {
        this.setData({ workoutTrendData: { categories: [], series: [] } });
        return;
      }

      // Group by week
      const weekCount = {};
      workouts.forEach(w => {
        const date = new Date(w.date);
        const weekStart = this.getWeekStart(date);
        const weekKey = `${weekStart.getFullYear()}-${weekStart.getMonth()}-${weekStart.getDate()}`;
        weekCount[weekKey] = (weekCount[weekKey] || 0) + 1;
      });

      // Convert to sorted array
      const sortedWeeks = Object.keys(weekCount).sort();
      const categories = sortedWeeks.map(k => {
        const [year, month, day] = k.split('-');
        return `${month}/${day}`;
      });
      const values = sortedWeeks.map(k => weekCount[k]);

      this.setData({
        workoutTrendData: {
          categories,
          series: [{
            name: '训练次数',
            type: 'bar',
            data: values,
            color: '#FF4500'
          }],
          option: this.buildBarChartOption(categories, values, '每周训练次数')
        }
      });
    },

    processMusclePieData(workouts) {
      if (!workouts || workouts.length === 0) {
        this.setData({ musclePieData: [] });
        return;
      }

      // Count exercises per muscle group
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

      // Sort by value desc and take top 8
      pieData.sort((a, b) => b.value - a.value);
      const topMuscles = pieData.slice(0, 8);

      this.setData({
        musclePieData: topMuscles,
        musclePieOption: this.buildPieChartOption(topMuscles, '肌肉训练容量')
      });
    },

    buildLineChartOption(categories, series, title) {
      return {
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#1A1A1A',
          borderColor: '#333333',
          textStyle: { color: '#FFFFFF' }
        },
        grid: {
          left: '10%',
          right: '5%',
          top: '15%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLine: { lineStyle: { color: '#333333' } },
          axisLabel: { color: '#888888', fontSize: 10 }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          splitLine: { lineStyle: { color: '#252525' } },
          axisLabel: { color: '#888888' }
        },
        series: series.map(s => ({
          ...s,
          label: {
            show: false
          }
        }))
      };
    },

    buildBarChartOption(categories, values, title) {
      return {
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#1A1A1A',
          borderColor: '#333333',
          textStyle: { color: '#FFFFFF' }
        },
        grid: {
          left: '10%',
          right: '5%',
          top: '15%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLine: { lineStyle: { color: '#333333' } },
          axisLabel: { color: '#888888', fontSize: 10 }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          splitLine: { lineStyle: { color: '#252525' } },
          axisLabel: { color: '#888888' }
        },
        series: [{
          name: '训练次数',
          type: 'bar',
          data: values,
          itemStyle: {
            color: '#FF4500'
          },
          barWidth: '50%'
        }]
      };
    },

    buildPieChartOption(pieData, title) {
      const colors = ['#FF4500', '#DC143C', '#FF6347', '#FF7F50', '#FFA500', '#FFD700', '#FFE4B5', '#FF69B4'];
      return {
        tooltip: {
          trigger: 'item',
          backgroundColor: '#1A1A1A',
          borderColor: '#333333',
          textStyle: { color: '#FFFFFF' }
        },
        legend: {
          orient: 'vertical',
          right: '5%',
          top: 'center',
          textStyle: { color: '#888888', fontSize: 10 },
          itemWidth: 10,
          itemHeight: 10
        },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 'bold'
            }
          },
          labelLine: { show: false },
          data: pieData.map((item, index) => ({
            name: item.name,
            value: item.value,
            itemStyle: { color: colors[index % colors.length] }
          }))
        }]
      };
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

    onTabChange(e) {
      const tab = e.currentTarget.dataset.tab;
      this.setData({ activeTab: tab });
    },

    onDateRangeChange(e) {
      const range = e.currentTarget.dataset.range;
      this.setData({ dateRange: range }, () => {
        this.loadData();
      });
    },

    onChartReady() {
      // Charts are ready
    },

    onRefresh() {
      this.loadData();
    }
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
});