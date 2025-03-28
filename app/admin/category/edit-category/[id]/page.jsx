// app/admin/category/edit-category/[id]/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditCategory() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Ambil data kategori berdasarkan id
  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(`${API_URL}/api/categories/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch category data");
        }
        const data = await res.json();
        setName(data.name || "");
        setCurrentImage(data.imageUrl || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategory();
  }, [id, API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("name", name);
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update category");
      }
      router.push("/admin");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  if (loading) return <div>Loading category data...</div>;

  return (
    <div className="container mx-auto p-4">
      <Link href="/admin/category">
        <button className="text-blue-500 underline mb-4">Back to Categories</button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-md">
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full p-2 rounded"
            required
          />
        </div>
        {currentImage && (
          <div className="mb-4">
            <label className="block mb-1">Current Image</label>
            <img
              src={`${API_URL}${currentImage}`}
              crossOrigin="anonymous"
              alt="Current Category"
              className="w-full max-h-64 object-contain border rounded"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1">New Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border w-full p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Category
        </button>
      </form>
    </div>
  );
}
