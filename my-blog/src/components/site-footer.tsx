"use client";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span>&copy; {new Date().getFullYear()} NoFinalLevel</span>
          <a
            href="https://github.com/learnm3"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            GitHub
          </a>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById("home");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-sm text-zinc-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}
