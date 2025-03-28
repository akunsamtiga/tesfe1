// app/page.jsx
'use client';
import { useEffect, useState } from "react";
import { fetchProducts } from "./utils/api";
import FeaturedProduct from "../components/sections/FeaturedProduct";
import FeaturedArticle from "../components/sections/FeaturedArticle";
import FeaturedCategory from "../components/sections/FeaturedCategory";
import FeaturedReview from "../components/sections/FeaturedReview";
import Banner from "../components/sections/Banner";
import Brand from "../components/sections/Brand";

import Home from "../components/sections/Home";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const data = await fetchProducts(controller.signal);
        setProducts(data.slice(0, 6));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to load products.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  // Skeleton Component for Home Page Sections
  const SectionSkeleton = ({ height }) => (
    <div className="bg-[var(--color-surface)] rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className={`h-${height} bg-gray-300`}></div>
    </div>
  );

  return (
    <main id="main-content">
      <Home />
      {error && <p className="text-center text-red-500">{error}</p>}
      {loading ? (
        <div className="space-y-6 p-4">
          {/* Skeleton for Featured Category */}
          <SectionSkeleton height="40" />
          {/* Skeleton for Featured Product */}
          <SectionSkeleton height="80" />
          {/* Skeleton for Brand */}
          <SectionSkeleton height="60" />
          {/* Skeleton for Featured Article */}
          <SectionSkeleton height="80" />
          {/* Skeleton for Banner */}
          <SectionSkeleton height="50" />
          {/* Skeleton for Featured Review */}
          <SectionSkeleton height="70" />
        </div>
      ) : (
        <>
          <FeaturedCategory />
          <FeaturedProduct />
          <Brand />
          <FeaturedArticle />
          <Banner />
          <FeaturedReview />
        </>
      )}
    </main>
  );
}