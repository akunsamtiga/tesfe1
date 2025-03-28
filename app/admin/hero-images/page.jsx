// app/admin/hero-images/page.jsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function HeroImagesPage() {
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Hero Images dari API
  async function fetchHeroImages() {
    try {
      const res = await fetch(`${API_URL}/api/hero-images`);
      if (res.ok) {
        const data = await res.json();
        setHeroImages(data);
      } else {
        console.error("Failed to fetch hero images");
      }
    } catch (error) {
      console.error("Error fetching hero images:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHeroImages();
  }, []);

  // Handle Delete Hero Image
  async function handleDeleteHeroImage(id) {
    if (!confirm("Are you sure you want to delete this hero image?")) return;
    try {
      const res = await fetch(`${API_URL}/api/hero-images/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Hero image deleted successfully.");
        fetchHeroImages(); // Refresh data
      } else {
        alert("Failed to delete hero image");
      }
    } catch (error) {
      console.error("Error deleting hero image:", error);
      alert("Error deleting hero image");
    }
  }

  return (
    <div className="bg-[var(--color-surface)] p-6 rounded-lg shadow-lg min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Link href="/admin" className="text-[var(--color-accent)] hover:underline flex items-center">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Management
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] ml-auto">
          Hero Images List
        </h1>
        {/* Add Hero Image Button */}
        <Link href="/admin/hero-images/add-hero-images">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center gap-1">
            <PlusIcon className="h-4 w-4" />
            Add Hero Image
          </button>
        </Link>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="text-lg text-[var(--color-muted)]">Loading...</span>
        </div>
      ) : heroImages.length === 0 ? (
        <p className="text-[var(--color-muted)] text-center">
          No hero images found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroImages.map((hero) => (
            <div
              key={hero.id}
              className="relative border border-[var(--color-border)] rounded overflow-hidden shadow hover:shadow-xl transition"
            >
              {/* Hero Image */}
              <Image
                src={`${API_URL}${hero.imageUrl}`}
                alt="Hero Image"
                width={400}
                height={300}
                className="object-cover w-full h-64"
              />

              {/* Overlay with Actions */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex justify-between items-center">
                <div className="text-[var(--color-maintext)] text-xs">
                  Uploaded on: {new Date(hero.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  {/* Edit Button */}
                  <Link href={`/admin/hero-images/edit-hero-images/${hero.id}`}>
                    <button className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </Link>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteHeroImage(hero.id)}
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}