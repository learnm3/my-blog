"use client";

import { useState } from "react";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];
const MONTHS = [
  "一月", "二月", "三月", "四月", "五月", "六月",
  "七月", "八月", "九月", "十月", "十一月", "十二月",
];

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

  const cells: (number | null)[] = [];
  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) cells.push(-(daysInPrev - i));
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);
  // Next month days to fill rows
  while (cells.length % 7 !== 0) cells.push(0);

  const isToday = (d: number) =>
    d > 0 && year === today.getFullYear() && month === today.getMonth() && d === today.getDate();

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
          {year}年 {MONTHS[month]}
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={goToday}
            className="rounded px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
          >
            今天
          </button>
          <button
            onClick={goPrev}
            className="rounded p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="上一个月"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="rounded p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="下一个月"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="mb-1 grid grid-cols-7 text-center text-xs font-medium text-zinc-400 dark:text-zinc-500">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 text-center text-sm">
        {rows.map((row, ri) =>
          row.map((d, ci) => {
            const prev = d !== null && d < 0;
            const next = d === 0;
            const absDay = d !== null && d < 0 ? -d : d;
            return (
              <div
                key={`${ri}-${ci}`}
                className={`flex items-center justify-center rounded-full py-1 ${
                  d === null
                    ? ""
                    : prev || next
                    ? "text-zinc-300 dark:text-zinc-700"
                    : isToday(absDay as number)
                    ? "bg-blue-600 font-semibold text-white"
                    : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                <span className="h-8 w-8 flex items-center justify-center">
                  {d !== null ? absDay : ""}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
