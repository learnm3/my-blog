import { galleryImages } from "@/lib/gallery-data";
import { GalleryLightbox } from "@/components/gallery-lightbox";

export default function GalleryPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Gallery</h1>
      <p className="mb-8 text-zinc-500 dark:text-zinc-400">
        A collection of images I love — screenshots, photography, and visual inspiration. Click any image to view it full size.
      </p>
      <GalleryLightbox images={galleryImages} />
    </div>
  );
}
