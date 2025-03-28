// components/ui/ManagementCategory.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ManagementCategory() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null); // { type: "success" | "error", message: string }

  async function fetchCategories() {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`${API_URL}/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlert({ type: "success", message: "Category deleted successfully!" });
        fetchCategories();
      } else {
        const data = await res.json();
        setAlert({ type: "error", message: data.error || "Failed to delete category" });
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error deleting category. Please try again." });
      console.error("Error deleting category:", error);
    }
    // Hilangkan alert setelah 3 detik
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // Skeleton Component for Table Rows
  const TableSkeleton = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">ID</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">Name</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">Image</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="hover:bg-gray-50 animate-pulse">
              <td className="px-6 py-4 text-sm text-gray-600 text-center">
                <div className="h-4 bg-gray-300 rounded w-8 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 text-center">
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 text-center">
                <div className="flex justify-center gap-2">
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
    <div className="bg-white p-2 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <button
          onClick={() => router.push("/admin/category/add-category")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-500 transition"
        >
          Add Category
        </button>
      </div>

      {/* Alert UI */}
      {alert && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            alert.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      {loading ? (
        <TableSkeleton />
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-600">No categories found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">ID</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">Name</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">Image</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">{cat.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">{cat.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">
                    {cat.imageUrl ? (
                      <img
                        src={`${API_URL}${cat.imageUrl}`}
                        alt={cat.name}
                        crossOrigin="anonymous"
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => router.push(`/admin/category/edit-category/${cat.id}`)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}