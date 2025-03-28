// components/user/ReviewList.jsx
'use client';
import { useState } from 'react';

export default function ReviewsList({ reviews }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = reviews.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">You haven't written any reviews.</p>
      ) : (
        <>
          <div className="space-y-6">
            {currentItems.map((review) => (
              <div key={review.id} className="bg-white shadow rounded-lg p-4 transition hover:shadow-lg">
                <p className="font-medium text-gray-700">Product: {review.product.title}</p>
                <p className="text-gray-600">Rating: {review.rating} / 5</p>
                {review.comment && <p className="text-gray-600">Comment: {review.comment}</p>}
                <p className="text-xs text-gray-400">Status: {review.status}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 1} 
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages} 
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
