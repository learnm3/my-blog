import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-200 hover:animate-float hover:border-blue-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800"
    >
      <div className="flex items-center gap-3 mb-2">
        <time className="text-xs text-zinc-400 dark:text-zinc-500">
          {new Date(post.date).toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span className="text-xs text-zinc-300 dark:text-zinc-600">·</span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          {post.readingTime}
        </span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
        {post.title}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-500 line-clamp-2 dark:text-zinc-400">
        {post.summary}
      </p>
    </Link>
  );
}
