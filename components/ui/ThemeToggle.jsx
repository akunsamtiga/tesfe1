// components/ui/ThemeToggle.jsx
"use client";
import React from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleSize = "36px";

  return (
    <div
      className={`flex items-center p-[4px] mx-auto bg-black ${
        theme === "dark" ? "bg-opacity-20" : "bg-opacity-40"
      } rounded-full w-max`}
      style={{ "--sz": toggleSize }}
    >
      {/* Tombol Mode Terang */}
      <button
        className="inline-flex items-center justify-center ring-offset-zinc-400 transition-colors text-yellow-500 hover:text-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-yellow-600 w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--sz)] max-w-[var(--sz)] max-h-[var(--sz)] p-0.5 rounded-full hover:bg-transparent data-[state=active]:bg-zinc-600/30"
        aria-label="Light Mode"
        data-state={theme === "light" ? "active" : ""}
        onClick={() => setTheme("light")}
      >
        <svg
          width="16px"
          height="16px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
        >
          <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" />
          <g data-g="high">
            <path d="M4 12h-3" />
            <path d="M12 4v-3" />
            <path d="M20 12h3" />
            <path d="M12 20v3" />
          </g>
          <g data-g="low">
            <path d="M6.343 17.657l-1.414 1.414" />
            <path d="M6.343 6.343l-1.414 -1.414" />
            <path d="M17.657 6.343l1.414 -1.414" />
            <path d="M17.657 17.657l-1.414 1.414" />
          </g>
        </svg>
      </button>

      {/* Tombol Mode Sistem */}
      <button
        className="inline-flex items-center justify-center ring-offset-zinc-400 transition-colors text-green-500 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-green-600 w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--color-navbar-text)] max-w-[var(--sz)] max-h-[var(--sz)] p-0.5 rounded-full hover:bg-transparent data-[state=active]:bg-zinc-600/30"
        aria-label="System Mode"
        data-state={theme === "system" ? "active" : ""}
        onClick={() => setTheme("system")}
      >
        <svg
          width="16px"
          height="16px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
        >
          <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
          <path d="M10 19v-3.96 3.15" />
          <path d="M7 19h5" />
          <rect rx="2" y="12" x="16" height="10" width="6" />
        </svg>
      </button>

      {/* Tombol Mode Malam */}
      <button
        className="inline-flex items-center justify-center ring-offset-zinc-400 transition-colors text-indigo-500 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-indigo-600 w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--sz)] max-w-[var(--sz)] max-h-[var(--sz)] p-0.5 rounded-full hover:bg-transparent data-[state=active]:bg-zinc-600/30"
        aria-label="Dark Mode"
        data-state={theme === "dark" ? "active" : ""}
        onClick={() => setTheme("dark")}
      >
        <svg
          width="16px"
          height="16px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="0"
          stroke="currentColor"
          fill="none"
        >
          <path
            d="m4.8.69c0-.38-.31-.69-.69-.69s-.69.31-.69.69v1.03h-1.03c-.38,0-.69.31-.69.69s.31.69.69.69h1.03v1.03c0,.38.31.69.69.69s.69-.31.69-.69v-1.03h1.03c.38,0-.69-.31-.69-.69s-.31-.69-.69-.69h-1.03V.69Zm5.14,5.14c0-.38-.31-.69-.69-.69s-.69.31-.69.69v1.03h-1.03c-.38,0-.69.31-.69.69s.31.69.69.69h1.03v1.03c0,.38.31.69.69.69s.69-.31.69-.69v-1.03h1.03c.38,0-.69-.31-.69-.69s-.31-.69-.69-.69h-1.03v-1.03ZM14.47,1.51l-.51-.07c-.37-.04-.58.38-.37.69.24.35.46.71.67,1.08.86,1.59,1.35,3.42,1.35,5.36,0,5.61-4.08,10.26-9.43,11.16-.41.07-.84.12-1.27.14-.37.02-.57.45-.31.71.12.12.24.24.36.35l.12.11.45.39.32.25.21.15.32.22.3.2c.21.13.42.25.64.37l.45.23.45.2.52.21.42.15c.23.08.46.14.7.21.18.05.36.09.54.13.22.04.43.08.65.12l.54.07.46.04c.22.01.44.02.66.02,6.25,0,11.31-5.07,11.31-11.31,0-.43-.02-.85-.07-1.27l-.06-.48c-.06-.38-.14-.76-.23-1.13-.12-.44-.26-.88-.43-1.3l-.19-.46-.13-.28-.13-.26c-.27-.53-.58-1.03-.93-1.51l-.26-.34-.34-.41-.28-.31-.2-.21-.28-.27-.38-.34-.55-.45-.42-.3-.5-.33-.55-.32-.56-.28-.19-.09-.41-.17-.47-.18-.43-.14-.56-.15-.45-.1-.5-.09Z"
            fill="currentColor"
            clipRule="evenodd"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}