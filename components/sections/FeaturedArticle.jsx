// components/sections/FeaturedArticle.jsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TiptapViewer from '../ui/TiptapViewer';
import { FaArrowRight } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function FeaturedArticle() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedArticles() {
      try {
        // Ambil 3 artikel terbaru berdasarkan tanggal pembuatan
        const res = await fetch(`${API_URL}/api/articles?limit=3&sortBy=createdAt&order=desc`);
        if (!res.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await res.json();
        setArticles(data.articles || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedArticles();
  }, []);

  // Skeleton Component for Articles
  const ArticleSkeleton = () => (
    <div className="bg-[var(--color-artikel)] border-2 border-[var(--color-artikel-card)] rounded-b-2xl rounded-t-[5rem] shadow-md overflow-hidden animate-pulse">
      {/* Placeholder untuk gambar */}
      <div className="w-full h-[200px] bg-gray-300"></div>
      {/* Placeholder untuk judul dan konten */}
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-4 md:p-8 lg:p-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <ArticleSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="flex justify-center items-center m-5 h-40 bg-gray-50 rounded-xl shadow-md">
        <p className="text-lg font-medium text-gray-600">Artikel belum tersedia</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[var(--color-brand-start)] via-[var(--color-brand-middle)] to-[var(--color-brand-end)]">
      <section className="bg-[var(--color-artikel)] py-10 md:py-12 lg:py-15 rounded-tl-[3rem] md:rounded-tl-[5rem] lg:rounded-tl-[8rem]">
        <div className="mx-auto px-4 md:px-8 lg:px-10">
          {/* Grid: Mobile 1 kolom, Tablet 2 kolom, Desktop 3 kolom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className={`bg-[var(--color-artikel)] border-2 border-[var(--color-artikel-card)] rounded-b-2xl rounded-t-[5rem] shadow-md overflow-hidden transition-transform 
                  ${index === 1 ? 'hidden sm:block' : index === 2 ? 'hidden lg:block' : ''}`}
              >
                {article.featuredImage ? (
                  <Image
                    src={
                      article.featuredImage.startsWith('/')
                        ? `${API_URL}${article.featuredImage}`
                        : article.featuredImage
                    }
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-[200px] object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No Image</p>
                  </div>
                )}
                <div className="bg-[var(--color-artikel-card)] p-3 md:p-4 lg:p-5">
                  <Link href={`/articles/${article.id}`} passHref>
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-[var(--color-artikel-title)] cursor-pointer hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>
                </div>
                <div className="p-3">
                  <div className="max-h-24 text-[var(--color-artikel-text)] text-sm md:text-base overflow-hidden mb-4 line-clamp-3">
                    <TiptapViewer content={article.content} />
                  </div>
                  <Link
                    href={`/articles/${article.id}`}
                    className="flex items-center gap-2 text-[var(--color-artikel-next)] hover:text-[var(--color-accent)] text-sm md:text-base font-semibold transition-all duration-300 group"
                  >
                    Baca Selengkapnya
                    <FaArrowRight className="text-[var(--color-artikel-next)] group-hover:translate-x-1 group-hover:text-[var(--color-accent)] transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 md:mt-10 ">
            <Link
              href="/articles"
              className="inline-block bg-[var(--color-artikel-button)] hover:bg-[var(--color-accent)] text-white font-semibold py-3 px-6 rounded-md transition-colors"
            >
              Lihat Semua Artikel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}