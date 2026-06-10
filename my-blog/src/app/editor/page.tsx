import { MarkdownEditor } from "@/components/markdown-editor";

export default function EditorPage() {
  return (
    <div className="py-8">
      <h1 className="mb-2 text-3xl font-bold">Write a Post</h1>
      <p className="mb-8 text-zinc-500 dark:text-zinc-400">
        Write your technical note using Markdown. Supports headings, bold, code blocks, colored text, and more.
      </p>
      <MarkdownEditor />
    </div>
  );
}
