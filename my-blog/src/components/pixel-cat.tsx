"use client";

import { useMemo } from "react";

type Expression = "idle" | "happy" | "sleeping" | "talking";

// 8x8 pixel art cat — each number is a color index:
// 0=transparent, 1=dark outline, 2=body orange, 3=white, 4=pink ear/inner, 5=eye
const CAT_SPRITES: Record<Expression, number[][]> = {
  idle: [
    [0,0,1,1,0,0,0,0],
    [0,1,0,0,1,0,0,0],
    [1,0,4,0,0,1,0,0],
    [1,0,0,0,0,1,0,0],
    [1,2,2,2,2,1,0,0],
    [0,1,2,2,1,0,0,0],
    [0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0],
  ],
  happy: [
    [0,0,1,1,0,0,0,0],
    [0,1,0,0,1,0,0,0],
    [1,0,4,0,0,1,0,0],
    [1,0,0,0,0,1,0,0],
    [1,2,2,2,2,1,0,0],
    [0,1,2,2,1,0,0,0],
    [0,0,1,3,1,0,0,0],
    [0,0,0,1,0,0,0,0],
  ],
  sleeping: [
    [0,0,1,1,0,0,0,0],
    [0,1,0,0,1,0,0,0],
    [1,0,4,0,0,1,0,0],
    [1,0,0,0,0,1,0,0],
    [1,5,5,2,2,1,0,0],
    [0,1,2,2,1,0,0,0],
    [0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0],
  ],
  talking: [
    [0,0,1,1,0,0,0,0],
    [0,1,0,0,1,0,0,0],
    [1,0,4,0,0,1,0,0],
    [1,0,0,0,0,1,0,0],
    [1,2,2,2,2,1,0,0],
    [0,1,2,2,1,0,1,0],
    [0,0,1,1,0,1,3,1],
    [0,0,0,0,0,0,1,0],
  ],
};

const COLOR_MAP: Record<number, string> = {
  0: "transparent",
  1: "#1a1a2e",
  2: "#f4a261",
  3: "#ffffff",
  4: "#e88d8d",
  5: "#2d2d2d",
};

const PIXEL_SIZE = 6;

export function PixelCat({ expression = "idle" }: { expression?: Expression }) {
  const sprite = CAT_SPRITES[expression];

  const pixels = useMemo(() => {
    const result: { x: number; y: number; color: string }[] = [];
    for (let y = 0; y < sprite.length; y++) {
      for (let x = 0; x < sprite[y].length; x++) {
        const c = sprite[y][x];
        if (c !== 0) {
          result.push({ x, y, color: COLOR_MAP[c] });
        }
      }
    }
    return result;
  }, [sprite]);

  return (
    <div
      className="relative inline-block"
      style={{
        width: 8 * PIXEL_SIZE,
        height: 8 * PIXEL_SIZE,
      }}
    >
      {pixels.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: p.x * PIXEL_SIZE,
            top: p.y * PIXEL_SIZE,
            width: PIXEL_SIZE,
            height: PIXEL_SIZE,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}
