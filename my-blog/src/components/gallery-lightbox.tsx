"use client";

import { useState, useEffect, useCallback } from "react";
import type { GalleryImage } from "@/lib/gallery-data";

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => setIndex(i);
  const close = useCallback(() => setIndex(null), []);

  const prev = useCallback(() => {
    setIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => open(i)}
            className="overflow-hidden rounded-lg transition-opacity hover:opacity-80"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-48 w-full object-cover"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            ←
          </button>
          <img
            src={images[index].src}
            alt={images[index].alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            →
          </button>
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={close}
            aria-label="Close"
          >
            ✕
          </button>
          <span className="absolute bottom-4 text-sm text-white/60">
            {index + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
