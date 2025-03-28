// components/sections/FeaturedHeroImage.jsx
'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

export default function FeaturedHeroImage() {
  const [heroImages, setHeroImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Fetch 4 Hero Images Terbaru
  useEffect(() => {
    async function fetchHeroImages() {
      try {
        const res = await fetch(`${API_URL}/api/hero-images`);
        if (!res.ok) throw new Error("Failed to fetch hero images");
        const heroData = await res.json();
        const latestHeroImages = heroData.slice(0, 4); // Ambil 4 gambar terbaru
        setHeroImages(latestHeroImages);
      } catch (error) {
        console.error("Error fetching hero images:", error);
      }
    }
    fetchHeroImages();
  }, [API_URL]);

  // Animasi Slide Otomatis
  useEffect(() => {
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroImages]);

  // Skeleton Component for Hero Image
  const HeroImageSkeleton = () => (
    <div className="relative w-[300px] h-[200px] md:w-[400px] md:h-[250px] lg:w-[500px] lg:h-[300px] rounded-lg overflow-hidden bg-gray-300 animate-pulse">
      {/* Placeholder untuk efek bayangan */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
    </div>
  );

  // Jika tidak ada gambar (belum dimuat atau kosong), tampilkan skeleton loader
  if (heroImages.length === 0) {
    return <HeroImageSkeleton />;
  }

  return (
    <div className="relative w-[300px] h-[200px] md:w-[400px] md:h-[250px] lg:w-[500px] lg:h-[300px] rounded-lg overflow-hidden bg-transparent">
      <div className="w-full h-full relative">
        {heroImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={`${API_URL}${image.imageUrl}`}
              alt={`Hero Image ${index + 1}`}
              fill
              className="object-contain object-center"
              style={{ filter: "drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.4))" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}