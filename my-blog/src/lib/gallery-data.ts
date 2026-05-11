export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = [
  { id: 1, src: "https://picsum.photos/seed/1/800/600", alt: "Placeholder 1", width: 800, height: 600 },
  { id: 2, src: "https://picsum.photos/seed/2/800/600", alt: "Placeholder 2", width: 800, height: 600 },
  { id: 3, src: "https://picsum.photos/seed/3/600/800", alt: "Placeholder 3", width: 600, height: 800 },
  { id: 4, src: "https://picsum.photos/seed/4/800/600", alt: "Placeholder 4", width: 800, height: 600 },
  { id: 5, src: "https://picsum.photos/seed/5/800/800", alt: "Placeholder 5", width: 800, height: 800 },
  { id: 6, src: "https://picsum.photos/seed/6/800/600", alt: "Placeholder 6", width: 800, height: 600 },
];
