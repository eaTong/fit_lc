# 围度记录内嵌编辑实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在围度记录页面展示所有部位（包括未录入），点击未录入部位弹出输入框快捷录入

**Architecture:** 修改 measurements 页面 grid 布局为全展示模式，新增输入弹窗组件，调用保存 API 后更新前端状态

**Tech Stack:** 微信小程序原生框架 + store/actions.js API 调用

---

## 文件结构

```
fitlc-mini/packageB/pages/measurements/
├── index.wxml    — 主模板，修改 grid 布局展示所有部位，新增输入弹窗
├── index.js      — 页面逻辑，添加输入弹窗状态和保存方法
├── index.wxss    — 样式，新增虚线边框格子和输入弹窗样式
```

---

## Task 1: 修改 measurements 数据结构和状态管理

**Files:**
- Modify: `fitlc-mini/store/actions.js:74-81`

- [ ] **Step 1: 在 recordActions 中添加保存单个部位的方法**

```javascript
// 在 recordActions 中添加
saveMeasurementPart(date, bodyPart, value) {
  return post('/records/measurement', {
    date,
    measurements: [{ body_part: bodyPart, value: parseFloat(value) }]
  }).then(res => {
    if (res.measurement) {
      getStore().setState({ latestMeasurement: res.measurement });
    }
    return res.measurement;
  });
}
```

- [ ] **Step 2: 提交**

```bash
git add fitlc-mini/store/actions.js
git commit -m "feat(mini): add saveMeasurementPart API method"
```

---

## Task 2: 修改 measurements 页面 WXML 模板

**Files:**
- Modify: `fitlc-mini/packageB/pages/measurements/index.wxml:42-98`

- [ ] **Step 1: 将最新记录卡片中的 measurements-grid 替换为全展示网格**

将原来的条件渲染 `wx:if="{{latestMeasurement.xxx}}"` 改为双层 grid，一层展示所有已录入部位，另一层展示未录入部位（虚线样式）。

关键布局结构：
```
<!-- 第一行：独立部位 -->
<view class="grid-row">
  <view class="measurement-cell {{latestMeasurement.weight ? 'filled' : 'empty'}}" bindtap="onCellTap" data-part="weight">
    <text class="cell-label">体重</text>
    <text class="cell-value">{{latestMeasurement.weight || ''}}</text>
    <text class="cell-unit">{{latestMeasurement.weight ? 'kg' : ''}}</text>
  </view>
  <!-- chest, waist, hips 同理 -->
</view>

<!-- 第二行：对称部位 -->
<view class="grid-row symmetrical">
  <view class="measurement-cell half {{latestMeasurement.biceps_l ? 'filled' : 'empty'}}" bindtap="onCellTap" data-part="biceps_l">...</view>
  <view class="measurement-cell half {{latestMeasurement.biceps_r ? 'filled' : 'empty'}}" bindtap="onCellTap" data-part="biceps_r">...</view>
  <!-- thigh, calf 同理 -->
</view>
```

- [ ] **Step 2: 添加输入弹窗模板**

```xml
<!-- 输入弹窗 -->
<view class="input-modal {{showInputModal ? 'show' : ''}}" bindtap="onModalTap">
  <view class="input-panel" catchtap="noop">
    <text class="input-title">{{inputTargetPartName}}</text>
    <input class="input-field" type="digit" value="{{inputValue}}" bindinput="onInputChange" placeholder="请输入数值" />
    <text class="input-unit">{{inputTargetUnit}}</text>
    <view class="input-actions">
      <button class="btn-cancel" bindtap="onInputCancel">取消</button>
      <button class="btn-confirm" bindtap="onInputConfirm">确认</button>
    </view>
  </view>
</view>
```

- [ ] **Step 3: 提交**

```bash
git add fitlc-mini/packageB/pages/measurements/index.wxml
git commit -m "feat(mini): update measurements grid to show all body parts with inline input modal"
```

---

## Task 3: 修改 measurements 页面 JS 逻辑

**Files:**
- Modify: `fitlc-mini/packageB/pages/measurements/index.js`

- [ ] **Step 1: 添加输入弹窗相关 data**

```javascript
data: {
  // ... existing data ...
  showInputModal: false,
  inputTargetPart: '',      // body_part 标识
  inputTargetPartName: '',  // 中文名，如"左臂围"
  inputTargetUnit: '',      // 单位
  inputValue: ''            // 输入值
}
```

- [ ] **Step 2: 添加部位映射和方法**

```javascript
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

// 点击格子
onCellTap(e) {
  const part = e.currentTarget.dataset.part;
  const partInfo = PART_MAP[part];
  const currentValue = this.properties.data?.[part] || null;

  this.setData({
    showInputModal: true,
    inputTargetPart: part,
    inputTargetPartName: partInfo.name,
    inputTargetUnit: partInfo.unit,
    inputValue: currentValue ? String(currentValue) : ''
  });
},

// 输入变化
onInputChange(e) {
  this.setData({ inputValue: e.detail.value });
},

// 确认保存
onInputConfirm() {
  const { inputTargetPart, inputValue } = this.data;
  if (!inputValue) return;

  recordActions.saveMeasurementPart(null, inputTargetPart, inputValue)
    .then(() => {
      this.setData({ showInputModal: false });
      this.triggerEvent('refresh');
    })
    .catch(err => {
      wx.showToast({ title: '保存失败', icon: 'none' });
    });
},

// 取消输入
onInputCancel() {
  this.setData({ showInputModal: false });
},

// 点击遮罩关闭
onModalTap() {
  this.setData({ showInputModal: false });
}
```

- [ ] **Step 3: 提交**

```bash
git add fitlc-mini/packageB/pages/measurements/index.js
git commit -m "feat(mini): add inline edit logic for measurement cells"
```

---

## Task 4: 修改 measurements 页面 WXSS 样式

**Files:**
- Modify: `fitlc-mini/packageB/pages/measurements/index.wxss`

- [ ] **Step 1: 添加网格布局样式**

```css
/* Grid Row */
.grid-row {
  display: flex;
  gap: 16rpx;
  margin-bottom: 16rpx;
}

.grid-row.symmetric {
  flex-wrap: wrap;
}

/* Measurement Cell */
.measurement-cell {
  flex: 1;
  min-height: 120rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16rpx;
  background-color: var(--color-bg-tertiary, #252525);
  border: 2px solid var(--color-border, #333333);
  border-radius: 4rpx;
}

.measurement-cell.half {
  flex: 0 0 calc(50% - 8rpx);
}

.measurement-cell.empty {
  border: 2px dashed #555555;
  background-color: transparent;
}

.cell-label {
  font-size: 22rpx;
  color: var(--color-text-secondary, #888888);
  margin-bottom: 8rpx;
}

.cell-value {
  font-size: 32rpx;
  font-weight: 700;
  color: var(--color-text-primary, #FFFFFF);
}

.cell-unit {
  font-size: 20rpx;
  color: var(--color-text-secondary, #888888);
  margin-top: 4rpx;
}

.measurement-cell.empty .cell-value {
  font-size: 24rpx;
  color: #555555;
}
```

- [ ] **Step 2: 添加输入弹窗样式**

```css
/* Input Modal */
.input-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.input-modal.show {
  display: flex;
}

.input-panel {
  width: 560rpx;
  background-color: var(--color-bg-secondary, #1A1A1A);
  border: 1px solid var(--color-border, #333333);
  border-radius: 8rpx;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-title {
  font-size: 32rpx;
  font-weight: 600;
  color: var(--color-text-primary, #FFFFFF);
  margin-bottom: 24rpx;
}

.input-field {
  width: 100%;
  height: 88rpx;
  background-color: var(--color-bg-tertiary, #252525);
  border: 2px solid var(--color-border, #333333);
  border-radius: 4rpx;
  padding: 0 24rpx;
  font-size: 32rpx;
  color: var(--color-text-primary, #FFFFFF);
  text-align: center;
}

.input-unit {
  font-size: 24rpx;
  color: var(--color-text-secondary, #888888);
  margin-top: 16rpx;
  margin-bottom: 32rpx;
}

.input-actions {
  display: flex;
  gap: 24rpx;
  width: 100%;
}

.btn-cancel, .btn-confirm {
  flex: 1;
  height: 88rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rpx;
  font-size: 28rpx;
}

.btn-cancel {
  background-color: var(--color-bg-tertiary, #252525);
  border: 2px solid var(--color-border, #333333);
  color: var(--color-text-secondary, #888888);
}

.btn-confirm {
  background-color: var(--color-accent, #FF4500);
  border: 2px solid var(--color-accent, #FF4500);
  color: #FFFFFF;
}
```

- [ ] **Step 3: 提交**

```bash
git add fitlc-mini/packageB/pages/measurements/index.wxss
git commit -m "feat(mini): add grid and input modal styles for inline measurement editing"
```

---

## Task 5: 集成测试与验收

- [ ] **Step 1: 编译检查**

```bash
cd fitlc-mini && npm run build 2>&1 | head -50
```

预期：无编译错误

- [ ] **Step 2: 人工验收**
- [ ] 打开 measurements 页面，验证所有部位（无论是否录入）均展示
- [ ] 点击空部位，弹出输入框，输入数值后保存成功
- [ ] 保存后格子变为实线边框并显示数值
- [ ] 对称部位可单边录入

- [ ] **Step 3: 提交所有修改**

```bash
git add -A && git commit -m "feat(mini): implement inline measurement editing - show all body parts with tap-to-input"
```

---

## 自检清单

| 需求 | 对应实现 |
|------|----------|
| 所有围度部位以网格形式展示 | Task 2 WXML grid-row + measurement-cell |
| 未录入部位显示为虚线边框 | Task 4 CSS `.measurement-cell.empty` |
| 点击未录入部位弹出输入框 | Task 3 JS `onCellTap` → `showInputModal: true` |
| 录入后数据正确保存并更新显示 | Task 3 JS `onInputConfirm` → `recordActions.saveMeasurementPart` |
| 对称部位支持单边录入 | Task 2 WXML `.measurement-cell.half` + Task 4 CSS |
| 保存失败时正确提示 | Task 3 JS catch → `wx.showToast` |