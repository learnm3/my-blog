"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/icon-button";

const navLinks = [
  { href: "/#home", label: "Home", id: "home" },
  { href: "/#projects", label: "Projects", id: "projects" },
  { href: "/#gallery", label: "Gallery", id: "gallery" },
  { href: "/#games", label: "Games", id: "games" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isActive = (id: string) => {
    if (pathname !== "/") return false;
    if (id === "home") return !hash || hash === "#home";
    return hash === `#${id}`;
  };

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
