# 设计规范

## 配色方案

### 亮色模式

| 用途 | Tailwind Class | 色值 |
|------|---------------|------|
| 页面背景 | `bg-white` | #ffffff |
| 主文字 | `text-zinc-900` | #18181b |
| 次要文字 | `text-zinc-600` | #52525b |
| 辅助文字 | `text-zinc-500` | #71717a |
| 主强调色（蓝） | `text-blue-600` / `bg-blue-600` | #2563eb |
| 卡片边框 | `border-zinc-200` | #e4e4e7 |
| 悬停背景 | `hover:bg-zinc-100` | #f4f4f5 |

### 暗色模式

| 用途 | Tailwind Class | 色值 |
|------|---------------|------|
| 页面背景 | `dark:bg-zinc-950` | #09090b |
| 主文字 | `dark:text-zinc-100` | #f4f4f5 |
| 次要文字 | `dark:text-zinc-400` | #a1a1aa |
| 主强调色（蓝） | `dark:text-blue-400` | #60a5fa |
| 卡片边框 | `dark:border-zinc-800` | #27272a |
| 悬停背景 | `dark:hover:bg-zinc-800` | #27272a |

## 排版

- 字体：系统默认字体栈（Tailwind 默认）
- 标题：`font-bold tracking-tight`
- 正文：`text-base`（16px）
- 小字：`text-sm`（14px）用于辅助信息

## 间距

- 页面内容最大宽度：`max-w-5xl`（1024px）
- 页面垂直内边距：`py-8` 或 `py-20`（首页 Hero）
- 卡片间距：`gap-4` 或 `gap-6`
- 网格列数：1（手机）/ 2（平板）/ 3（桌面）

## 圆角

- 按钮：`rounded-lg`（8px）
- 卡片：`rounded-lg`
- 图片：`rounded-lg`

## 组件样式规范

### 按钮

- 主按钮：`bg-blue-600 text-white rounded-lg px-6 py-2.5 hover:bg-blue-700`
- 次按钮：`border border-zinc-300 rounded-lg px-6 py-2.5 hover:bg-zinc-100`

### 卡片

- 白底 + 细边框 + 悬停阴影
- `bg-white border border-zinc-200 rounded-lg p-5 hover:shadow-md`

### 导航栏

- 粘性定位，顶部
- 底部细边框分割线
- 最大宽度 1024px，水平居中

### 桌面宠物

- 右下角固定定位
- z-index: 40（低于灯箱，高于内容）
- 不响应鼠标事件
- 对屏幕阅读器隐藏
