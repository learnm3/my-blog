"use client";

import { useMemo } from "react";

type Expression = "idle" | "happy" | "sleeping" | "talking";

// 爱弥斯 像素画 — 粉色长发 + 胸口波动爱心
// 0=透明 1=深色轮廓 2=粉色头发 3=白色 4=爱心红 5=眼睛
const SPRITES: Record<Expression, number[][]> = {
  idle: [
    [0, 2, 2, 2, 2, 2, 2, 0],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 3, 3, 3, 3, 3, 2],
    [2, 3, 5, 3, 3, 5, 3, 2],
    [2, 3, 3, 4, 4, 3, 3, 2],
    [2, 3, 3, 3, 3, 3, 3, 2],
    [0, 2, 3, 3, 3, 3, 2, 0],
    [0, 0, 2, 2, 2, 2, 0, 0],
  ],
  happy: [
    [0, 2, 2, 2, 2, 2, 2, 0],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 3, 3, 3, 3, 3, 2],
    [2, 3, 5, 6, 6, 5, 3, 2],
    [2, 3, 3, 4, 4, 3, 3, 2],
    [2, 3, 3, 3, 3, 3, 3, 2],
    [0, 2, 3, 6, 6, 3, 2, 0],
    [0, 0, 2, 2, 2, 2, 0, 0],
  ],
  sleeping: [
    [0, 2, 2, 2, 2, 2, 2, 0],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 3, 3, 3, 3, 3, 2],
    [2, 3, 1, 1, 1, 1, 3, 2],
    [2, 3, 3, 4, 4, 3, 3, 2],
    [2, 3, 3, 3, 3, 3, 3, 2],
    [0, 2, 3, 3, 3, 3, 2, 0],
    [0, 0, 2, 2, 2, 2, 0, 0],
  ],
  talking: [
    [0, 2, 2, 2, 2, 2, 2, 0],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 3, 3, 3, 3, 3, 2],
    [2, 3, 5, 3, 3, 5, 3, 2],
    [2, 3, 3, 4, 4, 3, 3, 2],
    [2, 3, 3, 3, 7, 3, 3, 2],
    [0, 2, 3, 7, 7, 3, 2, 0],
    [0, 0, 2, 2, 2, 2, 0, 0],
  ],
};

const COLOR_MAP: Record<number, string> = {
  0: "transparent",
  1: "#2a1a3a",
  2: "#f8a0b8",
  3: "#ffffff",
  4: "#ff5e7a",
  5: "#2d2d2d",
  6: "#ffb8c8",
  7: "#1a1a2e",
};

const PIXEL_SIZE = 6;

export function PixelCat({ expression = "idle" }: { expression?: Expression }) {
  const sprite = SPRITES[expression];

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
