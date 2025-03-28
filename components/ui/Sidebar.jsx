// components/ui/Sidebar.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-[#1F305E] text-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:translate-x-0`}
    >
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button className="md:hidden" onClick={toggleSidebar}>
          <FiX size={24} />
        </button>
      </div>

      <nav className="mt-8">
        <ul className="space-y-4">
          <li>
            <Link href="/admin" className="block p-3 hover:bg-[#6082B6] rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/products" className="block p-3 hover:bg-[#6082B6] rounded">
              Products
            </Link>
          </li>
          <li>
            <Link href="/admin/categories" className="block p-3 hover:bg-[#6082B6] rounded">
              Categories
            </Link>
          </li>
          <li>
            <Link href="/admin/articles" className="block p-3 hover:bg-[#6082B6] rounded">
              Articles
            </Link>
          </li>
          <li>
            <Link href="/admin/hero-images" className="block p-3 hover:bg-[#6082B6] rounded">
              Hero Images
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
