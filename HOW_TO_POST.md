# 如何发布文章

## 方式一：编写 MDX 文件（推荐）

所有文章存储在 `src/content/posts/` 目录下，每篇文章是一个 `.mdx` 文件。

### 步骤

1. 在 `src/content/posts/` 下创建一个 `.mdx` 文件，文件名即为文章的 slug（URL 路径）。

2. 在文件开头编写 Frontmatter（YAML 格式的元数据）：

```yaml
---
title: "文章标题"
date: "2026-06-10"
summary: "文章摘要，会显示在卡片和列表页"
---
```

**Frontmatter 字段说明：**

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，格式 `YYYY-MM-DD` |
| `summary` | 是 | 文章摘要，显示在文章卡片和列表中 |

3. 在 Frontmatter 之后，用 Markdown 编写正文：

```md
# 标题

这是一个段落。

## 二级标题

- 列表项 1
- 列表项 2

`行内代码`

```js
// 代码块
console.log("Hello");
\```

> 引用
```

4. 保存文件后，刷新博客首页即可看到新文章。

### 示例

参考已有的文章：`src/content/posts/hello-world.mdx`

```
---
title: "Hello World"
date: "2026-04-28"
summary: "第一篇文章"
---

# Hello World
```

### 图片资源

如需在文章中插入图片：
- 小图片放在 `public/images/` 目录下
- 在 MDX 中引用：`![alt](/images/your-image.png)`
- 也可以使用外部图床链接：`![alt](https://example.com/image.png)`

---

## 方式二：使用在线编辑器

访问 `/editor` 页面，可以使用浏览器中的 Markdown 编辑器撰写文章。

写好内容后，手动复制到 `src/content/posts/` 下保存为 `.mdx` 文件。

> **注意：** 在线编辑器仅提供编辑体验，不会自动保存到文件系统。提交文章仍需手动创建 `.mdx` 文件。

---

## 本地预览

```bash
# 启动开发服务器
npm run dev
# 或
yarn dev

# 访问 http://localhost:3000
```

---

## 文章分类建议

- 技术教程：Next.js、React、TypeScript 等
- 项目记录：开发过程中的心得和总结
- 学习笔记：算法、系统设计等学习收获
- 随笔：非技术类文章
