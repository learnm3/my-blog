"use client";

import { useState } from "react";
import { Minesweeper } from "@/components/games/minesweeper";
import { Snake } from "@/components/games/snake";
import { Game2048 } from "@/components/games/game-2048";

type Game = "menu" | "minesweeper" | "snake" | "2048";

const games = [
  { id: "minesweeper" as const, name: "Minesweeper", emoji: "💣", desc: "Classic minesweeper. Left-click to reveal, right-click to flag." },
  { id: "snake" as const, name: "Snake", emoji: "🐍", desc: "Eat food, grow longer. Don't hit the walls or yourself!" },
  { id: "2048" as const, name: "2048", emoji: "🧩", desc: "Merge tiles to reach 2048. Use arrow keys to slide." },
];

export default function GamesPage() {
  const [game, setGame] = useState<Game>("menu");

  return (
    <div className="py-8">
      <h1 className="mb-2 text-3xl font-bold">Mini Games</h1>
      <p className="mb-8 text-zinc-500 dark:text-zinc-400">
        Take a break and have some fun.
      </p>

      {game === "menu" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {games.map((g) => (
            <button
              key={g.id}
              onClick={() => setGame(g.id)}
              className="rounded-xl border border-zinc-200 p-6 text-left transition-all hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-blue-600"
            >
              <div className="mb-2 text-4xl">{g.emoji}</div>
              <h2 className="mb-1 text-lg font-semibold">{g.name}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{g.desc}</p>
            </button>
          ))}
        </div>
      )}

      {game !== "menu" && (
        <>
          <button
            onClick={() => setGame("menu")}
            className="mb-6 text-sm text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to games
          </button>
          {game === "minesweeper" && <Minesweeper />}
          {game === "snake" && <Snake />}
          {game === "2048" && <Game2048 />}
        </>
      )}
    </div>
  );
}
