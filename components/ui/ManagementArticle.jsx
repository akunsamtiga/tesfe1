// components/ui/ManagementArticle.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ManagementArticle() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalCount, setTotalCount] = useState(0);

  async function fetchArticles() {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/articles?page=${currentPage}&limit=${pageSize}`
      );
      if (res.ok) {
        const data = await res.json();
        // Asumsikan API mengembalikan { articles, totalCount, page, limit }
        setArticles(data.articles || data);
        if (data.totalCount !== undefined) {
          setTotalCount(data.totalCount);
        }
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;
    try {
      const res = await fetch(`${API_URL}/api/articles/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Article deleted successfully.");
        fetchArticles();
      } else {
        alert("Failed to delete article.");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article.");
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  // Skeleton Component for Table Rows
  const TableSkeleton = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
              Nomor
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
              Title
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
              Author
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
              Published
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Array.from({ length: pageSize }).map((_, index) => (
            <tr key={index} className="hover:bg-gray-50 animate-pulse">
              <td className="px-6 py-4 text-sm text-gray-600 text-center">
                <div className="h-4 bg-gray-300 rounded w-8 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 text-left">
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 text-center">
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 text-center">
                <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
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
          onClick={() => router.push("/admin/articles/add-article")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-500 transition"
        >
          Add Article
        </button>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-600">No articles found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
                    Nomor
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
                    Title
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
                    Author
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
                    Published
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {articles.map((article, index) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-left line-clamp-2">
                      {article.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">
                      {article.author || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">
                      {article.published ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            router.push(
                              `/admin/articles/edit-article/${article.id}`
                            )
                          }
                          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-500 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
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

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}