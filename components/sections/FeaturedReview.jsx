'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function FeaturedReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllReviews() {
      try {
        const res = await fetch(`${API_URL}/api/reviews`);
        if (res.ok) {
          const data = await res.json();
          const sortedReviews = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setReviews(sortedReviews);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllReviews();
  }, []);

  return (
    <section className="py-12 bg-[var(--color-testimoni)] text-[var(--color-testimoni-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[var(--color-testimoni-title)] text-2xl md:text-3xl font-bold mb-4 tracking-wide">
            Apa Kata{" "}
            <span className="bg-gradient-to-l from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Pelanggan Kami
            </span>
          </h2>
          <p className="text-xs md:text-base lg:text-base px-2 md:px-14 lg:px-[10rem] mx-auto">
            Kami bangga memberikan pengalaman terbaik bagi pelanggan kami. Berikut adalah beberapa ulasan mereka.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-base text-gray-400">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg font-medium text-gray-400">Belum ada ulasan tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.slice(0, 3).map((review, index) => (
              <div
                key={review.id}
                className={`bg-[var(--color-testimoni-review)] rounded-2xl p-6 shadow-lg transform hover:scale-[98%] transition-all duration-300 ${
                  index === 2 ? "hidden lg:block" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {/* Menampilkan Foto Profil atau Avatar Default */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                      {review.user?.profilePicture ? (
                        <Image
                          src={`${API_URL}${review.user.profilePicture}`}
                          alt={review.user.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-gray-600 font-semibold text-lg">
                          {review.user?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-[var(--color-testimoni-review-title)] font-semibold text-base">
                        {review.user?.name || "Anonim"}
                      </h4>
                      <p className="text-[var(--color-testimoni-review-text1)] text-xs">
                        {review.user?.address || "Verified buyer"}
                      </p>
                    </div>
                  </div>
                  {index === 0 && (
                    <span className="bg-[var(--color-testimoni)] text-black text-xs font-bold px-3 py-1 rounded-full">
                      Terbaru 📌
                    </span>
                  )}
                </div>

                <p className="text-[var(--color-testimoni-review-text2)] text-sm italic mb-6 line-clamp-3">
                  "{review.comment}"
                </p>

                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(review.rating)
                          ? "text-[var(--color-testimoni-star)]"
                          : "text-[var(--color-testimoni-review-title)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <button className="bg-[var(--color-testimoni-button)] text-[var(--color-testimoni-review-title)] font-semibold px-8 py-3 rounded-lg hover:bg-yellow-400 transition">
            Lihat Semua Ulasan
          </button>
        </div>
      </div>
    </section>
  );
}
