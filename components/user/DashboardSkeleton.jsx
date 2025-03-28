// components/user/DashboardSkeleton.jsx
'use client';
export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Profile Skeleton */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full" />
        <div className="flex-grow space-y-3">
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        </div>
        <div className="w-32 h-10 bg-gray-300 rounded"></div>
      </div>

      {/* Wishlist Skeleton */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-300 rounded"></div>
              <div className="flex flex-col space-y-2 flex-grow">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Skeleton */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Reviews</h2>
        <div className="space-y-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
