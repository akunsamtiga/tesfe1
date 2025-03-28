// app/product/[id]/page.jsx
"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HeartIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../../components/layout/AuthContext"; // Import AuthContext

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper untuk mendapatkan token user dari AuthContext
const getAuthToken = (user) => {
  if (user?.token) return user.token;
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export default function ProductDetail({ params }) {
  // Menggunakan hook `use` untuk "unwrap" promise params
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth(); // Menggunakan AuthContext
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [loading, setLoading] = useState(true); // State loading untuk mengontrol loading data produk dan review

  // Update limit berdasarkan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setLimit(5);
      } else {
        setLimit(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ambil data produk dan review
  useEffect(() => {
    async function fetchData() {
      try {
        const [resProd, resRev] = await Promise.all([
          fetch(`${API_URL}/api/products/${id}`),
          fetch(`${API_URL}/api/reviews/product/${id}`)
        ]);
        if (!resProd.ok || !resRev.ok) throw new Error("Failed to fetch data");
        const [dataProd, dataRev] = await Promise.all([resProd.json(), resRev.json()]);
        setProduct(dataProd);
        setReviews(dataRev);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  // Ambil produk terkait berdasarkan kategori yang sama
  useEffect(() => {
    async function fetchRelatedProducts() {
      if (product && product.category && product.category.id) {
        try {
          const res = await fetch(
            `${API_URL}/api/products/category?categoryId=${product.category.id}`
          );
          if (res.ok) {
            const data = await res.json();
            const filtered = data.filter((prod) => prod.id !== product.id);
            setRelatedProducts(filtered);
          }
        } catch (err) {
          console.error("Error fetching related products:", err);
        }
      }
    }
    fetchRelatedProducts();
  }, [product, id]);

  // Hitung rata-rata rating setiap kali reviews berubah
  useEffect(() => {
    if (reviews.length > 0) {
      const avg = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      setAverageRating(avg.toFixed(1));
    } else {
      setAverageRating(0);
    }
  }, [reviews]);

  // Helper untuk menentukan URL gambar produk
  const getImageSrc = (image) =>
    image ? `${API_URL}${image.startsWith("/") ? image : "/" + image}` : "";

  // Handle untuk menambahkan produk ke wishlist
  const handleAddToWishlist = async () => {
    const token = getAuthToken(user);
    if (!token) {
      alert("You need to log in to add this product to your wishlist.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/wishlist/add/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert("Product added to wishlist!");
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to add to wishlist.");
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      alert("An error occurred while adding to wishlist.");
    }
  };

  // Handle tombol Buy Now (dialihkan ke shopee.com)
  const handleBuyNow = () => {
    window.open("https://shopee.com", "_blank");
  };

  // Handle submit review baru
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!(user.role === "USER" || user.role === "ADMIN")) {
      alert("You need to log in as a user or admin to submit a review.");
      return;
    }
    try {
      const token = getAuthToken(user);
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating, comment, productId: id })
      });
      if (res.ok) {
        const updatedReviews = await fetch(`${API_URL}/api/reviews/product/${id}`).then((r) => r.json());
        setReviews(updatedReviews);
        setRating(5);
        setComment("");
        alert("Review submitted!");
      } else {
        const errorData = await res.json();
        console.error("Review error response:", errorData);
        alert(errorData.error || "Failed to submit review.");
      }
    } catch (err) {
      console.error("Review error:", err);
      alert("An error occurred while submitting review.");
    }
  };

  // Handle edit review
  const handleEditClick = (review) => {
    setEditingReviewId(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditRating(5);
    setEditComment("");
  };

  const handleEditSubmit = async (reviewId) => {
    if (!user || !user.token || user.role !== "ADMIN") {
      alert("Only admins can edit reviews.");
      return;
    }
    try {
      const token = getAuthToken(user);
      const res = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating: editRating, comment: editComment })
      });
      if (res.ok) {
        const updatedReviews = await fetch(`${API_URL}/api/reviews/product/${id}`).then((r) => r.json());
        setReviews(updatedReviews);
        setEditingReviewId(null);
        alert("Review updated!");
      } else {
        const errorData = await res.json();
        console.error("Edit review error response:", errorData);
        alert(errorData.error || "Failed to update review.");
      }
    } catch (err) {
      console.error("Edit review error:", err);
      alert("An error occurred while updating review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!user || !user.token || user.role !== "ADMIN") {
      alert("Only admins can delete reviews.");
      return;
    }
    try {
      const token = getAuthToken(user);
      const res = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const updatedReviews = await fetch(`${API_URL}/api/reviews/product/${id}`).then((r) => r.json());
        setReviews(updatedReviews);
        alert("Review deleted!");
      } else {
        const errorData = await res.json();
        console.error("Delete review error response:", errorData);
        alert(errorData.error || "Failed to delete review.");
      }
    } catch (err) {
      console.error("Delete review error:", err);
      alert("An error occurred while deleting review.");
    }
  };

  if (authLoading || loading) return <p className="text-center mt-20">Loading product details...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;
  if (!product) return <p className="text-center mt-20">Product not found.</p>;

  return (
    <div className="w-full bg-white px-2 md:px-3 lg:px-5 pt-2 md:pt-4 lg:pt-6 pb-8 md:pb-8 lg:pb-10">
      {/* Detail Produk */}
      <div className="bg-gray-100 p-2 md:p-4 lg:p-5 rounded-lg shadow-lg">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="w-full">
            {product.image ? (
              <Carousel showThumbs={false} infiniteLoop autoPlay interval={5000}>
                {product.image.split(",").map((img, index) => (
                  <div key={index}>
                    <img
                      src={getImageSrc(img)}
                      alt={product.title}
                      className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-md"
                      crossOrigin="anonymous"
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded-lg">
                <p className="text-gray-500">No Image Available</p>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-600 text-sm md:text-base mt-1 md:mt-2">{product.description || "No description available."}</p>
            <p className="mt-4 text-lg md:text-xl font-semibold text-blue-600">
              Rp {product.price?.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-500 mt-2">
              Category: {product.category?.name || "Not specified"}
            </p>
            {/* Tampilkan informasi stok */}
            <p className="mt-2">
              Stock: {product.stock > 0 ? product.stock : "Habis"}
            </p>
            <p className="mt-2">
              Rating: {averageRating} {reviews.length > 0 && `(${reviews.length} reviews)`}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm md:text-base">
              <button
                onClick={handleAddToWishlist}
                className="flex items-center justify-center bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
              >
                <HeartIcon className="w-7 h-7 mr-2" /> Add to Wishlist
              </button>
              {product.stock > 0 ? (
                <button
                  onClick={handleBuyNow}
                  className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
                >
                  <CreditCardIcon className="w-7 h-7 mr-2" /> Buy Now
                </button>
              ) : (
                <button
                  disabled
                  className="flex items-center justify-center bg-gray-400 text-white px-4 py-2 rounded-lg font-medium cursor-not-allowed"
                >
                  Stock Habis:
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Form Submit Review */}
      <div className="mt-16 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-base md:text-lg font-bold mb-4">Tinggalkan komentar</h2>
        {user ? (
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Rating (1-5):</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                min="1"
                max="5"
                className="w-full border p-2 rounded-lg"
                required
              />
            </div>
            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
            <button
              type="submit"
              disabled={!user || !(user.role === "USER" || user.role === "ADMIN")}
              className={`bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition ${
                !user || !(user.role === "USER" || user.role === "ADMIN")
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-sm md:text-base text-gray-500">Login diperlukan untuk menambahkan review.</p>
        )}
      </div>
      {/* List Reviews */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-base md:text-lg font-bold mb-4">Product Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-800">{review.comment || "No comment provided."}</p>
                    <p className="mt-2 text-yellow-500 font-semibold">Rating {review.rating}/5</p>
                    {review.user && (
                      <p className="mt-1 text-sm text-gray-600">By: {review.user.name}</p>
                    )}
                  </div>
                  {user && user.role === "ADMIN" && (
                    <div className="flex space-x-2">
                      {editingReviewId === review.id ? (
                        <>
                          <button onClick={() => handleEditSubmit(review.id)} className="text-green-600 font-medium">
                            Save
                          </button>
                          <button onClick={handleCancelEdit} className="text-red-600 font-medium">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditClick(review)} className="text-blue-600 font-medium">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteReview(review.id)} className="text-red-600 font-medium">
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {editingReviewId === review.id && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block font-medium">Rating (1-5):</label>
                      <input
                        type="number"
                        value={editRating}
                        onChange={(e) => setEditRating(Number(e.target.value))}
                        min="1"
                        max="5"
                        className="w-full border p-2 rounded-lg"
                      />
                    </div>
                    <textarea
                      placeholder="Edit your review..."
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="w-full border p-3 rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm md:text-base text-gray-500">No reviews yet.</p>
        )}
      </div>
      {/* Produk Terkait */}
      <div className="mt-6 md:mt-8 bg-white p-2 md:p-4 rounded-lg shadow-lg">
        <h2 className="text-lg md:text-xl font-bold mb-4 ml-3">Produk Terkait</h2>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.slice(0, limit).map((prod) => (
              <Link key={prod.id} href={`/product/${prod.id}`}>
                <div className="p-2 md:p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer">
                  <img
                    src={getImageSrc(prod.image)}
                    alt={prod.title}
                    crossOrigin="anonymous"
                    className="w-full h-32 object-contain rounded"
                  />
                  <h3 className="mt-1 text-base md:text-lg font-semibold line-clamp-1">{prod.title}</h3>
                  <p className="text-blue-500 text-sm md:text-base font-semibold">
                    Rp {prod.price?.toLocaleString("id-ID")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No related products.</p>
        )}
      </div>
    </div>
  );
}
