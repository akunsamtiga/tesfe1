"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaFilter, FaStar } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gridClass, setGridClass] = useState("grid-cols-3");
  const [visibleCount, setVisibleCount] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt",
    order: "desc",
  });
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // Update layout berdasarkan lebar window
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateLayout = () => {
        const width = window.innerWidth;
        if (width < 768) {
          setVisibleCount(15);
          setGridClass("grid-cols-3");
        } else if (width < 1024) {
          setVisibleCount(12);
          setGridClass("grid-cols-3");
        } else {
          setVisibleCount(15);
          setGridClass("grid-cols-5");
        }
        setCurrentPage(1);
      };

      updateLayout();
      window.addEventListener("resize", updateLayout);
      return () => window.removeEventListener("resize", updateLayout);
    }
  }, []);

  // Fetch produk berdasarkan filter dan search
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (filters.category) params.append("category", filters.category);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.order) params.append("order", filters.order);

      const url = `${API_URL}/api/products?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch produk saat komponen mount dan saat filters/search berubah
  useEffect(() => {
    fetchProducts();
  }, [filters, search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  // Reset filter dan search
  const handleResetFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "createdAt",
      order: "desc",
    });
    setSearch("");
  };

  const totalPages = Math.ceil(products.length / visibleCount);
  const displayedProducts = products.slice(
    (currentPage - 1) * visibleCount,
    currentPage * visibleCount
  );

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-gray-100 px-2 md:px-5 lg:px-8 py-5 md:py-7">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-center text-gray-800">
        Semua Produk
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex items-center w-full md:max-w-2xl mx-auto mb-3 md:mb-6 lg:mb-8"
      >
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm md:text-base border border-gray-300 p-3 pl-5 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="absolute right-4 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className="p-2 text-gray-500 hover:text-black"
          >
            <FaFilter size={18} />
          </button>
          <button
            type="submit"
            className="p-2 text-gray-600 hover:bg-blue-100 rounded-full transition duration-400"
          >
            <FaSearch size={20} />
          </button>
        </div>
      </form>

      {/* Filter Form */}
      {showFilter && (
        <div className="mb-2 p-4 border rounded-lg bg-gray-50 shadow">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Category"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="border p-2 rounded"
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                className="border p-2 rounded flex-1"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                className="border p-2 rounded flex-1"
              />
            </div>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="">Sort By</option>
              <option value="price">Price</option>
              <option value="createdAt">Date</option>
            </select>
            <select
              value={filters.order}
              onChange={(e) =>
                setFilters({ ...filters, order: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleResetFilters}
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Reset Filters
            </button>
            <button
              type="submit"
              onClick={handleSearchSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {loading ? (
        <div className={`grid ${gridClass} gap-2 md:gap-5 lg:gap-8 rounded-2xl auto-rows-fr`}>
          {Array.from({ length: visibleCount }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse flex flex-col h-full shadow-lg border rounded-2xl overflow-hidden"
            >
              {/* Image Skeleton */}
              <div className="relative h-32 bg-gray-300" />
              {/* Content Skeleton */}
              <div className="p-3 md:p-4 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-1" />
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 bg-gray-300 rounded-full"
                      />
                    ))}
                    <div className="h-4 bg-gray-300 rounded w-1/4 ml-2" />
                  </div>
                  <div className="h-3 bg-gray-300 rounded w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : displayedProducts.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <div className={`grid ${gridClass} gap-2 md:gap-5 lg:gap-8 rounded-2xl auto-rows-fr`}>
          {displayedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex flex-col h-full shadow-lg hover:shadow-xl border rounded-2xl overflow-hidden transform hover:scale-95 transition duration-300 ease-in-out"
            >
              <div className="relative h-32 bg-white">
                <Image
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `${API_URL}${product.image}`
                  }
                  alt={product.title}
                  fill
                  className="object-contain pt-5 pb-2"
                />
              </div>
              <div className="p-3 md:p-4 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <h2 className="text-sm md:text-base font-semibold text-gray-800 mb-1 line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-xs md:text-base font-medium text-blue-600 mb-2 line-clamp-1">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.round(product.rating)
                            ? "text-yellow-500 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
                            : "text-gray-300 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
                        }
                      />
                    ))}
                    <span className="text-xs text-gray-700">
                      ({product.rating})
                    </span>
                  </div>
                  <div>
                    {Number(product.stock) === 0 ? (
                      <p className="text-xs font-semibold text-red-400 mt-1">
                        Habis
                      </p>
                    ) : (
                      <p className="text-xs text-gray-600 mt-1">
                        Stock: {product.stock}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
