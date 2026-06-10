"use client";

import { useEffect, useState } from "react";

export function VisitorCounter() {
  const [counts, setCounts] = useState<{
    pageViews: number;
    visitors: number;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function track() {
      // Check if this is a first-time visitor
      const visited = localStorage.getItem("_v");
      const isNewVisitor = !visited;
      if (isNewVisitor) {
        localStorage.setItem("_v", "1");
      }

      try {
        const res = await fetch("/api/visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isNewVisitor }),
        });
        const data = await res.json();
        if (!cancelled) setCounts(data);
      } catch {
        // If POST fails, try GET as fallback
        try {
          const res = await fetch("/api/visitor");
          const data = await res.json();
          if (!cancelled) setCounts(data);
        } catch {
          // silently fail
        }
      }
    }

    track();
    return () => { cancelled = true; };
  }, []);

  if (!counts) return null;

  return (
    <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
      <span>
        总访问量 <span className="font-semibold text-zinc-600 dark:text-zinc-300">{counts.pageViews.toLocaleString()}</span>
      </span>
      <span className="text-zinc-300 dark:text-zinc-600">|</span>
      <span>
        总访客数 <span className="font-semibold text-zinc-600 dark:text-zinc-300">{counts.visitors.toLocaleString()}</span>
      </span>
    </div>
  );
}
