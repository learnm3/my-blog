import "./globals.css";
import type { Metadata } from "next";
import { AppThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DesktopPet } from "@/components/desktop-pet";

export const metadata: Metadata = {
  title: "NoFinalLevel | Portfolio",
  description: "Personal portfolio — projects, gallery, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <AppThemeProvider>
          <SiteHeader />
          <main className="mx-auto max-w-5xl flex-1 px-4 py-8">
            {children}
          </main>
          <SiteFooter />
          <DesktopPet />
        </AppThemeProvider>
      </body>
    </html>
  );
}
