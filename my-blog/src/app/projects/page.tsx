import { fetchGitHubRepos } from "@/lib/github";
import { ProjectGrid } from "@/components/project-grid";

export default async function ProjectsPage() {
  let repos;
  let error: string | null = null;

  try {
    repos = await fetchGitHubRepos("learnm3");
  } catch {
    error = "Failed to load GitHub projects. Please try again later.";
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Open source work from GitHub, automatically synced from{" "}
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
