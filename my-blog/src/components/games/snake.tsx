"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const GRID = 20;
const CELL = 20;
const SPEED = 150;

type Point = { x: number; y: number };

const DIR = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

function randomFood(snake: Point[]): Point {
  let food: Point;
  do {
    food = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

export function Snake() {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>(() => randomFood([{ x: 10, y: 10 }]));
  const [dir, setDir] = useState(DIR.ArrowRight);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const dirRef = useRef(dir);

  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.startsWith("Arrow") && e.key in DIR) {
        e.preventDefault();
        const newDir = DIR[e.key as keyof typeof DIR];
        const current = dirRef.current;
        if (newDir.x !== -current.x || newDir.y !== -current.y) {
          setDir(newDir);
        }
      }
      if (e.key === " " && !started) setStarted(true);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [started]);

  useEffect(() => {
    if (!started || gameOver) return;

    const tick = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = {
          x: head.x + dirRef.current.x,
          y: head.y + dirRef.current.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= GRID ||
          newHead.y < 0 ||
          newHead.y >= GRID ||
          prev.some((s) => s.x === newHead.x && s.y === newHead.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const ate = newHead.x === food.x && newHead.y === food.y;
        const newSnake = [newHead, ...prev];
        if (!ate) newSnake.pop();

        if (ate) {
          setScore((s) => s + 1);
          setFood(randomFood(newSnake));
        }

        return newSnake;
      });
    }, SPEED);

    return () => clearInterval(tick);
  }, [started, gameOver, food]);

  const reset = useCallback(() => {
    const initial = [{ x: 10, y: 10 }];
    setSnake(initial);
    setFood(randomFood(initial));
    setDir(DIR.ArrowRight);
    setGameOver(false);
    setStarted(false);
    setScore(0);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center gap-4">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          得分：{score}
        </span>
        <button
          onClick={reset}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
        >
          重新开始
        </button>
        {gameOver && (
          <span className="text-sm font-semibold text-red-600">游戏结束！</span>
        )}
        {!started && !gameOver && (
          <span className="text-sm text-zinc-500">按空格键开始</span>
        )}
      </div>
      <div
        className="relative border-2 border-zinc-400 dark:border-zinc-600"
        style={{ width: GRID * CELL, height: GRID * CELL }}
      >
        <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900">
          {/* Food */}
          <div
            className="absolute rounded-full bg-red-500"
            style={{
              left: food.x * CELL + 2,
              top: food.y * CELL + 2,
              width: CELL - 4,
              height: CELL - 4,
            }}
          />
          {/* Snake */}
          {snake.map((seg, i) => (
            <div
              key={i}
              className={`absolute rounded-sm ${
                i === 0
                  ? "bg-green-600"
                  : "bg-green-400"
              }`}
              style={{
                left: seg.x * CELL + 1,
                top: seg.y * CELL + 1,
                width: CELL - 2,
                height: CELL - 2,
              }}
            />
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-zinc-400">方向键控制移动</p>
    </div>
  );
}
