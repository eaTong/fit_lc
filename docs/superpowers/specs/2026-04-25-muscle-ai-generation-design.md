# AI 肌肉详情生成设计

## 需求概述

使用 AI 批量生成肌肉库的详细信息（起点、止点、功能、训练技巧）。

## 1. 脚本结构

```
backend/scripts/ai-generate-muscle-details.js
```

## 2. 执行流程

1. 运行脚本：`node ai-generate-muscle-details.js`
2. 从数据库读取肌肉列表（6个肌肉群 + 20个主肌肉 = 26条）
3. 对每个肌肉调用 AI API 生成详情
4. 生成 JSON 文件保存到 `output/muscle-details-YYYY-MM-DD.json`
5. 管理员审核后，手动导入到数据库

## 3. AI Prompt 设计

```javascript
const prompt = `给定肌肉信息：
- 名称：${muscle.name}
- 肌肉群：${muscle.group}
- 上级肌肉：${parentMuscle?.name || '无'}

请为这个肌肉生成以下信息（JSON格式）：
{
  "origin": "起点位置描述",
  "insertion": "止点位置描述",
  "function": "主要功能描述",
  "trainingTips": "训练技巧和建议"
}

要求：
- 用中文回答
- origin 和 insertion 描述肌肉的解剖学起止点
- function 描述肌肉的主要功能
- trainingTips 包含2-3条训练建议
- 只返回JSON，不要其他内容`;
```

## 4. 输出格式

生成 JSON 文件：`backend/scripts/output/muscle-details-YYYY-MM-DD.json`

```json
{
  "generatedAt": "2026-04-25",
  "muscles": [
    {
      "id": 1,
      "name": "胸部",
      "group": "chest",
      "origin": "起点位置描述",
      "insertion": "止点位置描述",
      "function": "主要功能描述",
      "trainingTips": "训练技巧和建议"
    }
  ]
}
```

## 5. 实施步骤

1. 创建脚本 `ai-generate-muscle-details.js`
2. 实现数据库读取逻辑
3. 实现 AI 调用逻辑
4. 实现 JSON 输出逻辑
5. 测试运行脚本
6. 生成 JSON 文件
7. 管理员审核后导入数据库
