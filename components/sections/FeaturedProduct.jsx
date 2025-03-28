'use client';

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // visibleCount disesuaikan berdasarkan ukuran layar:
  // Mobile: 15 produk, md: 16 produk, lg: 15 produk.
  const [visibleCount, setVisibleCount] = useState(20);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const productSectionRef = useRef(null);

  // Update visibleCount berdasarkan lebar layar
  useEffect(() => {
    function updateVisibleCount() {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width >= 1024) {
          // Desktop: 5 kolom x 4 baris = 20 produk
          setVisibleCount(20);
        } else if (width >= 768) {
          // Tablet (md): 4 kolom x 4 baris = 16 produk
          setVisibleCount(16);
        } else {
          // Mobile (default): 3 kolom x 5 baris = 15 produk
          setVisibleCount(15);
        }
        // Reset halaman ke 1 ketika layout berubah
        setCurrentPage(1);
      }
    }
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Fetch produk terbaru dari API
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/api/products?sortBy=createdAt&order=desc&page=${currentPage}&limit=${visibleCount}`
        );
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || data);
          setTotalCount(data.totalCount || null);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [API_URL, currentPage, visibleCount]);

  // Hitung total halaman jika totalCount tersedia
  const totalPages = totalCount ? Math.ceil(totalCount / visibleCount) : null;

  // Fungsi untuk scroll ke bagian Produk Terbaru
  const scrollToProducts = () => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => {
        const newPage = Math.max(prev - 1, 1);
        setTimeout(() => scrollToProducts(), 0);
        return newPage;
      });
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      const newPage = totalPages ? Math.min(prev + 1, totalPages) : prev + 1;
      setTimeout(() => scrollToProducts(), 0);
      return newPage;
    });
  };

  // Skeleton Component untuk loading
  const Skeleton = () => (
    <div className="bg-[var(--color-product)] rounded-lg shadow-md overflow-hidden flex flex-col h-full animate-pulse">
      <div className="relative w-full h-40 bg-gray-300 rounded-t-xl overflow-hidden"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="mt-auto">
          <div className="h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative z-1 bg-gradient-to-r from-[var(--color-brand-start)] via-[var(--color-brand-middle)] to-[var(--color-brand-end)]">
      <section
        ref={productSectionRef}
        className="bg-[var(--color-product)] min-h-[124rem] md:min-h-[105rem] lg:min-h-[106rem] rounded-br-[2rem] md:rounded-br-[4rem] lg:rounded-br-[5rem] pb-[3rem] md:pb-[3rem] lg:pb-[3rem]"
      >
        <div className="bg-[var(--color-primary)]">
          <div className="bg-[var(--color-product)] w-full h-[60px] rounded-t-[3rem] md:rounded-t-[4rem] lg:rounded-t-[6rem]"></div>
        </div>
        <div className="container mx-auto px-3 md:px-7 lg:px-0 ">
          {!loading && products.length > 0 && (
            <h2 className="text-[var(--color-product-title)] text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-center mb-8 md:mb-10 lg:mb-14">
              Produk Terbaru
            </h2>
          )}

          {loading ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-5 gap-y-6 md:gap-y-8 lg:gap-y-10">
              {Array.from({ length: visibleCount }).map((_, index) => (
                <Skeleton key={index} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center items-center h-40 bg-[var(--color-product)] rounded-lg shadow-md">
              <p className="text-xl font-medium text-gray-600">
                Produk belum tersedia
              </p>
            </div>
          ) : (
            <>
              {/* Grid Produk */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-5 gap-y-6 md:gap-y-8 lg:gap-y-10">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[var(--color-product)] rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform duration-300"
                  >
                    <div className="relative w-full h-40 bg-[var(--color-product-card)] rounded-t-xl overflow-hidden">
                      {product.image ? (
                        <Image
                          src={`${API_URL}${product.image}`}
                          alt={product.title}
                          fill
                          className="object-contain hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-[var(--color-product)]">
                          No Image Available
                        </div>
                      )}
                    </div>
                    <div className="bg-[var(--color-product)] p-1 flex flex-col flex-grow">
                      <h3 className="text-[var(--color-product-title)] text-sm md:text-base lg:text-lg font-semibold line-clamp-2 my-1 md:my-2 lg:my-2">
                        {product.title}
                      </h3>
                      <p className="text-[var(--color-product-rupiah)] text-sm md:text-base lg:text-lg font-semibold">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                      <p
                        className={`text-xs md:text-sm lg:text-base font-thin my-1 ${
                          product.stock > 0
                            ? "text-[var(--color-product-stock)]"
                            : "text-red-500"
                        }`}
                      >
                        {product.stock > 0 ? `Stok tersisa: ${product.stock}` : "Habis"}
                      </p>
                      <div className="flex items-center mb-2 md:mb-3 lg:mb-3">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-3 md:h-4 lg:h-5 w-3 md:w-4 lg:w-5 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs md:text-sm lg:text-base text-[var(--color-product-text)] mb-2">
                        {product.reviews?.length
                          ? `${product.reviews.length} Ulasan`
                          : ""}
                      </p>
                      <div className="mt-auto">
                        <Link
                          href={`/product/${product.id}`}
                          className="block text-xs md:text-base lg:text-base bg-[var(--color-product-button)] text-white text-center py-2 rounded-lg hover:bg-blue-700 transition m-1"
                        >
                          Lihat Produk
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 hover:scale-110 transition-transform duration-300 ease-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm font-semibold">
                  Halaman {currentPage} {totalPages ? ` / ${totalPages}` : ""}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={
                    totalPages
                      ? currentPage === totalPages
                      : products.length < visibleCount
                  }
                  className="p-3 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 hover:scale-110 transition-transform duration-300 ease-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
