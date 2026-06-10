"use client";

import { useState, useMemo } from "react";
import leetcodeData from "@/content/leetcode-record.json";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];
const MONTHS = [
  "一月", "二月", "三月", "四月", "五月", "六月",
  "七月", "八月", "九月", "十月", "十一月", "十二月",
];

function getHeatColor(count: number): string {
  if (count === 0) return "";
  if (count <= 2) return "bg-green-200 dark:bg-green-900";
  if (count <= 4) return "bg-green-400 dark:bg-green-700";
  if (count <= 6) return "bg-green-500 dark:bg-green-600";
  return "bg-green-700 dark:bg-green-500";
}

// Proper calendar-day-based streak: count backwards from today
function calcStreak(data: Record<string, number>): number {
  let streak = 0;
  const today = new Date();
  const d = new Date(today);
  // Start from yesterday if today has no data yet
  // Actually start from today and go backwards
  while (true) {
    const key = d.toISOString().split("T")[0];
    if ((data[key] || 0) > 0) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const goPrev = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else { setMonth(m => m - 1); }
  };

  const goNext = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else { setMonth(m => m + 1); }
  };

  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells: { day: number; dateStr: string; isCurrentMonth: boolean }[] = [];
  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrev - i;
    const dt = new Date(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1, d);
    cells.push({ day: d, dateStr: dt.toISOString().split("T")[0], isCurrentMonth: false });
  }
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const dt = new Date(year, month, i);
    cells.push({ day: i, dateStr: dt.toISOString().split("T")[0], isCurrentMonth: true });
  }
  // Next month days to fill rows
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      const dt = new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, i);
      cells.push({ day: i, dateStr: dt.toISOString().split("T")[0], isCurrentMonth: false });
    }
  }

  const data = leetcodeData as Record<string, number>;

  // Month stats
  const stats = useMemo(() => {
    const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
    const entries = Object.entries(data).filter(([d]) => d.startsWith(monthKey));
    const monthTotal = entries.reduce((sum, [, v]) => sum + v, 0);
    const dayCount = entries.length;
    return { monthTotal, dayCount };
  }, [year, month]);

  const streak = useMemo(() => calcStreak(data), []);

  const rows: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  const isToday = (dateStr: string) => dateStr === today.toISOString().split("T")[0];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {year}年 {MONTHS[month]}
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={goToday}
            className="rounded px-2 py-0.5 text-xs text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
          >
            今天
          </button>
          <button
            onClick={goPrev}
            className="rounded p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="上一个月"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="rounded p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="下一个月"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mb-3 flex items-center gap-3 text-xs text-zinc-500">
        <span>
          本月 <span className="font-semibold text-green-600 dark:text-green-400">{stats.monthTotal}</span> 题
        </span>
        <span>
          打卡 <span className="font-semibold text-zinc-800 dark:text-zinc-200">{stats.dayCount}</span> 天
        </span>
        <span>
          连续 <span className="font-semibold text-orange-500">{streak}</span> 天
        </span>
      </div>

      {/* Weekday headers */}
      <div className="mb-1 grid grid-cols-7 text-center text-xs font-medium text-zinc-400 dark:text-zinc-500">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      {/* Day grid with heatmap colors */}
      <div className="grid grid-cols-7 text-center text-sm">
        {rows.map((row, ri) =>
          row.map((cell, ci) => {
            const count = data[cell.dateStr] || 0;
            const heatColor = cell.isCurrentMonth ? getHeatColor(count) : "";
            const todayClass = isToday(cell.dateStr);
            return (
              <div key={`${ri}-${ci}`} className="group relative flex items-center justify-center py-0.5">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors ${
                    !cell.isCurrentMonth
                      ? "text-zinc-300 dark:text-zinc-700"
                      : todayClass
                      ? "font-bold text-white bg-blue-600 ring-2 ring-blue-300 dark:ring-blue-700"
                      : heatColor
                        ? `${heatColor} text-zinc-800 dark:text-zinc-200`
                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  {cell.day}
                </div>
                {/* Tooltip */}
                {cell.isCurrentMonth && (
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2.5 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-700">
                    {formatDate(cell.dateStr)}
                    <span className="ml-1 text-zinc-400">{count} 题</span>
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-800 dark:border-t-zinc-700" />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500">
        <span>少</span>
        <div className="h-3 w-3 rounded-sm bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-3 w-3 rounded-sm bg-green-200 dark:bg-green-900" />
        <div className="h-3 w-3 rounded-sm bg-green-400 dark:bg-green-700" />
        <div className="h-3 w-3 rounded-sm bg-green-500 dark:bg-green-600" />
        <div className="h-3 w-3 rounded-sm bg-green-700 dark:bg-green-500" />
        <span>多</span>
      </div>
    </div>
  );
}
