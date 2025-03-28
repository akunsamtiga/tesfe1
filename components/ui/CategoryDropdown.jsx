// components/ui/CategoryDropdown.jsx
"use client";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";

export default function CategoryDropdown({ categories, onLinkClick, isMobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown saat diklik
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Tombol "Kategori" */}
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="category-dropdown"
        onClick={toggleDropdown}
        className={`text-sm md:text-base flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${
          isOpen ? "text-blue-200" : "text-white"
        } hover:text-blue-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 hover:after:w-full after:transition-all`}
      >
        Lainnya
        <ChevronDownIcon className="w-4 h-4 transition-transform duration-200" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="category-dropdown"
          className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden opacity-100 transition-opacity duration-200"
        >
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              onClick={() => {
                onLinkClick(`Kategori: ${category.name}${isMobile ? " (Mobile)" : ""}`);
                setIsOpen(false);
              }}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
