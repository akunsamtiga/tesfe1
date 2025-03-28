// components/user/EditProfileForm.jsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
function getImageUrl(imagePath) {
  if (!imagePath) return '';
  return `${API_URL}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
}

export default function EditProfileForm({ profile }) {
  const router = useRouter();
  const [name, setName] = useState(profile.name || '');
  const [address, setAddress] = useState(profile.address || '');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    profile.profilePicture ? getImageUrl(profile.profilePicture) : ''
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePicture(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      // Update data teks
      const resProfile = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, address }),
      });
      if (!resProfile.ok) {
        throw new Error('Failed to update profile text');
      }
      // Jika ada foto baru, update juga picture-nya
      if (newProfilePicture) {
        const formData = new FormData();
        formData.append('profilePicture', newProfilePicture);
        const resPicture = await fetch(`${API_URL}/api/users/profile/picture`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });
        if (!resPicture.ok) {
          throw new Error('Failed to update profile picture');
        }
      }
      router.push('/user');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Foto Profil */}
      <div className="flex flex-col items-center">
        {previewImage ? (
          <Image 
            src={previewImage} 
            alt="Profile Picture" 
            width={120} 
            height={120} 
            className="rounded-full object-cover shadow-lg" 
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="mt-3"
        />
      </div>
      {/* Nama */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      {/* Alamat */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex space-x-4">
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-md shadow"
        >
          Save Changes
        </button>
        <button 
          type="button"
          onClick={() => router.push('/user')}
          className="bg-gray-200 hover:bg-gray-300 transition duration-300 text-gray-800 px-6 py-3 rounded-md shadow"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
