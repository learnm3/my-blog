"use client";

import { useEffect, useRef } from "react";

const SECTION_IDS = ["home", "projects", "gallery", "blog", "games"];

function getCurrentSection(): number {
  let idx = 0;
  for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTION_IDS[i]);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) {
        idx = i;
        break;
      }
    }
  }
  return idx;
}

function notifySectionChange(id: string) {
  window.dispatchEvent(new CustomEvent("sectionchange", { detail: id }));
}

export function ScrollController({ children }: { children: React.ReactNode }) {
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deltaRef = useRef(0);
  const lockedRef = useRef(false);

  useEffect(() => {
    notifySectionChange(SECTION_IDS[getCurrentSection()]);

    const handleWheel = (e: WheelEvent) => {
      if (!(e.target instanceof Element)) return;

      const target = e.target;
      if (
        target.closest('[class*="fixed"]') ||
        target.closest("input") ||
        target.tagName === "INPUT"
      ) {
        return;
      }

      // Don't intercept if user is scrolling within a scrollable container
      let el: HTMLElement | null = target as HTMLElement;
      while (el) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        if (
          overflowY === "auto" ||
          overflowY === "scroll" ||
          overflowY === "hidden"
        ) {
          if (el.scrollHeight > el.clientHeight) {
            return; // let the container handle it
          }
        }
        el = el.parentElement;
      }

      e.preventDefault();

      deltaRef.current += e.deltaY;

      if (wheelTimer.current) clearTimeout(wheelTimer.current);

      wheelTimer.current = setTimeout(() => {
        const total = deltaRef.current;
        deltaRef.current = 0;

        if (Math.abs(total) < 40 || lockedRef.current) return;

        const currentIdx = getCurrentSection();
        let targetIdx = currentIdx;
        if (total > 0) {
          targetIdx = Math.min(SECTION_IDS.length - 1, currentIdx + 1);
        } else {
          targetIdx = Math.max(0, currentIdx - 1);
        }

        if (targetIdx !== currentIdx) {
          const el = document.getElementById(SECTION_IDS[targetIdx]);
          if (el) {
            lockedRef.current = true;
            notifySectionChange(SECTION_IDS[targetIdx]);
            el.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
              lockedRef.current = false;
            }, 800);
          }
        }
      }, 200);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      lockedRef.current = false;
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
    };
  }, []);

  return <>{children}</>;
}
