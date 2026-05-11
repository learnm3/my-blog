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
      <h1 className="mb-8 text-3xl font-bold">Projects</h1>
      {error ? (
        <p className="text-zinc-500">{error}</p>
      ) : (
        <ProjectGrid repos={repos!} />
      )}
    </div>
  );
}
