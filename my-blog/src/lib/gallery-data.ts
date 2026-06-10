export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = [
  { id: 1, src: "/images/03d827b91209456c837eb59528ff29ea20240520.png", alt: "作品截图一", width: 1920, height: 1080 },
  { id: 2, src: "/images/8a5681f7f4d84b15a193f334edc11a6720240520.png", alt: "作品截图二", width: 1920, height: 1080 },
  { id: 3, src: "/images/0079afd61b274b54a1197c31f2eb7eaa20240520.png", alt: "作品截图三", width: 1920, height: 1080 },
  { id: 4, src: "/images/adb220343fca4c309d84c24a23b0a79f20240520.png", alt: "作品截图四", width: 1920, height: 1080 },
];
