import { MarkdownEditor } from "@/components/markdown-editor";

export default function EditorPage() {
  return (
    <div className="py-8">
      <h1 className="mb-2 text-3xl font-bold">写文章</h1>
      <p className="mb-8 text-zinc-500 dark:text-zinc-400">
        使用 Markdown 编写技术笔记，支持标题、加粗、代码块、彩色文字等
      </p>
      <MarkdownEditor />
    </div>
  );
}
