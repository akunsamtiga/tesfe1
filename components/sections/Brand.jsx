// components/sections/Brand.jsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

// Custom hook untuk mendeteksi media query
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    // Set nilai awal
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

export default function Brand() {
  // State untuk tiga bagian produk
  const [heroProduct, setHeroProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [squeezeProducts, setSqueezeProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Gunakan custom hook untuk mendeteksi apakah layar desktop
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  // Jika desktop tampil 3 produk, selain itu 2 produk
  const squeezeCount = isDesktop ? 3 : 2;

  // Variants animasi untuk "as featured on"
  const productVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotate: -5,
      filter: "blur(10px)",
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        delay: index * 0.2,
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
    whileHover: {
      scale: 1.1,
      boxShadow: "0px 0px 25px rgba(255, 100, 100, 0.8)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Fetch produk dan filter berdasarkan kategori
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        if (res.ok) {
          const data = await res.json();
          // Filter produk berdasarkan kategori (pastikan penulisan nama konsisten, misalnya lowercase)
          const hero = data.find(
            (product) =>
              product.category &&
              product.category.name.toLowerCase() === "audio"
          );
          const featured = data.filter(
            (product) =>
              product.category &&
              product.category.name.toLowerCase() === "phone"
          );
          const squeeze = data.filter(
            (product) =>
              product.category &&
              product.category.name.toLowerCase() === "phone"
          );
          setHeroProduct(hero);
          setFeaturedProducts(featured);
          setSqueezeProducts(squeeze);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [API_URL]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
      offset: 120,
    });
  }, []);

  // Skeleton Component untuk Featured Image
  const FeaturedImageSkeleton = () => (
    <div className="bg-white bg-opacity-20 w-[90%] h-[90%] flex justify-center items-center rounded-xl animate-pulse">
      <div className="w-full h-full bg-gray-300 rounded-xl"></div>
    </div>
  );

  // Skeleton Component untuk Product Grid
  const ProductSkeleton = () => (
    <div className="relative w-full aspect-square max-w-[120px] md:max-w-[200px] lg:max-w-[220px] animate-pulse">
      <div className="w-full h-full bg-gray-300 rounded-lg"></div>
    </div>
  );

  // Skeleton Component untuk Squeeze the Day Section
  const SqueezeProductSkeleton = () => (
    <div className="bg-[var(--color-brand)] rounded-xl p-5 shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[102%] animate-pulse">
      <div className="relative aspect-square w-full rounded-xl overflow-hidden">
        <div className="w-full h-full bg-gray-300 rounded-xl"></div>
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-3 bg-gray-300 rounded"></div>
        <div className="h-3 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-[var(--color-brand)] w-full">
      <div className="bg-gradient-to-r from-[var(--color-brand-start)] via-[var(--color-brand-middle)] to-[var(--color-brand-end)] rounded-tl-[3rem] md:rounded-tl-[5rem] lg:rounded-tl-[8rem] rounded-br-[2rem] md:rounded-br-[4rem] lg:rounded-br-[5rem] text-white pt-8 pb-12">
        {/* Static Hero Section */}
        <section className="container py-5 px-6 md:px-10 lg:px-10 mx-auto flex flex-col md:flex-row items-center gap-2">
          <div className="w-full md:w-1/2 lg:w-1/2 text-left space-y-4 md:space-y-5 lg:space-y-6">
            <h1
              className="bg-gradient-to-r from-[var(--color-brand)] to-red-300 bg-clip-text text-transparent text-center md:text-left lg:text-left w-full md:w-full lg:w-3/4 text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight lg:pb-2 px-5 md:px-0 lg:px-0 md:pr-6 line-clamp-2"
              data-aos="fade"
            >
              Designed for Creators & Innovators
            </h1>
            <p
              className="text-[var(--color-brand-text)] text-xs md:text-sm lg:text-base w-full md:w-[90%] lg:w-[90%] text-center md:text-left lg:text-left"
              data-aos="fade"
            >
              Dari profesional hingga kreator, temukan perangkat terbaik untuk menyalurkan ide dan produktivitas Anda. 
            </p>
            <div className="flex flex-row gap-3 justify-center md:justify-start lg:justify-start">
              <button
                className="bg-[var(--color-brand-button1)] text-[var(--color-brand-text2)] px-4 py-2 rounded-full shadow-md hover:text-black transition duration-300 text-xs"
                data-aos="zoom-in"
              >
                Innovation
              </button>
              <button
                className="bg-[var(--color-brand-button2)] text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition duration-300 text-xs"
                data-aos="zoom-in"
              >
                Performance
              </button>
            </div>
          </div>
          <div className="bg-red-400 bg-opacity-30 w-full aspect-square max-w-[280px] md:max-w-[250px] lg:max-w-[350px] rounded-xl flex justify-center items-center mx-auto mt-5 md:mt-0 lg:mt-0 relative">
            <div className="absolute top-6 md:top-5 lg:top-7 right-6 md:right-5 lg:right-7 bg-[var(--color-brand-start)] text-white text-xs md:text-xs font-bold px-3 md:px-2 py-1 md:py-1 rounded-full shadow-md flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 14l6-6m0 0l-6-6m6 6H3"
                />
              </svg>
              20% OFF
            </div>
            <div className="bg-white bg-opacity-20 w-[90%] h-[90%] flex justify-center items-center rounded-xl">
              {loading ? (
                <FeaturedImageSkeleton />
              ) : heroProduct?.image ? (
                <Image
                  src={`${API_URL}${heroProduct.image}`}
                  alt={heroProduct.title}
                  height={350}
                  width={350}
                  className="object-contain rounded-xl hover:scale-105 transition-transform duration-500"
                  priority
                  data-aos="zoom-in"
                />
              ) : (
                <p className="text-gray-500 text-center">No Image Available</p>
              )}
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="container mx-auto px-4 md:px-4 lg:px-0 py-1 md:py-3 lg:py-6 my-6 md:my-8 lg:my-10">
          <h2 className="text-[var(--color-brand-text)] text-center text-sm md:text-base lg:text-lg font-medium mb-4 md:mb-6 lg:mb-8 uppercase tracking-wider">
            Smart Tech
          </h2>
          <div className="grid grid-cols-4 place-items-center">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))
              : featuredProducts.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={productVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    className="relative w-full aspect-square max-w-[120px] md:max-w-[200px] lg:max-w-[220px] transition-transform duration-300"
                  >
                    <Image
                      src={`${API_URL}${product.image}`}
                      alt={product.title}
                      fill
                      className="object-contain rounded-lg"
                      style={{
                        filter:
                          "drop-shadow(0px 0px 15px rgba(243, 242, 241, 0.8))",
                      }}
                    />
                  </motion.div>
                ))}
          </div>
        </section>

        {/* Built for Professionals Section */}
        <section className="container mx-auto px-4 md:px-8 lg:px-5 py-5 md:py-8 lg:py-5 rounded-xl">
          <div className="flex flex-col md:flex-row lg:flex-row gap-0">
            <div className="w-full md:w-2/4 lg:w-1/3 text-center md:text-left lg:text-left">
              <h2 className="text-[var(--color-brand-text)] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
                Built for Professionals
              </h2>
              <p className="text-[var(--color-brand-text)] text-xs md:text-sm lg:text-base mb-6 px-8 md:px-0">
                Perangkat yang mendukung kerja, kreasi, dan inovasi tanpa batas.
              </p>
            </div>
            {/* Grid: mobile/tablet 2 kolom, desktop 3 kolom */}
            <div className="w-full md:w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-8 px-8 md:px-8 lg:px-6">
              {loading
                ? Array.from({ length: squeezeCount }).map((_, index) => (
                    <SqueezeProductSkeleton key={index} />
                  ))
                : squeezeProducts.slice(0, squeezeCount).map((product, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: index * 0.15,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="bg-[var(--color-brand)] rounded-xl p-5 shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[102%]"
                    >
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden">
                        <Image
                          src={`${API_URL}${product.image}`}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <h3 className="text-black font-semibold text-lg mt-3 truncate">
                        {product.title}
                      </h3>
                      <span className="text-orange-600 font-medium text-sm md:text-base block">
                        {product.price.toLocaleString("id-ID")}
                      </span>
                      <span className="text-gray-500 text-xs md:text-sm block mt-1">
                        Stock: {product.stock > 0 ? `Stok tersisa: ${product.stock}` : "Habis"}
                      </span>
                    </motion.div>
                  ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
