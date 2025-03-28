// app/admin/category/add-category/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddCategory() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("name", name);
    if (file) formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create category");
      }
      router.push("/admin");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link href="/category">
        <button className="text-blue-500 underline mb-4">Daftar Kategori</button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
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
        <div className="mb-4">
          <label className="block mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border w-full p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Category
        </button>
      </form>
    </div>
  );
}
