import { fetchGitHubRepos } from "@/lib/github";
import { ProjectGrid } from "@/components/project-grid";

export default async function ProjectsPage() {
  let repos;
  let error: string | null = null;

  try {
    repos = await fetchGitHubRepos("learnm3");
  } catch {
    error = "GitHub 项目加载失败，请稍后重试";
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">项目</h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          来自 GitHub 的开源作品，自动同步自{" "}
          <a
            href="https://github.com/learnm3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            @learnm3
          </a>.
        </p>
      </div>
      {error ? (
        <p className="text-zinc-500">{error}</p>
      ) : (
        <ProjectGrid repos={repos!} />
      )}
    </div>
  );
}
