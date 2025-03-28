// components/user/ProfileCard.jsx
'use client';
import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
function getImageUrl(imagePath) {
  if (!imagePath) return '';
  return `${API_URL}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
}

export default function ProfileCard({ profile }) {
  return (
    <section className="bg-white shadow-xl rounded-xl p-8 flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
      {profile.profilePicture ? (
        <Image
          src={getImageUrl(profile.profilePicture)}
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full object-cover border-2 border-blue-500"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-2xl font-bold">
          {profile.name?.charAt(0).toUpperCase() || "N"}
        </div>
      )}
      <div className="flex-grow">
        <h1 className="text-2xl font-bold text-gray-800 text-center md:text-left">{profile.name}</h1>
        {/* Versi mobile: tampilkan label */}
        <p className="block sm:hidden text-lg text-gray-500">
          <span className="font-semibold">Email:</span> {profile.email}
        </p>
        {profile.address && (
          <p className="block sm:hidden text-md text-gray-500">
            <span className="font-semibold">Alamat:</span> {profile.address}
          </p>
        )}
        {/* Versi tablet/desktop: tampilkan tanpa label */}
        <p className="hidden sm:block text-lg text-gray-500">{profile.email}</p>
        {profile.address && (
          <p className="hidden sm:block text-md text-gray-500">{profile.address}</p>
        )}
      </div>
      <Link
        href="/user/edit"
        className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Edit Profile
      </Link>
    </section>
  );
}
