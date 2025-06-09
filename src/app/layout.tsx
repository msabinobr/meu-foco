import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import NavBar from "../components/NavBar";
import { AgentProvider } from "../components/AgentContext";
import AIAssistantWidget from "../components/AIAssistantWidget";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foco Mágico",
  description: "Pomodoro, Respiração e Tarefas para foco total",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AgentProvider>
            <div className="flex min-h-screen">
              <NavBar />
              <main className="flex-1 ml-64 p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                {children}
              </main>
              <AIAssistantWidget />
            </div>
          </AgentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
