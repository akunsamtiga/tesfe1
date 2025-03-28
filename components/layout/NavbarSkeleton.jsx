// components/layout/NavbarSkeleton.jsx
"use client";
import React from "react";

export default function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full animate-pulse">
      <nav className="bg-gray-300 w-full px-3 md:px-4 lg:px-5 py-2 flex justify-between items-center">
        {/* Logo Skeleton */}
        <div className="w-32 h-6 bg-gray-400 rounded"></div>
        {/* Menu Links Skeleton (desktop) */}
        <div className="hidden md:flex space-x-2 lg:space-x-4">
          <div className="w-24 h-4 bg-gray-400 rounded"></div>
          <div className="w-24 h-4 bg-gray-400 rounded"></div>
          <div className="w-24 h-4 bg-gray-400 rounded"></div>
        </div>
        {/* Icons Skeleton */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          {/* Untuk versi mobile */}
          <div className="md:hidden">
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </nav>
    </header>
  );
}
