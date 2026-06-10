"use client";

import { useState, useRef, useCallback } from "react";

const COLORS = [
  { label: "红色", code: "red" },
  { label: "蓝色", code: "blue" },
  { label: "绿色", code: "green" },
  { label: "橙色", code: "orange" },
  { label: "紫色", code: "purple" },
];

function insertAtCursor(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end);
  const replacement = before + selected + after;
  textarea.setRangeText(replacement, start, end, "select");
  textarea.focus();
}

export function MarkdownEditor() {
  const [content, setContent] = useState(`---
title: "新文章"
date: "${new Date().toISOString().split("T")[0]}"
summary: "在这里写一段文章摘要"
---

## 开始写作

在这里编写内容，可以使用**加粗文字**、标题、代码块等。

\`\`\`js
console.log("Hello, world!");
\`\`\`
`);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleToolbar = useCallback(
    (action: string) => {
      const ta = textareaRef.current;
      if (!ta) return;

      switch (action) {
        case "bold":
          insertAtCursor(ta, "**", "**");
          break;
        case "h2":
          insertAtCursor(ta, "\n## ", "\n");
          break;
        case "h3":
          insertAtCursor(ta, "\n### ", "\n");
          break;
        case "code":
          insertAtCursor(ta, "\n```\n", "\n```\n");
          break;
        case "link":
          insertAtCursor(ta, "[", "](url)");
          break;
        case "list":
          insertAtCursor(ta, "\n- ", "\n");
          break;
        case "quote":
          insertAtCursor(ta, "\n> ", "\n");
          break;
        default:
          if (action.startsWith("color:")) {
            const color = action.replace("color:", "");
            insertAtCursor(
              ta,
              `<span style="color:${color}">`,
              "</span>"
            );
          }
      }
      ta.focus();
    },
    []
  );

  const slug =
    "my-post-" + new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-700 dark:bg-zinc-800">
        <button onClick={() => handleToolbar("h2")} className="rounded px-2.5 py-1 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700" title="二级标题">
          H2
        </button>
        <button onClick={() => handleToolbar("h3")} className="rounded px-2.5 py-1 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700" title="三级标题">
          H3
        </button>
        <span className="mx-1 text-zinc-300 dark:text-zinc-600">|</span>
        <button onClick={() => handleToolbar("bold")} className="rounded px-2.5 py-1 text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700" title="加粗">
          B
        </button>
        <button onClick={() => handleToolbar("code")} className="rounded px-2.5 py-1 text-xs font-mono hover:bg-zinc-200 dark:hover:bg-zinc-700" title="代码块">
          {"</>"}
        </button>
        <button onClick={() => handleToolbar("link")} className="rounded px-2.5 py-1 text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700" title="链接">
          🔗
        </button>
        <button onClick={() => handleToolbar("list")} className="rounded px-2.5 py-1 text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700" title="列表">
          ≡
        </button>
        <button onClick={() => handleToolbar("quote")} className="rounded px-2.5 py-1 text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700" title="引用">
          ❝
        </button>
        <span className="mx-1 text-zinc-300 dark:text-zinc-600">|</span>
        {COLORS.map((c) => (
          <button
            key={c.code}
            onClick={() => handleToolbar(`color:${c.code}`)}
            className="rounded px-2 py-1 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700"
            style={{ color: c.code }}
            title={`${c.label}文字`}
          >
            A
          </button>
        ))}
      </div>

      {/* Editor */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="h-96 w-full resize-y rounded-lg border border-zinc-200 bg-white p-4 font-mono text-sm leading-relaxed outline-none focus:border-blue-400 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-blue-600"
        placeholder="在这里编写 Markdown..."
      />

      {/* Instructions */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm dark:border-blue-900 dark:bg-blue-950">
        <p className="font-medium text-blue-800 dark:text-blue-300">如何发布这篇文章：</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-blue-700 dark:text-blue-400">
          <li>复制上方内容</li>
          <li>
            创建新文件：{" "}
            <code className="rounded bg-blue-100 px-1 dark:bg-blue-900">
              src/content/posts/{slug}.mdx
            </code>
          </li>
          <li>粘贴内容并保存</li>
          <li>提交推送 — 或重新部署站点</li>
        </ol>
      </div>
    </div>
  );
}
