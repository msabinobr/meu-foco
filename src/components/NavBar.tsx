"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Timer, Wind, CheckSquare, LayoutDashboard } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import NotificationCenter from "./NotificationCenter";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5 mr-2" /> },
  { href: "/", label: "Pomodoro", icon: <Timer className="w-5 h-5 mr-2" /> },
  { href: "/respiracao", label: "Respiração", icon: <Wind className="w-5 h-5 mr-2" /> },
  { href: "/tarefas", label: "Tarefas", icon: <CheckSquare className="w-5 h-5 mr-2" /> },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed left-0 top-0 z-10">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Foco Mágico</h1>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto mb-8 px-6 flex items-center gap-4">
        <NotificationCenter />
        <ThemeSwitcher />
      </div>
    </aside>
  );
}
