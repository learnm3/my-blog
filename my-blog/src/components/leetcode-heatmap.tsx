"use client";

import { useMemo, useCallback, useRef, useState } from "react";
import leetcodeData from "@/content/leetcode-record.json";

const COLORS = [
  "bg-zinc-100 dark:bg-zinc-800",       // 0
  "bg-green-200 dark:bg-green-900",     // 1-2
  "bg-green-400 dark:bg-green-700",     // 3-4
  "bg-green-500 dark:bg-green-600",     // 5-6
  "bg-green-700 dark:bg-green-500",     // 7+
];

const WEEKDAYS_SHORT = ["日", "一", "二", "三", "四", "五", "六"];

function getColorClass(count: number): string {
  if (count === 0) return COLORS[0];
  if (count <= 2) return COLORS[1];
  if (count <= 4) return COLORS[2];
  if (count <= 6) return COLORS[3];
  return COLORS[4];
}

export function LeetCodeHeatmap() {
  const today = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);
  const [tooltipCell, setTooltipCell] = useState<string | null>(null);

  const { year, month, rows } = useMemo(() => {
    const now = new Date(today);
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay(); // 0=Sun

    // Start from Sunday of the week containing the 1st
    const start = new Date(year, month, 1 - startDayOfWeek);
    const endDayOfWeek = lastDay.getDay();
    const end = new Date(year, month, lastDay.getDate() + (6 - endDayOfWeek));

    const data = leetcodeData as Record<string, number>;

    // Build grid: rows[dayOfWeek][weekIndex]
    const rows: { date: string; count: number; inMonth: boolean }[][] = Array.from({ length: 7 }, () => []);
    const current = new Date(start);

    while (current <= end) {
      const dayOfWeek = current.getDay(); // 0=Sun
      const dateStr = current.toISOString().split("T")[0];
      const inMonth = current.getMonth() === month;
      rows[dayOfWeek].push({
        date: dateStr,
        count: inMonth ? (data[dateStr] || 0) : 0,
        inMonth,
      });
      current.setDate(current.getDate() + 1);
    }

    return { year, month, rows };
  }, [today]);

  const stats = useMemo(() => {
    const data = leetcodeData as Record<string, number>;
    const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
    const entries = Object.entries(data).filter(([d]) => d.startsWith(monthKey));
    const monthTotal = entries.reduce((sum, [, v]) => sum + v, 0);
    const dayCount = entries.length;

    let currentStreak = 0;
    const sorted = entries.sort((a, b) => b[0].localeCompare(a[0]));
    for (const [, count] of sorted) {
      if (count > 0) currentStreak++;
      else break;
    }

    return { monthTotal, dayCount, currentStreak };
  }, [year, month]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  const MONTHS = [
    "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月",
  ];

  const numWeeks = rows[0]?.length || 0;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Compact header: title + stats inline */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {MONTHS[month]} 刷题记录
        </h3>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-zinc-500">
            本月 <span className="font-semibold text-zinc-800 dark:text-zinc-200">{stats.monthTotal}</span> 题
          </span>
          <span className="text-zinc-500">
            打卡 <span className="font-semibold text-green-600 dark:text-green-400">{stats.dayCount}</span> 天
          </span>
          <span className="text-zinc-500">
            连续 <span className="font-semibold text-orange-500">{stats.currentStreak}</span> 天
          </span>
        </div>
      </div>

      {/* Grid: weekday labels on left, colored cells on right */}
      <div className="flex gap-1.5">
        {/* Weekday labels column */}
        <div className="flex flex-col gap-1 pt-0.5">
          {WEEKDAYS_SHORT.map((d, i) => (
            <div
              key={d}
              className="flex size-5 items-center justify-end text-[11px] text-zinc-400 dark:text-zinc-500"
              style={{ visibility: rows[i]?.length ? "visible" : "hidden" }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Cells grid: rows = days of week, columns = weeks */}
        <div className="flex-1 overflow-x-auto">
          <div className="inline-flex gap-1">
            {Array.from({ length: numWeeks }, (_, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {rows.map((weekData, di) => {
                  const day = weekData[wi];
                  if (!day) return <div key={`${di}-${wi}`} className="size-5" />;
                  const isHovered = tooltipCell === day.date;
                  return (
                    <div
                      key={day.date}
                      title={`${formatDate(day.date)} · ${day.count} 题`}
                      className={`relative size-5 rounded-sm cursor-default ${
                        day.inMonth ? getColorClass(day.count) : "bg-transparent"
                      }`}
                      onMouseEnter={() => day.inMonth && setTooltipCell(day.date)}
                      onMouseLeave={() => setTooltipCell(null)}
                    >
                      {isHovered && (
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-xs text-white shadow-lg dark:bg-zinc-700">
                          {formatDate(day.date)}
                          <span className="ml-1 text-zinc-400">{day.count} 题</span>
                          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-800 dark:border-t-zinc-700" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-end gap-1 text-[11px] text-zinc-400 dark:text-zinc-500">
        <span>少</span>
        <div className="size-3 rounded-sm bg-zinc-100 dark:bg-zinc-800" />
        <div className="size-3 rounded-sm bg-green-200 dark:bg-green-900" />
        <div className="size-3 rounded-sm bg-green-400 dark:bg-green-700" />
        <div className="size-3 rounded-sm bg-green-500 dark:bg-green-600" />
        <div className="size-3 rounded-sm bg-green-700 dark:bg-green-500" />
        <span>多</span>
      </div>
    </div>
  );
}
