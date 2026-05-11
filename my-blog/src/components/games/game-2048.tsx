"use client";

import { useState, useEffect, useCallback } from "react";

type Tile = { value: number; id: number };

function getEmpty(board: (number | null)[][]): { r: number; c: number }[] {
  const empty: { r: number; c: number }[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === null) empty.push({ r, c });
    }
  }
  return empty;
}

function addTile(board: (number | null)[][], nextId: number): { board: (number | null)[][]; id: number } {
  const empty = getEmpty(board);
  if (!empty.length) return { board, id: nextId };
  const { r, c } = empty[Math.floor(Math.random() * empty.length)];
  const newBoard = board.map((row) => [...row]);
  newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
  return { board: newBoard, id: nextId + 1 };
}

function slide(row: (number | null)[]): number[] {
  const filtered = row.filter((v) => v !== null) as number[];
  const result: number[] = [];
  for (let i = 0; i < filtered.length; i++) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      result.push(filtered[i] * 2);
      i++;
    } else {
      result.push(filtered[i]);
    }
  }
  while (result.length < 4) result.push(0);
  return result;
}

function moveBoard(board: (number | null)[][], dir: string): { board: (number | null)[][]; moved: boolean } {
  const newBoard: (number | null)[][] = Array.from({ length: 4 }, () => Array(4).fill(null));
  let moved = false;

  for (let i = 0; i < 4; i++) {
    let line: (number | null)[];
    if (dir === "left") line = board[i];
    else if (dir === "right") line = [...board[i]].reverse();
    else if (dir === "up") line = [board[0][i], board[1][i], board[2][i], board[3][i]];
    else line = [board[3][i], board[2][i], board[1][i], board[0][i]]; // down

    const slid = slide(line);
    const original = line.map((v) => v ?? 0);
    if (slid.some((v, j) => v !== original[j])) moved = true;

    const result = slid.map((v) => (v === 0 ? null : v));

    if (dir === "left") newBoard[i] = result;
    else if (dir === "right") newBoard[i] = [...result].reverse();
    else if (dir === "up")
      result.forEach((v, j) => (newBoard[j][i] = v));
    else result.forEach((v, j) => (newBoard[3 - j][i] = v));
  }

  return { board: newBoard, moved };
}

const tileColors: Record<number, string> = {
  2: "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100",
  4: "bg-amber-200 text-amber-900 dark:bg-amber-700 dark:text-amber-100",
  8: "bg-orange-300 text-orange-900 dark:bg-orange-600 dark:text-orange-100",
  16: "bg-orange-400 text-white",
  32: "bg-red-400 text-white",
  64: "bg-red-500 text-white",
  128: "bg-yellow-400 text-white",
  256: "bg-yellow-500 text-white",
  512: "bg-amber-500 text-white",
  1024: "bg-amber-600 text-white",
  2048: "bg-blue-500 text-white",
};

export function Game2048() {
  const [board, setBoard] = useState<(number | null)[][]>(() => {
    const b: (number | null)[][] = Array.from({ length: 4 }, () => Array(4).fill(null));
    const after1 = addTile(b, 0);
    return addTile(after1.board, after1.id).board;
  });
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const canMove = useCallback((b: (number | null)[][]) => {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (b[r][c] === null) return true;
        if (c < 3 && b[r][c] === b[r][c + 1]) return true;
        if (r < 3 && b[r][c] === b[r + 1][c]) return true;
      }
    }
    return false;
  }, []);

  const handleMove = useCallback(
    (dir: string) => {
      if (gameOver) return;
      const { board: newBoard, moved } = moveBoard(board, dir);
      if (!moved) return;
      const after = addTile(newBoard, 0);
      setBoard(after.board);

      if (after.board.flat().some((v) => v === 2048)) setWon(true);
      if (!canMove(after.board)) setGameOver(true);
    },
    [board, gameOver, canMove]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        const dir = e.key.replace("Arrow", "").toLowerCase();
        handleMove(dir);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleMove]);

  const reset = () => {
    const b: (number | null)[][] = Array.from({ length: 4 }, () => Array(4).fill(null));
    const after1 = addTile(b, 0);
    const after2 = addTile(after1.board, after1.id);
    setBoard(after2.board);
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center gap-4">
        <button
          onClick={reset}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
        >
          New Game
        </button>
        {won && <span className="text-sm font-semibold text-blue-600">You got 2048!</span>}
        {gameOver && <span className="text-sm font-semibold text-red-600">Game Over!</span>}
      </div>
      <div className="rounded-lg border-2 border-zinc-400 bg-zinc-300 p-2 dark:border-zinc-600 dark:bg-zinc-700">
        <div className="grid grid-cols-4 gap-2">
          {board.flat().map((v, i) => (
            <div
              key={i}
              className={`flex h-16 w-16 items-center justify-center rounded-md text-xl font-bold transition-all ${
                v ? tileColors[v] || "bg-zinc-800 text-white"
                : "bg-zinc-200 dark:bg-zinc-600"
              }`}
            >
              {v || ""}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-zinc-400">Arrow keys to move tiles</p>
    </div>
  );
}
