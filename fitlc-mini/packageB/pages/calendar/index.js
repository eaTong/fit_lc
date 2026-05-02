const { recordActions } = require('../../../store/actions');
const { authActions } = require('../../../store/actions');

Component({
  data: {
    // Current display month/year
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,

    // Calendar data
    days: [],
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],

    // Record dates for marking
    workoutDates: [],
    measurementDates: [],

    // All records combined
    allRecords: [],

    // Selected date detail
    selectedDate: null,
    selectedDateRecords: [],

    // Loading state
    loading: false,

    // Detail panel visibility
    showDetail: false
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
      this.buildAllRecords(
        this.store.getState().workouts || [],
        this.store.getState().measurements || []
      );
      this.generateCalendar();

      this.unsubscribe = this.store.subscribe(state => {
        this.buildAllRecords(state.workouts || [], state.measurements || []);
        this.generateCalendar();
      });
    },

    buildAllRecords(workouts, measurements) {
      const workoutRecords = (workouts || []).map(w => ({
        id: w.id,
        type: 'workout',
        date: w.date,
        summary: `${w.exercises?.length || 0}个动作`,
        detail: `共${this.calculateTotalSets(w)}组`,
        data: w
      }));

      const measurementRecords = (measurements || []).map(m => ({
        id: m.id,
        type: 'measurement',
        date: m.date,
        summary: `${m.items?.length || 0}个部位`,
        detail: this.getMeasurementParts(m),
        data: m
      }));

      const allRecords = [...workoutRecords, ...measurementRecords].sort((a, b) =>
        new Date(b.date) - new Date(a.date)
      );

      this.setData({
        workoutDates: workouts || [],
        measurementDates: measurements || [],
        allRecords
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

      Promise.all([
        recordActions.fetchWorkouts(),
        recordActions.fetchMeasurements()
      ]).then(([workouts, measurements]) => {
        this.buildAllRecords(workouts, measurements);
        this.setData({ loading: false });
      }).catch(err => {
        this.setData({ loading: false });
        console.error('fetch records failed:', err);
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
    },

    generateCalendar() {
      const { year, month } = this.data;

      // Get first day of month and total days
      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);
      const totalDays = lastDay.getDate();
      const startWeekday = firstDay.getDay();

      // Get today's date for comparison
      const today = new Date();
      const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;
      const todayDate = today.getDate();

      const days = [];

      // Add empty cells for days before first day of month
      for (let i = 0; i < startWeekday; i++) {
        days.push({ day: '', empty: true });
      }

      // Add days of month
      for (let day = 1; day <= totalDays; day++) {
        const dateStr = this.formatDateStr(year, month, day);
        const hasWorkout = this.hasRecord(this.data.workoutDates, dateStr);
        const hasMeasurement = this.hasRecord(this.data.measurementDates, dateStr);

        days.push({
          day,
          dateStr,
          isToday: isCurrentMonth && day === todayDate,
          hasWorkout,
          hasMeasurement,
          hasRecord: hasWorkout || hasMeasurement
        });
      }

      this.setData({ days });
    },

    formatDateStr(year, month, day) {
      const monthStr = month.toString().padStart(2, '0');
      const dayStr = day.toString().padStart(2, '0');
      return `${year}-${monthStr}-${dayStr}`;
    },

    hasRecord(records, dateStr) {
      if (!records || !Array.isArray(records)) return false;
      return records.some(record => {
        if (!record.date) return false;
        const recordDate = record.date.split('T')[0];
        return recordDate === dateStr;
      });
    },

    getRecordsForDate(dateStr) {
      const workoutRecords = (this.data.workoutDates || [])
        .filter(w => w.date && w.date.split('T')[0] === dateStr)
        .map(w => ({
          id: w.id,
          type: 'workout',
          summary: `${w.exercises?.length || 0}个动作`,
          detail: `共${this.calculateTotalSets(w)}组`,
          data: w
        }));

      const measurementRecords = (this.data.measurementDates || [])
        .filter(m => m.date && m.date.split('T')[0] === dateStr)
        .map(m => ({
          id: m.id,
          type: 'measurement',
          summary: `${m.items?.length || 0}个部位`,
          detail: this.getMeasurementParts(m),
          data: m
        }));

      return [...workoutRecords, ...measurementRecords];
    },

    calculateTotalSets(workout) {
      if (!workout.exercises) return 0;
      return workout.exercises.reduce((total, ex) => total + (ex.sets || 0), 0);
    },

    getMeasurementParts(measurement) {
      if (!measurement.items || measurement.items.length === 0) return '-';
      return measurement.items.map(item => item.body_part).join('、');
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

    onPrevMonth() {
      let { year, month } = this.data;
      if (month === 1) {
        month = 12;
        year--;
      } else {
        month--;
      }
      this.setData({ year, month, showDetail: false, selectedDate: null }, () => {
        this.generateCalendar();
      });
    },

    onNextMonth() {
      let { year, month } = this.data;
      if (month === 12) {
        month = 1;
        year++;
      } else {
        month++;
      }
      this.setData({ year, month, showDetail: false, selectedDate: null }, () => {
        this.generateCalendar();
      });
    },

    onDayTap(e) {
      const dateStr = e.currentTarget.dataset.date;
      if (!dateStr) return;

      const records = this.getRecordsForDate(dateStr);
      this.setData({
        selectedDate: dateStr,
        selectedDateRecords: records,
        showDetail: true
      });
    },

    onCloseDetail() {
      this.setData({
        showDetail: false,
        selectedDate: null,
        selectedDateRecords: []
      });
    },

    onRecordTap(e) {
      const record = e.currentTarget.dataset.record;
      if (record.type === 'workout') {
        wx.navigateTo({
          url: `/pages/chat/index?workoutId=${record.id}`
        });
      } else {
        wx.navigateTo({
          url: `/pages/chat/index?measurementId=${record.id}`
        });
      }
    },

    getMonthLabel() {
      const { year, month } = this.data;
      return `${year}年${month}月`;
    },

    formatDisplayDate(dateStr) {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      return `${parseInt(parts[1])}月${parseInt(parts[2])}日`;
    },

    detached() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }
  }
});