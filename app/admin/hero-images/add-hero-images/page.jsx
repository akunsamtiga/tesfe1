// app/admin/hero-images/add-hero-images/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AddHeroImage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("heroImage", file);

    try {
      const res = await fetch(`${API_URL}/api/hero-images`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Hero image uploaded successfully.");
        router.push("/admin/hero-images"); // Redirect to list page
      } else {
        alert("Failed to upload hero image.");
      }
    } catch (error) {
      console.error("Error uploading hero image:", error);
      alert("Error uploading hero image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-[var(--color-surface)] p-6 rounded-lg shadow-lg min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-6">
        Add Hero Image
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Input */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Select Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-[var(--color-border)] rounded"
          />
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-[var(--color-text)]">
              Preview:
            </h3>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-64 object-contain border border-[var(--color-border)] rounded"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className={`px-4 py-2 rounded bg-[var(--color-accent)] text-[var(--color-maintext)] font-semibold hover:brightness-90 transition ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Upload Hero Image"}
        </button>
      </form>
    </div>
  );
}