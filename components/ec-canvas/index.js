// ECharts for WeChat Mini Program
// https://github.com/ecomfe/echarts-for-weixin

import * as echarts from './echarts.min';

Component({
  properties: {
    canvasId: {
      type: String,
      value: 'ec-canvas'
    },
    ec: {
      type: Object,
      observer: '_init'
    },
    forceUseOldCanvas: {
      type: Boolean,
      value: false
    }
  },

  data: {
    ecCanvas: null,
    chart: null
  },

  lifetimes: {
    attached() {
      if (!this.data.ec) {
        console.warn('Set ec property on echarts component to bind data');
        return;
      }
      this.init();
    },

    detached() {
      if (this.data.chart) {
        this.data.chart.dispose();
      }
    }
  },

  methods: {
    _init() {
      if (!this.data.ec) return;
      this.init();
    },

    init() {
      const query = wx.createSelectorQuery().in(this);
      query.select(`#${this.data.canvasId}`).node((res) => {
        if (!res || !res.node) {
          console.error('Canvas not found');
          return;
        }

        const canvas = res.node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;

        canvas.width = res.width * dpr;
        canvas.height = res.height * dpr;
        ctx.scale(dpr, dpr);

        const chart = echarts.init(canvas, null, {
          width: res.width,
          height: res.height
        });

        canvas.chart = chart;
        this.data.chart = chart;
        this.data.ecCanvas = canvas;

        if (this.data.ec.option) {
          chart.setOption(this.data.ec.option);
        }

        // Trigger event that chart is ready
        this.triggerEvent('ready', { chart });
      }).exec();
    },

    setOption(option) {
      if (this.data.chart) {
        this.data.chart.setOption(option);
      }
    },

    resize(size) {
      if (this.data.chart) {
        const query = wx.createSelectorQuery().in(this);
        query.select(`#${this.data.canvasId}`).boundingClientRect((res) => {
          if (res) {
            this.data.chart.resize({
              width: res.width,
              height: res.height
            });
          }
        }).exec();
      }
    },

    canvasId() {
      return this.data.canvasId;
    },

    getChart() {
      return this.data.chart;
    }
  }
});