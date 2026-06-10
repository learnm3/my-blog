import type { GitHubRepo } from "@/lib/github";

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-blue-400",
  Rust: "bg-orange-500",
  Go: "bg-cyan-400",
  Java: "bg-red-500",
  "C++": "bg-pink-500",
  "C#": "bg-green-500",
  Ruby: "bg-red-400",
  PHP: "bg-purple-500",
  Swift: "bg-orange-400",
  Kotlin: "bg-purple-400",
  Dart: "bg-cyan-500",
  HTML: "bg-orange-500",
  CSS: "bg-blue-400",
  Shell: "bg-green-400",
  Lua: "bg-blue-500",
  default: "bg-zinc-400",
};

export function ProjectCard({ repo }: { repo: GitHubRepo }) {
  const langColor = languageColors[repo.language || ""] || languageColors.default;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-200 hover:animate-float hover:border-blue-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800"
    >
      <div className="flex items-center gap-2 mb-2">
        <svg className="h-4 w-4 text-zinc-400 dark:text-zinc-500" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
        </svg>
        <h3 className="text-lg font-semibold text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
          {repo.name}
        </h3>
      </div>
      <p className="mb-4 text-sm text-zinc-600 line-clamp-2 dark:text-zinc-400">
        {repo.description || "暂无描述"}
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className={`inline-block h-2.5 w-2.5 rounded-full ${langColor}`} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
          </svg>
          {repo.stargazers_count}
        </span>
        <span>
          {new Date(repo.updated_at).toLocaleDateString()}
        </span>
      </div>
    </a>
  );
}
