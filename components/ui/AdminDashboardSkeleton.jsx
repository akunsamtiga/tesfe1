// components/ui/AdminDashboardSkeleton.jsx
'use client';
export default function AdminDashboardSkeleton() {
  return (
    <div className="p-6">
      {/* Header Skeleton */}
      <div className="h-8 w-1/2 bg-gray-300 rounded mb-4"></div>
      {/* Statistik Skeleton */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="bg-gray-200 h-24 rounded animate-pulse"></div>
        ))}
      </div>
      {/* Chart Skeleton */}
      <div className="w-full h-[350px] bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}
