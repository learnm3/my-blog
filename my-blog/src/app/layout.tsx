import "./globals.css";
import type { Metadata, Viewport } from "next";
import { AppThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DesktopPet } from "@/components/desktop-pet";

export const metadata: Metadata = {
  title: "NoFinalLevel | 个人作品集",
  description: "个人作品集 — 项目、相册与更多",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <AppThemeProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
            {children}
          </main>
          <SiteFooter />
          <DesktopPet />
        </AppThemeProvider>
      </body>
    </html>
  );
}
