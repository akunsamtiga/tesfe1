// components/ui/ManagementHeroImage.jsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ManagementHeroImage() {
  const [heroImages, setHeroImages] = useState([]);
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    }
  }

  useEffect(() => {
    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (!heroImageFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(heroImageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [heroImageFile]);

  async function handleHeroImageUpload(e) {
    e.preventDefault();
    if (!heroImageFile) {
      alert("Please select a file to upload.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("heroImage", heroImageFile);
    try {
      const res = await fetch(`${API_URL}/api/hero-images`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("Hero image uploaded successfully.");
        setHeroImageFile(null);
        fetchHeroImages();
      } else {
        console.error("Failed to upload hero image", res.statusText);
        alert("Failed to upload hero image");
      }
    } catch (error) {
      console.error("Error uploading hero image:", error);
      alert("Error uploading hero image");
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteHeroImage(id) {
    if (!confirm("Are you sure to delete this hero image?")) return;
    try {
      const res = await fetch(`${API_URL}/api/hero-images/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Hero image deleted successfully.");
        fetchHeroImages();
      } else {
        alert("Failed to delete hero image");
      }
    } catch (error) {
      console.error("Error deleting hero image:", error);
      alert("Error deleting hero image");
    }
  }

  // Tentukan gambar terbaru (berdasarkan createdAt)
  const newestHero =
    heroImages.length > 0 &&
    heroImages.reduce((prev, curr) =>
      new Date(curr.createdAt) > new Date(prev.createdAt) ? curr : prev
    );

  // Skeleton Component for Hero Images
  const HeroImageSkeleton = () => (
    <div className="relative group border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-xl transition animate-pulse">
      <div className="bg-gray-300 w-full h-48"></div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 text-center">
        <div className="h-2 bg-gray-500 rounded w-1/2 mx-auto"></div>
      </div>
      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow">
        <div className="h-2 bg-gray-500 rounded w-1/2 mx-auto"></div>
      </div>
      <button className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-md hover:bg-red-600 transition">
        <div className="h-2 bg-gray-500 rounded w-1/2 mx-auto"></div>
      </button>
    </div>
  );

  return (
    <div className="bg-white p-2 rounded-xl shadow-lg">
      {/* Tombol View Hero Images */}

      <form
        onSubmit={handleHeroImageUpload}
        className="flex flex-col sm:flex-row items-center gap-4 mb-8"
      >
        <input
          type="file"
          name="heroImage"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setHeroImageFile(e.target.files[0]);
            }
          }}
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-auto text-gray-800"
        />
        <button
          type="submit"
          disabled={uploading}
          className={`px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500 transition ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Upload Hero Image"}
        </button>
      </form>

      {previewUrl && (
        <div className="mb-8">
          <h3 className="font-semibold mb-2 text-gray-900">Preview:</h3>
          <img
            src={previewUrl}
            alt="Preview Hero"
            className="w-full max-h-64 object-contain border border-gray-300 rounded-md"
          />
        </div>
      )}

      {heroImages.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <HeroImageSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {heroImages.slice(0, 3).map((hero) => (
            <div
              key={hero.id}
              className="relative group border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-xl transition"
            >
              <Image
                src={`${API_URL}${hero.imageUrl}`}
                alt="Hero Image"
                width={300}
                height={300}
                className="bg-white object-contain w-full h-48"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 text-center">
                {new Date(hero.createdAt).toLocaleString()}
              </div>
              {newestHero && hero.id === newestHero.id && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow">
                  Banner Terpasang
                </div>
              )}
              <button
                onClick={() => handleDeleteHeroImage(hero.id)}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="w-full">
        <Link href="/admin/hero-images">
          <button className="w-full py-2 mt-5 mb-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-500 transition">
            List Hero Images
          </button>
        </Link>
      </div>
    </div>
  );
}