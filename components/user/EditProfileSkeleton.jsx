// components/user/EditProfileSkeleton.jsx
'use client';
export default function EditProfileSkeleton() {
  return (
    <div className="max-w-2xl mx-auto p-6 animate-pulse space-y-6">
      <div className="h-8 bg-gray-300 rounded w-1/2"></div>
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mt-3"></div>
      </div>
      <div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-1"></div>
        <div className="w-full h-12 bg-gray-300 rounded"></div>
      </div>
      <div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-1"></div>
        <div className="w-full h-12 bg-gray-300 rounded"></div>
      </div>
      <div className="flex space-x-4">
        <div className="h-12 w-32 bg-gray-300 rounded"></div>
        <div className="h-12 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
