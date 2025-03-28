"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  ChartPieIcon,
  TagIcon,
  Squares2X2Icon,
  DocumentTextIcon,
  PhotoIcon,
  UserCircleIcon, // ikon untuk profile
} from '@heroicons/react/24/outline';
import ManagementCategory from '../../components/ui/ManagementCategory';
import ManagementProduct from '../../components/ui/ManagementProduct';
import PieChartStats from '../../components/ui/PieChartStats';
import ManagementHeroImage from '../../components/ui/ManagementHeroImage';
import ManagementArticle from '../../components/ui/ManagementArticle';
import AdminProfile from '../../components/ui/ManagementAdmin'; // Komponen profile admin
import ServerStatus from '@/components/ui/ServerStatus';
import AdminDashboardSkeleton from '../../components/ui/AdminDashboardSkeleton';

export default function AdminDashboard() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // State untuk memastikan komponen telah ter-mount
  const [mounted, setMounted] = useState(false);
  // State untuk sidebar, menu aktif, dan data dashboard
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroImageFile, setHeroImageFile] = useState(null);

  // Cek token sebelum melakukan fetch data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    setMounted(true);
    fetchDashboard();
    fetchHeroImages();
    fetchArticles();
    fetchCategories();
  }, [router]);

  async function fetchDashboard() {
    const token = localStorage.getItem('token');
    try {
      const [resProducts, resStats] = await Promise.all([
        fetch(`${API_URL}/api/products`),
        fetch(`${API_URL}/api/admin/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);
      if (resProducts.ok) {
        setProducts(await resProducts.json());
      } else {
        console.error('Failed to fetch products');
      }
      if (resStats.ok) {
        setStats(await resStats.json());
      } else {
        console.error('Failed to fetch dashboard stats');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchHeroImages() {
    try {
      const res = await fetch(`${API_URL}/api/hero-images`);
      if (res.ok) {
        setHeroImages(await res.json());
      } else {
        console.error('Failed to fetch hero images');
      }
    } catch (error) {
      console.error('Error fetching hero images:', error);
    }
  }

  async function fetchArticles() {
    try {
      const res = await fetch(`${API_URL}/api/articles`);
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || data);
      } else {
        console.error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      if (res.ok) {
        setCategories(await res.json());
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async function handleHeroImageUpload(e) {
    e.preventDefault();
    if (!heroImageFile) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("heroImage", heroImageFile);
    try {
      const res = await fetch(`${API_URL}/api/hero-images`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("Hero image uploaded successfully.");
        setHeroImageFile(null);
        fetchHeroImages(); // Refresh daftar hero images
      } else {
        console.error("Failed to upload hero image", res.statusText);
        alert("Failed to upload hero image");
      }
    } catch (error) {
      console.error("Error uploading hero image:", error);
      alert("Error uploading hero image");
    }
  }

  if (!mounted) return null;
  if (loading)
    return (
      <AdminDashboardSkeleton />
    );

  // Data untuk PieChartStats (untuk dashboard overview)
  const chartData = [
    { name: 'Users', value: stats.userCount || 0 },
    { name: 'Products', value: stats.productCount || 0 },
    { name: 'Reviews', value: stats.reviewCount || 0 },
    { name: 'Articles', value: articles.length || 0 },
    { name: 'Categories', value: categories.length || 0 },
  ];

  // Header judul berdasarkan menu aktif
  const headerTitles = {
    dashboard: 'Admin Dashboard',
    products: 'Products',
    categories: 'Categories',
    articles: 'Articles',
    'hero-images': 'Hero Images',
    profile: 'Profile',
  };

  // Menu items dengan ikon minimalis
  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <ChartPieIcon className="h-5 w-5 mr-5" /> },
    { key: 'products', label: 'Products', icon: <TagIcon className="h-5 w-5 mr-5" /> },
    { key: 'categories', label: 'Categories', icon: <Squares2X2Icon className="h-5 w-5 mr-5" /> },
    { key: 'articles', label: 'Articles', icon: <DocumentTextIcon className="h-5 w-5 mr-5" /> },
    { key: 'hero-images', label: 'Hero Images', icon: <PhotoIcon className="h-5 w-5 mr-5" /> },
    { key: 'profile', label: 'Profile', icon: <UserCircleIcon className="h-5 w-5 mr-5" /> },
  ];

  // Fungsi render konten berdasarkan menu aktif
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div>
            {/* Statistik Section */}
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5 lg:gap-6 mb-8">
              {[
                { title: 'Users', value: stats.userCount || 0, bg: 'bg-blue-100' },
                { title: 'Products', value: stats.productCount || 0, bg: 'bg-green-100' },
                { title: 'Reviews', value: stats.reviewCount || 0, bg: 'bg-yellow-100' },
                { title: 'Articles', value: articles.length || 0, bg: 'bg-purple-100' },
                { title: 'Categories', value: categories.length || 0, bg: 'bg-pink-100' },
              ].map((item, idx) => (
                <div key={idx} className={`${item.bg} py-3 md:py-4 lg:py-5 px-1 md:px-4 lg:px-5 rounded-lg text-center transform hover:scale-105 transition-transform duration-300`}>
                  <h3 className="text-xs sm:text-base md:text-lg font-semibold">{item.title}</h3>
                  <p className="text-lg sm:text-2xl md:text-3xl font-semibold mt-2">{item.value}</p>
                </div>
              ))}
            </div>
            {/* Pie Chart Section */}
            <section className="mb-4">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center">Statistik Visual</h2>
              <div className="w-full h-[350px] bg-white rounded-lg shadow p-2">
                <PieChartStats data={chartData} />
              </div>
            </section>
          </div>
        );
      case 'products':
        return <ManagementProduct />;
      case 'categories':
        return <ManagementCategory />;
      case 'articles':
        return <ManagementArticle />;
      case 'hero-images':
        return <ManagementHeroImage />;
      case 'profile':
        return <AdminProfile />;
      default:
        return null;
    }
  };

  return (
    <div className="flex overflow-hidden bg-gray-50">
      {/* Mobile Off-Canvas Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 flex z-50">
          <div
            className="fixed inset-0 bg-black opacity-70"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800 transform transition-transform duration-300 ease-in-out">
            {/* Header Sidebar untuk Mobile */}
            <div className="flex items-center max-h-[55px] justify-between px-4 py-4 bg-gray-700">
              <h1 className="text-white text-xl font-bold">Admin Panel</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white bg-red-800 p-1 rounded focus:outline-none hover:scale-90 hover:bg-red-700 transition-transform"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <nav className="bg-gray-800 flex-1 px-2 pt-2 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveMenu(item.key);
                    setSidebarOpen(false);
                  }}
                  className={`flex bg-gray-900 items-center w-full text-left px-3 py-2 rounded-md text-base font-medium transition-transform hover:scale-95 ${
                    activeMenu === item.key
                      ? 'bg-gray-700 text-blue-400'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 w-14" aria-hidden="true" />
        </div>
      )}

      {/* Desktop Sidebar */}
      {sidebarOpen && (
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center h-16 px-4 bg-gray-700">
              <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-auto text-white focus:outline-none bg-red-800 p-1 rounded-lg hover:scale-90 hover:bg-red-700 transition-transform"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="bg-gray-800 flex-1 px-2 py-2 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveMenu(item.key);
                    setSidebarOpen(false);
                  }}
                  className={`flex bg-gray-900 items-center w-full text-left px-3 py-2 rounded-md text-base font-medium transition-transform hover:scale-95 ${
                    activeMenu === item.key
                      ? 'bg-gray-700 text-blue-400'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white px-6 py-4 shadow-lg mb-4 md:mb-1">
          <div className="flex justify-between items-center relative">
            <div className="flex items-center">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="text-gray-600 focus:outline-none transition-colors hover:text-gray-800"
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
              )}
              <h1 className="text-xl font-bold text-gray-800 ml-4">
                {headerTitles[activeMenu]}
              </h1>
            </div>

            {/* Server Status untuk desktop */}
            <div className="hidden md:block">
              <ServerStatus />
            </div>

            {/* Server Status versi mobile — badge yang nempel di bawah title */}
            <div className="absolute top-full right-0 mt-1 md:hidden">
              <div className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full shadow-md">
                <ServerStatus />
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-4 px-3 md:px-4 lg:px-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
