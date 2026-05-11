# CLAUDE.md — AI 助手指引

## 项目文档索引

在开始任何开发工作前，先阅读以下文档：

| 文档 | 路径 | 说明 |
|------|------|------|
| 项目需求 | `docs/requirements.md` | 功能需求和用户故事 |
| 技术规范 | `docs/tech-spec.md` | 技术栈、架构决策、项目结构 |
| 设计规范 | `docs/design-standards.md` | 配色、排版、组件样式标准 |
| 执行步骤 | `docs/execution-plan.md` | 施工蓝图，当前进度 |

## 开发日志

- 日志文件夹：`dev-logs/`
- 文件名格式：`YYYY-MM-DD.md`
- 每次开发会话结束后记录：今日完成 / 待办事项 / 遇到的困难

## 工作流程

1. 阅读 `docs/execution-plan.md` 确认当前进度
2. 选择一个待完成的步骤开始工作
3. 每完成一个步骤：
   - 验证功能正常
   - 更新 `docs/execution-plan.md` 中的步骤状态
   - 记录到当天的开发日志
4. 如遇到技术决策变更，同步更新对应的 docs 文件

## 注意事项

- 项目使用 Next.js 16 + React 19 + Tailwind CSS v4
- 默认编写服务端组件，仅在需要交互时使用 `"use client"`
- 优先使用 Tailwind 内置颜色，不引入自定义 CSS 属性
- 保持组件简洁，避免过度抽象

@AGENTS.md
