import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

// Store in .next/cache — Next.js doesn't watch this directory for hot reload
const DATA_FILE = join(process.cwd(), ".next", "cache", "visitor-counts.json");

function readCounts(): { pageViews: number; visitors: number } {
  try {
    const raw = readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { pageViews: 0, visitors: 0 };
  }
}

function writeCounts(counts: { pageViews: number; visitors: number }) {
  const dir = join(process.cwd(), ".next", "cache");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(counts, null, 2), "utf-8");
}

// Simple in-memory throttle: don't count same IP more than once per 5 minutes
const throttle = new Map<string, number>();

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const body = await request.json().catch(() => ({}));
  const isNewVisitor = body.isNewVisitor === true;

  const counts = readCounts();

  // Throttle page views: same IP only counted once per 5 min
  const now = Date.now();
  const lastView = throttle.get(ip);
  if (!lastView || now - lastView > 5 * 60 * 1000) {
    counts.pageViews++;
    throttle.set(ip, now);
  }

  if (isNewVisitor) {
    counts.visitors++;
  }

  writeCounts(counts);

  return NextResponse.json(counts);
}

export async function GET() {
  const counts = readCounts();
  return NextResponse.json(counts);
}
