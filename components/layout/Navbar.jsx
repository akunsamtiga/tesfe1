// components/layout/Navbar.jsx
"use client";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  UserIcon,
  XMarkIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useAuth } from "./AuthContext";
import ThemeToggle from "../ui/ThemeToggle";
import NavbarSkeleton from "./NavbarSkeleton"; // Skeleton komponen

const CategoryDropdown = dynamic(() => import("../ui/CategoryDropdown"));

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const getProfilePictureUrl = (profilePicture) => {
  if (!profilePicture) return null;
  if (profilePicture.startsWith("http")) return profilePicture;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return `${API_URL}${profilePicture.startsWith("/") ? "" : "/"}${profilePicture}`;
};

export default function Navbar() {
  // Semua hook dipanggil secara konsisten
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth();
  const profileLink = user ? (user.role === "ADMIN" ? "/admin" : "/user") : "/login";
  const scrollTimeout = useRef(null);
  const lastScrollY = useRef(0);
  const menuRef = useRef(null);
  const categories = [
    { name: "Jaringan", href: "/category/jaringan" },
    { name: "Audio", href: "/category/audio" },
    { name: "Desktop", href: "/category/desktop" },
    { name: "Jasa", href: "/category/jasa" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    const handleScrollDirection = () => {
      if (isOpen) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScrollDirection);
    return () => window.removeEventListener("scroll", handleScrollDirection);
  }, [isOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/product?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  const handleLinkClick = useCallback((menuName) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "navbar_click", {
        event_category: "Navigation",
        event_label: menuName,
      });
    }
  }, []);

  // Selalu render semua hook, kemudian tampilkan skeleton bila belum mounted
  return !mounted ? (
    <NavbarSkeleton />
  ) : (
    <header
      aria-label="Main Navigation"
      className={`sticky top-0 z-50 w-full text-[var(--color-navbar-text)] transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="bg-[var(--color-navbar)] w-full px-3 md:px-4 lg:px-5 py-2 flex justify-between items-center">
        <div>
          <Link
            href="/"
            className="text-xl font-semibold text-[var(--color-navbar-title)] hover:text-blue-200 transition-colors duration-300"
            onClick={() => handleLinkClick("Logo")}
            aria-label="Home"
          >
            Sanstore
          </Link>
        </div>
        {/* Navigasi versi desktop */}
        <div className="hidden md:flex space-x-2 lg:space-x-4 text-[var(--color-navbar-text)]">
          <Link
            href="/category/handphone"
            onClick={() => handleLinkClick("Handphone")}
            className={`${
              pathname === "/category/handphone"
                ? "text-blue-300"
                : "text-[var(--color-navbar-title)]"
            } hover:text-blue-200 px-4 py-2 rounded-md text-md font-medium transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 hover:after:w-full after:transition-all`}
            aria-label="Handphone"
          >
            Handphone
          </Link>
          <Link
            href="/category/laptop"
            onClick={() => handleLinkClick("Laptop")}
            className={`${
              pathname === "/category/laptop"
                ? "text-blue-300"
                : "text-[var(--color-navbar-title)]"
            } hover:text-blue-200 px-4 py-2 rounded-md text-md font-medium transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 hover:after:w-full after:transition-all`}
            aria-label="Laptop"
          >
            Laptop
          </Link>
          <CategoryDropdown categories={categories} onLinkClick={handleLinkClick} />
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/product" legacyBehavior>
            <a
              aria-label="Go to product search"
              className="hidden md:flex p-1 rounded bg-transparent text-white hover:text-blue-200 transition-colors"
            >
              <MagnifyingGlassIcon className="w-full h-5" />
            </a>
          </Link>
          {mounted && (
            <button
              aria-label="Toggle dark mode"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="hidden md:flex p-1 rounded bg-transparent text-white hover:text-blue-200 transition-colors"
            >
              {theme === "light" ? (
                <MoonIcon className="w-full h-5" />
              ) : (
                <SunIcon className="w-full h-5" />
              )}
            </button>
          )}
          {/* Versi desktop: tampilkan profile dan logout */}
          {user ? (
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href={profileLink}
                onClick={() => handleLinkClick("Profile")}
                className="flex items-center text-white hover:text-blue-200 transition-colors"
                aria-label="Profile"
              >
                {user.profilePicture ? (
                  <img
                    src={getProfilePictureUrl(user.profilePicture)}
                    alt={user.name}
                    crossOrigin="anonymous"
                    className="w-7 h-7 object-cover rounded-full mr-2"
                    loading="lazy"
                  />
                ) : (
                  <UserIcon className="w-5 h-5 mr-2" />
                )}
                <span className="text-[var(--color-maintext)]">
                  {truncateText(user.name || user.email, 15)}
                </span>
              </Link>
              <button
                onClick={() => {
                  handleLinkClick("Logout");
                  logout();
                }}
                className="p-2 text-[var(--color-maintext)] hover:text-[var(--color-text)] rounded-lg hover:bg-[var(--color-border)] transition-colors flex items-center"
                aria-label="Logout"
              >
                <UserIcon className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => handleLinkClick("Login")}
              className="p-1 text-[var(--color-navbar-text)] hover:text-blue-200 rounded-lg transition-colors flex items-center"
              aria-label="Login"
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Login
            </Link>
          )}
          {/* Versi mobile: tampilkan foto profil jika sudah login */}
          {user && (
            <div className="md:hidden">
              <Link
                href={profileLink}
                onClick={() => setIsOpen(false)}
                aria-label="Profile"
              >
                {user.profilePicture ? (
                  <img
                    src={getProfilePictureUrl(user.profilePicture)}
                    alt={user.name}
                    className="w-7 h-7 object-cover rounded-full"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
              </Link>
            </div>
          )}
          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md text-[var(--color-navbar-button)] hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-iconnavring)] transition-colors md:hidden"
          >
            {isOpen ? (
              <XMarkIcon className="w-full h-5" />
            ) : (
              <Bars3Icon className="w-full h-5" />
            )}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              ref={menuRef}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "tween" }}
              style={{ transformOrigin: "top" }}
              className="md:hidden bg-[var(--color-navbar)] text-[var(--color-navbar-text)] p-1 py-2 space-y-2 relative z-30 shadow-lg rounded-b-2xl"
            >
              <div className="relative pb-3 pt-1">
                <form
                  onSubmit={handleSearchSubmit}
                  className="w-[95%] max-w-lg mx-auto mb-2 relative flex items-center"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-4 pr-10 py-1 text-sm rounded-lg bg-white text-blue-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    aria-label="Search"
                  />
                  <button type="submit" className="absolute right-3 text-gray-500 font-bold">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </button>
                </form>
                {user && (
                  <div className="flex items-center space-x-3 px-2 pt-2">
                    {user.profilePicture ? (
                      <img
                        src={getProfilePictureUrl(user.profilePicture)}
                        alt={user.name}
                        crossOrigin="anonymous"
                        className="w-8 h-8 object-cover rounded-full"
                        loading="lazy"
                      />
                    ) : (
                      <UserIcon className="w-8 h-8 text-[var(--color-maintext)]" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-blue-100 font-medium text-lg">
                        {truncateText(user.name || user.email, 20)}
                      </span>
                      <Link
                        href={profileLink}
                        onClick={() => setIsOpen(false)}
                        className="text-[var(--color-navbar-text)] text-xs"
                        aria-label="Go to Profile"
                      >
                        Lihat Profil
                      </Link>
                    </div>
                  </div>
                )}
                {!user && (
                  <>
                    <Link
                      href="/category/handphone"
                      onClick={() => {
                        handleLinkClick("Handphone (Mobile)");
                        setIsOpen(false);
                      }}
                      className={`${
                        pathname === "/category/handphone"
                          ? "text-blue-200 hover:text-[var(--color-navbar-text)]"
                          : "text-[var(--color-navbar-text)] hover:text-blue-200"
                      } block px-3 pt-2 rounded-md text-sm md:text-base font-medium transition-colors`}
                      aria-label="Handphone"
                    >
                      Handphone
                    </Link>
                    <Link
                      href="/category/laptop"
                      onClick={() => {
                        handleLinkClick("Laptop (Mobile)");
                        setIsOpen(false);
                      }}
                      className={`${
                        pathname === "/category/laptop"
                          ? "text-blue-200 hover:text-[var(--color-navbar-text)]"
                          : "text-[var(--color-navbar-text)] hover:text-blue-200"
                      } block px-3 pt-2 rounded-md text-sm md:text-base font-medium transition-colors`}
                      aria-label="Laptop"
                    >
                      Laptop
                    </Link>
                    <CategoryDropdown
                      categories={categories}
                      onLinkClick={handleLinkClick}
                      isMobile={true}
                    />
                  </>
                )}
                {user && (
                  <>
                    <Link
                      href={profileLink}
                      onClick={() => {
                        handleLinkClick("Dashboard (Mobile)");
                        setIsOpen(false);
                      }}
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors"
                      aria-label="Dashboard"
                    >
                      <Squares2X2Icon className="w-5 h-5 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLinkClick("Logout (Mobile)");
                        logout();
                        setIsOpen(false);
                      }}
                      className="text-[var(--color-navbar-text)] hover:text-red-200 px-3 py-2 rounded-md text-base font-medium flex items-center transition-colors"
                      aria-label="Logout"
                    >
                      <UserIcon className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </>
                )}
              </div>
              <div className="absolute bottom-[-25] bg-[var(--color-navbar)] left-1/2 rounded-3xl transform -translate-x-1/2 flex justify-center p-2">
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
