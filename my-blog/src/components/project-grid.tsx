import type { GitHubRepo } from "@/lib/github";
import { ProjectCard } from "@/components/project-card";

export function ProjectGrid({ repos }: { repos: GitHubRepo[] }) {
  if (repos.length === 0) {
    return (
      <p className="text-zinc-500">暂无公开仓库</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <ProjectCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
