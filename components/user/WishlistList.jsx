// components/user/WishlistList.jsx
'use client';
import { useState } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
function getImageUrl(imagePath) {
  if (!imagePath) return '';
  return `${API_URL}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
}

export default function WishlistList({ wishlist }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = wishlist.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">No items in your wishlist.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <div key={item.id} className="bg-white shadow rounded-lg p-4 flex items-center space-x-4 transition hover:shadow-lg">
                {item.product.image && (
                  <Image
                    src={getImageUrl(item.product.image)}
                    alt={item.product.title}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                )}
                <div>
                  <h3 className="font-medium text-gray-700">{item.product.title}</h3>
                  <p className="text-gray-500">Rp {Number(item.product.price).toLocaleString('id-ID')}</p>
                </div>
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
