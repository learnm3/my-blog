export default function ProjectsLoading() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border border-zinc-200 p-5 dark:border-zinc-800"
          >
            <div className="mb-2 h-5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="mb-4 h-4 w-full rounded bg-zinc-100 dark:bg-zinc-800/50" />
            <div className="h-3 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
