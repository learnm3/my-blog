export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = [
  { id: 1, src: "/images/background.avif", alt: "My work", width: 1920, height: 1080 },
];
