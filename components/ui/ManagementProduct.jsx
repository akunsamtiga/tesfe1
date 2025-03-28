// components/ui/ManagementProduct.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ManagementProduct() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [alert, setAlert] = useState(null); // { type: "success" | "error", message: string }
  const pageSize = 10;

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/products?search=${searchQuery}&page=${currentPage}&limit=${pageSize}`
      );
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setAlert({ type: "success", message: "Product deleted successfully!" });
        fetchProducts(); // Refresh data produk
      } else {
        const data = await res.json();
        setAlert({ type: "error", message: data.error || "Failed to delete product" });
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error deleting product. Please try again." });
      console.error("Error deleting product:", error);
    }
    // Hilangkan alert setelah 3 detik
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // Skeleton Component for Table Rows
  const TableSkeleton = () => (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-800 text-sm">
          <tr>
            {["ID", "Title", "Price", "Category", "Image", "Actions"].map((header) => (
              <th key={header} className="p-4 font-medium text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: pageSize }).map((_, index) => (
            <tr key={index} className="border-t hover:bg-gray-50 transition text-center animate-pulse">
              <td className="p-4">
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
              </td>
              <td className="p-4">
                <div className="h-10 w-10 bg-gray-300 rounded mx-auto"></div>
              </td>
              <td className="p-4">
                <div className="flex gap-2 justify-center">
                  <div className="h-6 w-16 bg-gray-300 rounded"></div>
                  <div className="h-6 w-16 bg-gray-300 rounded"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-white p-3 rounded-xl shadow-lg">
      {/* Searchbar di kiri dan tombol Add Product di kanan */}
      <div className="grid grid-rows-2 gap-3 justify-items-center md:gap-0 md:flex md:justify-between items-center mb-4">
        {/* Searchbar dengan ikon */}
        <div className="w-full max-w-xs">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>
        </div>
        {/* Tombol Add Product */}
        <button
          onClick={() => router.push("/admin/product/add-product")}
          className="grid bg-indigo-600 text-base text-white px-5 py-2 rounded-lg hover:bg-indigo-500 transition"
        >
          Add Product
        </button>
      </div>

      {/* Alert UI */}
      {alert && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            alert.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      {loading ? (
        <TableSkeleton />
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-800 text-sm">
                <tr>
                  {["ID", "Title", "Price", "Category", "Image", "Actions"].map((header) => (
                    <th key={header} className="p-4 font-medium text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id} className="border-t hover:bg-gray-50 transition text-center">
                    <td className="p-4 text-sm">{prod.id}</td>
                    <td className="p-4 text-sm">{prod.title}</td>
                    <td className="p-4 text-sm">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(prod.price)}
                    </td>
                    <td className="p-4 text-sm">{prod.category?.name || "N/A"}</td>
                    <td className="p-4">
                      {prod.image ? (
                        <Image
                          src={`${API_URL}${prod.image}`}
                          alt={prod.title}
                          width={50}
                          height={50}
                          className="rounded-md object-cover mx-auto"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="p-4 flex gap-2 justify-center">
                      <button
                        onClick={() => router.push(`/admin/product/edit-product/${prod.id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center mt-6 gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-800">Page {currentPage}</span>
            <button
              disabled={products.length < pageSize}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}