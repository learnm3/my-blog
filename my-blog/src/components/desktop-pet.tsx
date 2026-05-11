"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { PetChat } from "@/components/pet-chat";
import { PixelCat } from "@/components/pixel-cat";

type AnimState = "idle" | "walking" | "resting";

const IDLE_DURATION = 60000;

export function DesktopPet() {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [anim, setAnim] = useState<AnimState>("idle");
  const [chatOpen, setChatOpen] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [facingRight, setFacingRight] = useState(true);
  const movingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    setPos({
      x: window.innerWidth - 100,
      y: window.innerHeight - 260,
    });
  }, []);

  const moveToRandom = useCallback(() => {
    const margin = 80;
    const maxX = window.innerWidth - margin;
    const maxY = window.innerHeight - margin;
    const nextX = Math.max(margin, Math.random() * maxX - margin);
    const nextY = Math.max(margin, Math.random() * maxY - margin);
    setFacingRight(nextX > pos.x);
    setPos({ x: nextX, y: nextY });
    movingRef.current = true;
    setAnim("walking");
    setTimeout(() => {
      setAnim("idle");
      movingRef.current = false;
    }, 1500);
  }, [pos.x]);

  // 每 4-8 秒随机移动
  useEffect(() => {
    if (!mounted) return;
    const scheduleMove = () => {
      const delay = 4000 + Math.random() * 4000;
      return setTimeout(() => {
        if (!chatOpen && !movingRef.current) {
          moveToRandom();
        }
        timeoutRef.current = scheduleMove();
      }, delay);
    };

    const timeoutRef = { current: scheduleMove() };
    return () => clearTimeout(timeoutRef.current);
  }, [chatOpen, moveToRandom, mounted]);

  // 闲置太久进入休息状态
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastInteraction > IDLE_DURATION && anim === "idle") {
        setAnim("resting");
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [lastInteraction, anim]);

  const handleClick = () => {
    setLastInteraction(Date.now());
    if (anim === "resting") setAnim("idle");
    setChatOpen((prev) => !prev);
  };

  const closeChat = () => {
    setChatOpen(false);
    setLastInteraction(Date.now());
  };

  const expression = anim === "resting" ? "sleeping" : chatOpen ? "talking" : "idle";

  const animClass =
    anim === "idle"
      ? "animate-pet-bob"
      : anim === "walking"
        ? "animate-pet-walk"
        : "animate-pet-rest";

  return (
    <>
      {/* 像素猫 */}
      <button
        onClick={handleClick}
        className={`fixed z-40 cursor-pointer select-none text-4xl transition-all duration-[1500ms] ease-in-out ${animClass} ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{
          left: mounted ? pos.x : -100,
          top: mounted ? pos.y : -100,
          transform: facingRight ? "scaleX(1)" : "scaleX(-1)",
        }}
        aria-label="点击和小素对话"
        title="点我聊天喵~"
      >
        <PixelCat expression={expression} />
      </button>

      {/* 对话气泡 */}
      {chatOpen && mounted && (
        <div
          className="fixed z-50"
          style={{
            left: Math.min(pos.x, window.innerWidth - 320),
            bottom: Math.max(window.innerHeight - pos.y + 10, 20),
          }}
        >
          <PetChat onClose={closeChat} />
        </div>
      )}
    </>
  );
}
