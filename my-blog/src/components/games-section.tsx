"use client";

import { useState } from "react";
import { Minesweeper } from "@/components/games/minesweeper";
import { Snake } from "@/components/games/snake";
import { Game2048 } from "@/components/games/game-2048";

type Game = "menu" | "minesweeper" | "snake" | "2048";

const games = [
  {
    id: "minesweeper" as const,
    name: "扫雷",
    emoji: "💣",
    color: "from-amber-500 to-red-500",
    desc: "左键翻开、右键标旗，清除所有地雷即可获胜！",
  },
  {
    id: "snake" as const,
    name: "贪吃蛇",
    emoji: "🐍",
    color: "from-green-500 to-emerald-500",
    desc: "吃掉食物变长，不要撞墙或撞到自己！",
  },
  {
    id: "2048" as const,
    name: "2048",
    emoji: "🧩",
    color: "from-blue-500 to-indigo-500",
    desc: "合并相同数字方块，用方向键滑动，达到 2048！",
  },
];

export function GamesSection() {
  const [game, setGame] = useState<Game>("menu");

  if (game !== "menu") {
    return (
      <>
        <button
          onClick={() => setGame("menu")}
          className="mb-6 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回游戏列表
        </button>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
          {game === "minesweeper" && <Minesweeper />}
          {game === "snake" && <Snake />}
          {game === "2048" && <Game2048 />}
        </div>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {games.map((g) => (
        <button
          key={g.id}
          onClick={() => setGame(g.id)}
          className="group rounded-2xl border border-zinc-200 bg-white p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800"
        >
          <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${g.color} p-3 text-3xl shadow-md transition-transform group-hover:scale-110`}>
            <span>{g.emoji}</span>
          </div>
          <h3 className="mb-1.5 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{g.name}</h3>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{g.desc}</p>
        </button>
      ))}
    </div>
  );
}
