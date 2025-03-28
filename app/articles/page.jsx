// app/articles/page.jsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TiptapViewer from '../../components/ui/TiptapViewer';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          `${API_URL}/api/articles?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
        );
        if (!res.ok) throw new Error('Failed to fetch articles');
        const data = await res.json();
        setArticles(data.articles);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error(error);
      }
    }
    fetchArticles();
  }, [search, page]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-2 px-5 md:px-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 font-serif bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 inline-block">
              Latest Articles
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mt-2">
              Discover insightful stories and creative ideas
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 text-lg border-0 rounded-xl shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          {/* Articles List */}
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📭</div>
              <p className="text-xl text-gray-500">No articles found</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/articles/${article.id}`} className="block">
                    <div className="flex flex-col md:flex-row gap-6">
                      {article.featuredImage && (
                        <div className="relative w-full md:w-48 h-48 overflow-hidden rounded-xl flex-shrink-0">
                          <Image
                            src={
                              article.featuredImage.startsWith('/')
                                ? `${API_URL}${article.featuredImage}`
                                : article.featuredImage
                            }
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 384px"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h2>
                        <div className="prose prose-gray max-w-none line-clamp-3 mb-4">
                          <TiptapViewer content={article.content} />
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="bg-gray-100 px-3 py-1 rounded-full">
                            {new Date(article.createdAt).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <span className="text-gray-600">
              Showing {(page - 1) * limit + 1} - {Math.min(page * limit, totalCount)} of {totalCount}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 inline-flex items-center gap-2 rounded-lg bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all"
              >
                <FiChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 inline-flex items-center gap-2 rounded-lg bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all"
              >
                Next
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
