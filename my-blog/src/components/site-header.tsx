"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/icon-button";

const navLinks = [
  { href: "/#home", label: "Home", id: "home" },
  { href: "/#projects", label: "Projects", id: "projects" },
  { href: "/#gallery", label: "Gallery", id: "gallery" },
  { href: "/#blog", label: "Blog", id: "blog" },
  { href: "/#games", label: "Games", id: "games" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState("home");
  const lockRef = useRef(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const onSectionChange = (e: Event) => {
      lockRef.current = true;
      setActiveId((e as CustomEvent).detail);
      setTimeout(() => {
        lockRef.current = false;
      }, 1000);
    };

    window.addEventListener("sectionchange", onSectionChange);

    // IntersectionObserver as backup
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const best = visible.reduce((a, b) =>
          a.intersectionRatio >= b.intersectionRatio ? a : b
        );
        if (best.target.id && best.intersectionRatio > 0.5) {
          setActiveId(best.target.id);
        }
      },
      { threshold: [0.5, 0.7, 1] }
    );

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean) as HTMLElement[];

    sections.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("sectionchange", onSectionChange);
      observer.disconnect();
    };
  }, [pathname]);

  const isActive = (id: string) => {
    if (pathname !== "/") return false;
    return activeId === id;
  };

  // Non-home pages: plain header without highlights
  if (pathname !== "/") {
    return (
      <header className="sticky top-0 z-10 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/#home" className="group flex items-center gap-2 text-lg font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm text-white transition-transform group-hover:scale-110">
              N
            </span>
            <span className="text-blue-600 dark:text-blue-400">NoFinalLevel</span>
          </Link>
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-2 border-l border-zinc-200 pl-3 dark:border-zinc-700">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link
          href="/#home"
          className="group flex items-center gap-2 text-lg font-bold"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm text-white transition-transform group-hover:scale-110">
            N
          </span>
          <span className="text-blue-600 dark:text-blue-400">NoFinalLevel</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.id);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActiveId(link.id)}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-blue-600 dark:bg-blue-400" />
                )}
              </Link>
            );
          })}
          <div className="ml-2 border-l border-zinc-200 pl-3 dark:border-zinc-700">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
