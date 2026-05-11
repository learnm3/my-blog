# 技术规范

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | 16.2.4 |
| UI 库 | React | 19.2.4 |
| 样式 | Tailwind CSS | v4 |
| 语言 | TypeScript | ^5 |
| 主题切换 | next-themes | ^0.4.6 |
| 内容格式 | MDX | ^3.1.1 |
| 部署 | Vercel | - |

## 架构决策

### 服务端组件 vs 客户端组件

- 默认使用服务端组件（Server Component），仅在需要交互时使用 `"use client"`
- GitHub 数据获取在服务端完成，避免暴露 API 密钥
- 仅以下组件标记为客户端组件：
  - `theme-provider.tsx` — 使用 React Context
  - `ui/icon-button.tsx` — 主题切换按钮，使用 `useTheme()`
  - `desktop-pet.tsx` — CSS 动画组件
  - `gallery-lightbox.tsx` — 灯箱状态管理

### 数据获取

- GitHub API：服务端 `fetch()`，目标 `https://api.github.com/users/learnm3/repos`
- 展廊图片：静态数据，定义在 `lib/gallery-data.ts`
- 未来可添加 ISR 缓存策略以减少 GitHub API 调用

### 路由设计

- 使用 App Router 文件系统路由
- 每个路由配 `loading.tsx` 用于 Suspense 流式加载

### 样式策略

- Tailwind CSS v4 的 `dark:` 变体 + next-themes 的 `class` 策略
- 不使用自定义 CSS 属性（Tailwind 内置颜色已覆盖需求）
- 全局动画关键帧写在 `globals.css`

## 项目结构

```
my-blog/
├── docs/               # 项目文档
├── dev-logs/           # 开发日志
├── public/             # 静态资源
├── src/
│   ├── app/            # App Router 页面
│   │   ├── projects/   # /projects 路由
│   │   └── gallery/    # /gallery 路由
│   ├── components/     # 共享组件
│   │   └── ui/         # 基础 UI 组件
│   └── lib/            # 工具函数和类型定义
└── CLAUDE.md           # AI 助手指引
```
