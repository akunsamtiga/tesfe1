// app/admin/hero-images/edit-hero-images/[id]/page.jsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function EditHeroImage({ params }) {
  const router = useRouter();
  const [heroImage, setHeroImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Menggunakan React.use() untuk mengakses params.id
  const id = React.use(params).id;

  // Fetch Hero Image by ID
  useEffect(() => {
    async function fetchHeroImage() {
      try {
        const res = await fetch(`${API_URL}/api/hero-images/${id}`);
        if (res.ok) {
          const data = await res.json();
          setHeroImage(data);
        } else {
          setError("Hero image not found");
        }
      } catch (err) {
        setError("Failed to fetch hero image");
      } finally {
        setLoading(false);
      }
    }

    fetchHeroImage();
  }, [id]);

  // Handle Update
  async function handleUpdate(e) {
    e.preventDefault();

    // Ambil file dari input
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput?.files[0];

    if (!file) {
      alert("Please select a file to update.");
      return;
    }

    const formData = new FormData();
    formData.append("heroImage", file);

    try {
      const res = await fetch(`${API_URL}/api/hero-images/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("Hero image updated successfully.");
        router.push("/admin/hero-images"); // Redirect to list page
      } else {
        alert("Failed to update hero image");
      }
    } catch (error) {
      console.error("Error updating hero image:", error);
      alert("Error updating hero image");
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-[var(--color-surface)] p-6 rounded-lg shadow-lg min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-6">
        Edit Hero Image
      </h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Current Image Preview */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Current Image
          </label>
          <img
            src={`${API_URL}${heroImage.imageUrl}`}
            alt="Current Hero Image"
            crossOrigin="anonymous"
            className="w-full h-64 object-cover border border-[var(--color-border)] rounded"
          />
        </div>

        {/* Upload New Image */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Upload New Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-3 py-2 border border-[var(--color-border)] rounded"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-maintext)] rounded hover:brightness-90 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}