import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-8">
      <h1 className="mb-2 text-3xl font-bold">Tech Notes</h1>
      <p className="mb-8 text-zinc-500 dark:text-zinc-400">
        Technical articles, notes, and things I&apos;ve learned.
      </p>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <span className="text-4xl">📝</span>
          <p className="text-zinc-500 dark:text-zinc-400">
            No posts yet. Start writing!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
