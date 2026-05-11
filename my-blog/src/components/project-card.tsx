import type { GitHubRepo } from "@/lib/github";

export function ProjectCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
        {repo.name}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
        {repo.description || "No description"}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
            {repo.language}
          </span>
        )}
        <span>{repo.stargazers_count} stars</span>
        <span>
          Updated {new Date(repo.updated_at).toLocaleDateString()}
        </span>
      </div>
    </a>
  );
}
