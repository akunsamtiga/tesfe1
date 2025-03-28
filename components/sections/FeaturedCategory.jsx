// components/sections/FeaturedCategory.jsx
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Fungsi untuk membuat slug dari nama kategori
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Ganti spasi dengan tanda -
    .replace(/[^\w\-]+/g, '')    // Hapus karakter non-alphanumeric
    .replace(/\-\-+/g, '-');     // Ganti beberapa tanda - menjadi satu
};

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800, // durasi animasi (ms)
      once: true,    // animasi hanya dijalankan sekali
      easing: 'ease-out',
      offset: 120,
    });
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        if (!response.ok) throw new Error('Gagal mengambil data kategori');
        const data = await response.json();
        setCategories(data.slice(0, 6)); // Ambil maksimal 6 kategori
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading)
    return (
      <div className="bg-[var(--color-category)] relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-8 pb-5 md:pb-8 lg:pb-10">
          {/* Skeleton untuk judul */}
          <h2
            className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-center mb-5 md:mb-8 lg:mb-10"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <div className="w-1/3 h-8 bg-gray-300 rounded-md mx-auto animate-pulse" />
          </h2>
          {/* Skeleton grid untuk 6 kategori */}
          <div className="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-3 md:gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-[var(--color-background)] rounded-lg shadow-lg animate-pulse"
                data-aos="zoom-in"
                data-aos-delay={index * 200}
              >
                <div className="bg-[var(--color-category-card)] relative w-full aspect-square rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="bg-[var(--color-category)] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-8 pb-5 md:pb-8 lg:pb-10">
        <h2 
          className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-center text-[var(--color-category-title)] mb-5 md:mb-8 lg:mb-10"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          Kategori
        </h2>

        {/* Grid maksimal 6 kategori */}
        <div className="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-3 md:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${slugify(category.name)}`}
              className="group relative overflow-hidden rounded-lg md:rounded-xl lg:rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[var(--color-background)]"
              data-aos="zoom-in"
              data-aos-delay={index * 200} // Efek fade satu per satu
            >
              {/* Container gambar */}
              <div className="bg-[var(--color-category-card)] relative w-full aspect-square">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${category.imageUrl}`}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="p-1 md:p-3 lg:p-4 shadow-xl rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>

              {/* Overlay: disembunyikan pada mobile, hanya tampil pada tablet dan desktop */}
              <div className="hidden md:flex absolute inset-0 bg-gray-900 bg-opacity-50 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3
                  className="text-white text-[10px] md:text-[14px] lg:text-2xl font-semibold text-center px-2 tracking-wide"
                  style={{ textShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)" }}
                >
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
