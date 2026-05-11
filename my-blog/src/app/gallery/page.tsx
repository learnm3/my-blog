import { galleryImages } from "@/lib/gallery-data";
import { GalleryLightbox } from "@/components/gallery-lightbox";

export default function GalleryPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Gallery</h1>
      <p className="mb-6 text-zinc-500 dark:text-zinc-400">
        Replace these placeholders with your own images in{" "}
        <code className="rounded bg-zinc-100 px-1 text-sm dark:bg-zinc-800">
          lib/gallery-data.ts
        </code>
      </p>
      <GalleryLightbox images={galleryImages} />
    </div>
  );
}
