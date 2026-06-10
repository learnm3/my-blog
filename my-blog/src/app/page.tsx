import { fetchGitHubRepos } from "@/lib/github";
import { ProjectGrid } from "@/components/project-grid";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { galleryImages } from "@/lib/gallery-data";
import { GamesSection } from "@/components/games-section";
import { ScrollController } from "@/components/scroll-controller";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { ClickParticles } from "@/components/click-particles";
import { Calendar } from "@/components/calendar";
import { LeetCodeHeatmap } from "@/components/leetcode-heatmap";
import { VisitorCounter } from "@/components/visitor-counter";
import Link from "next/link";

export default async function HomePage() {
  let repos;
  let repoError: string | null = null;

  try {
    repos = await fetchGitHubRepos("learnm3");
  } catch {
    repoError = "GitHub 项目加载失败";
  }

  const posts = getAllPosts().slice(0, 3);

  return (
    <ScrollController>
      <ClickParticles />
      <div className="-mx-4 -mt-8">
      {/* ======== Section 1: Hero ======== */}
      <section
        id="home"
        className="relative flex flex-col items-center gap-10 px-4 py-24 text-center"
      >
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden">
          <div className="mt-20 h-[500px] w-[800px] rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-900/20" />
        </div>

        {/* Hero content */}
        <div className="relative space-y-6 pt-12">
          <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: "0ms" }}>
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-4xl font-bold text-white shadow-lg shadow-blue-500/25">
              N
            </div>
          </div>

          <h1
            className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 animate-fade-in-up sm:text-6xl"
            style={{ animationDelay: "100ms" }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
              NoFinalLevel
            </span>
          </h1>

          <p
            className="mx-auto max-w-lg text-xl text-zinc-600 dark:text-zinc-400 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            欢迎来到我的博客
          </p>
        </div>

        {/* Calendar + LeetCode Heatmap — directly visible on landing */}
        <div
          className="relative mx-auto w-full max-w-5xl animate-fade-in-up"
          style={{ animationDelay: "700ms" }}
        >
          <div className="mb-5 text-center">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">日常记录</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              日历与力扣刷题记录
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Calendar />
            <LeetCodeHeatmap />
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="animate-fade-in-up pb-4 opacity-40"
          style={{ animationDelay: "900ms" }}
        >
          <a
            href="#projects"
            className="flex flex-col items-center gap-2 text-xs text-zinc-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            <span>向下滚动探索</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>
      </section>

      {/* ======== Section 2: Projects ======== */}
      <section id="projects" className="flex min-h-screen items-center px-4 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">项目</h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              来自 GitHub 的开源作品，自动同步自{" "}
              <a
                href="https://github.com/learnm3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                @learnm3
              </a>
            </p>
          </div>
          {repoError ? (
            <p className="text-zinc-500">{repoError}</p>
          ) : (
            <ProjectGrid repos={repos!} />
          )}
        </div>
      </section>

      {/* ======== Section 4: Gallery ======== */}
      <section id="gallery" className="flex min-h-screen items-center bg-zinc-50/50 px-4 py-24 dark:bg-zinc-900/30">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">相册</h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              我喜欢的图片收藏 — 截图、摄影与视觉灵感
            </p>
          </div>
          <GalleryLightbox images={galleryImages} />
        </div>
      </section>

      {/* ======== Section 5: Blog ======== */}
      <section id="blog" className="flex min-h-screen items-center px-4 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">技术笔记</h2>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                技术文章、笔记与学习心得
              </p>
            </div>
            <Link
              href="/blog"
              className="shrink-0 text-sm text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              查看全部 →
            </Link>
          </div>
          {posts.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
              <span className="text-4xl">📝</span>
              <p className="text-zinc-500 dark:text-zinc-400">
                暂无文章，开始写作吧！
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ======== Section 6: Games ======== */}
      <section id="games" className="flex min-h-screen items-center px-4 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="mb-2 text-3xl font-bold">小游戏</h2>
          <p className="mb-8 text-zinc-500 dark:text-zinc-400">
            休息一下，三个经典浏览器小游戏
          </p>
          <GamesSection />
        </div>
      </section>

      {/* Bottom: visitor counter */}
      <div className="flex justify-center pb-8">
        <VisitorCounter />
      </div>
    </div>
    </ScrollController>
  );
}
