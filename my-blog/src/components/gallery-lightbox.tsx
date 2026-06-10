"use client";

import { useState, useEffect, useCallback } from "react";
import type { GalleryImage } from "@/lib/gallery-data";

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  const open = (i: number) => {
    setIndex(i);
    setVisible(true);
  };

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => setIndex(null), 200);
  }, []);

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
            className="group overflow-hidden rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity duration-200 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
        >
          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="上一张"
          >
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <img
            src={images[index].src}
            alt={images[index].alt}
            className={`max-h-[85vh] max-w-full rounded-lg object-contain transition-all duration-300 ${
              visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="下一张"
          >
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Close */}
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
            onClick={close}
            aria-label="关闭"
          >
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <span className="absolute bottom-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white/80">
            {index + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
