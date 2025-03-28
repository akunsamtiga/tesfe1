// app/admin/product/edit-product/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  // State form edit
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [stock, setStock] = useState(""); // Tambahkan state untuk stock
  const [categories, setCategories] = useState([]);

  // Gambar
  const [currentImage, setCurrentImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const getImageUrl = (url) => {
    if (url && url.startsWith("/uploads")) {
      return `${API_URL}${url}`;
    }
    return url;
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setTitle(data.title);
          setDescription(data.description);
          setPrice(data.price);
          setCategoryId(data.categoryId);
          setStock(data.stock !== undefined ? data.stock : ""); // Set nilai stock
          setCurrentImage(data.image || "");
          setPreviewImage(data.image || "");
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${API_URL}/api/categories`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("stock", stock); // Sertakan stock
    if (newImage) {
      formData.append("image", newImage);
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        const errorData = await res.json();
        console.error("Failed to update product:", errorData);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) return <p>Loading product data...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      {currentImage && !newImage && (
        <div className="mb-4">
          <p className="mb-2 font-semibold">Current Image:</p>
          <img
            crossOrigin="anonymous"
            src={getImageUrl(currentImage)}
            alt="Current Product Image"
            className="w-full h-48 object-cover rounded"
          />
        </div>
      )}

      {newImage && (
        <div className="mb-4">
          <p className="mb-2 font-semibold">New Image Preview:</p>
          <img
            src={previewImage}
            alt="New Product Preview"
            className="w-full h-48 object-cover rounded"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {/* Field untuk Stock */}
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setNewImage(file);
            if (file) {
              setPreviewImage(URL.createObjectURL(file));
            }
          }}
          className="w-full border p-2 rounded"
          accept="image/*"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
