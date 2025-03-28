// app/category/[name]/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function CategoryPage() {
  const { name } = useParams(); // Mengambil parameter 'name' dari URL
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(9);

  // Update visibleCount berdasarkan lebar layar
  useEffect(() => {
    function updateVisibleCount() {
      const width = window.innerWidth;
      if (width >= 1024) {
        // Desktop: 4 kolom x 2 baris = 8 produk
        setVisibleCount(8);
      } else {
        // Mobile & Tablet: 3 kolom x 3 baris = 9 produk
        setVisibleCount(9);
      }
      setCurrentPage(1);
    }
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Fungsi untuk mengubah teks menjadi slug (URL friendly)
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Ganti spasi dengan tanda -
      .replace(/[^\w\-]+/g, "") // Hapus karakter non-alphanumeric
      .replace(/\-\-+/g, "-"); // Ganti beberapa tanda - menjadi satu
  };

  // Fetch kategori berdasarkan slug nama kategori dan ambil produk berdasarkan id kategori
  useEffect(() => {
    if (!name) {
      setError("Invalid category name");
      setLoading(false);
      return;
    }

    // Ambil semua kategori terlebih dahulu
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((res) => {
        if (!res.ok) throw new Error("Kategori belum tersedia");
        return res.json();
      })
      .then((data) => {
        // Cocokkan kategori berdasarkan slug
        const matchedCategory = data.find(
          (cat) => slugify(cat.name) === name
        );
        if (!matchedCategory) {
          setError("Category not found");
          setLoading(false);
          return;
        }
        setCategory(matchedCategory);
        // Setelah mendapatkan kategori, ambil produk berdasarkan id kategori
        return fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/category?categoryId=${matchedCategory.id}&sortBy=createdAt&order=desc`
        );
      })
      .then((res) => {
        if (res) {
          if (!res.ok) throw new Error("Produk belum tersedia");
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setAllProducts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  // Pagination: hitung total halaman dan produk yang akan ditampilkan
  const totalPages = Math.ceil(allProducts.length / visibleCount);
  const displayedProducts = allProducts.slice(
    (currentPage - 1) * visibleCount,
    currentPage * visibleCount
  );

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">{error}</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header kategori */}
      <header className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          {category ? category.name : "Category"}
        </h1>
        {category && category.description && (
          <p className="text-xs sm:text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
        )}
      </header>

      {allProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found for this category.
        </p>
      ) : (
        <>
          {/* Grid Produk */}
          <div className="grid gap-4 grid-cols-3 lg:grid-cols-4">
            {displayedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group relative block bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <div className="relative h-40 sm:h-48 md:h-56">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                    alt={product.title}
                    fill
                    className="object-contain transition-all duration-300 group-hover:opacity-90"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.jpg"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-25 transition duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-[10px] sm:text-xs md:text-sm font-semibold bg-blue-600 px-2 py-1 rounded transition">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-2 sm:p-4">
                  <h2 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="mt-1 text-[10px] sm:text-xs md:text-sm text-gray-600">
                    {product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  {product.stock !== undefined && (
                    <p className="mt-1 text-[9px] sm:text-xs md:text-sm text-gray-500">
                      Stock: {product.stock}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 text-xs sm:text-sm"
              >
                Previous
              </button>
              <span className="text-xs sm:text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 text-xs sm:text-sm"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
