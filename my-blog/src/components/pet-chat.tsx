"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { getPetResponse, PET_PERSONA } from "@/lib/pet-responses";

type Message = { role: "user" | "pet"; text: string };

const openingLines = [
  "喵~ 欢迎！本喵是小素，这个网站的守护精灵~ 有什么想聊的？",
  "嗨！新朋友！本喵叫小素，是 NoFinalLevel 的像素猫。随便看看，随便聊聊~",
  "喵！你终于来啦~ 本喵等你好久了！想了解什么？项目、游戏、还是本喵的故事？",
];

export function PetChat({ onClose }: { onClose: () => void }) {
  const opening = useMemo(
    () => openingLines[Math.floor(Math.random() * openingLines.length)],
    []
  );
  const [messages, setMessages] = useState<Message[]>([
    { role: "pet", text: opening },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");

    setTimeout(() => {
      const reply = getPetResponse(text);
      setMessages((prev) => [...prev, { role: "pet", text: reply }]);
    }, 500 + Math.random() * 600);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") send();
    if (e.key === "Escape") onClose();
  };

  return (
    <div className="flex h-80 w-72 flex-col rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      {/* 顶部栏 */}
      <div className="flex items-center justify-between border-b border-zinc-200 px-3 py-2 dark:border-zinc-700">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <span>🐱</span>
          <span>{PET_PERSONA.name}</span>
          <span className="text-xs text-zinc-400">· 像素猫</span>
        </span>
        <button
          onClick={onClose}
          className="text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          aria-label="关闭对话"
        >
          ✕
        </button>
      </div>

      {/* 消息列表 */}
      <div
        ref={listRef}
        className="flex-1 space-y-2 overflow-y-auto p-3"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-1.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* 输入框 */}
      <div className="flex border-t border-zinc-200 dark:border-zinc-700">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="跟小素说点什么…"
          className="flex-1 rounded-bl-xl bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-400"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="px-3 py-2 text-sm text-blue-600 transition-colors hover:text-blue-700 disabled:text-zinc-300 dark:text-blue-400 dark:hover:text-blue-300 dark:disabled:text-zinc-600"
        >
          发送
        </button>
      </div>
    </div>
  );
}
