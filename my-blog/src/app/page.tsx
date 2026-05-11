import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-20 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
        NoFinalLevel
      </h1>
      <p className="max-w-lg text-xl text-zinc-600 dark:text-zinc-400">
        Full-stack developer passionate about building great software.
      </p>
      <p className="max-w-md text-zinc-500 dark:text-zinc-500">
        Welcome to my portfolio. Check out my projects and gallery below.
      </p>
      <div className="flex gap-4">
        <Link
          href="/projects"
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-white transition-colors hover:bg-blue-700"
        >
          View Projects
        </Link>
        <Link
          href="/gallery"
          className="rounded-lg border border-zinc-300 px-6 py-2.5 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Gallery
        </Link>
      </div>
    </section>
  );
}
