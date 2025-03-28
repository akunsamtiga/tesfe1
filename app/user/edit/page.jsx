// app/user/edit/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditProfileSkeleton from '../../../components/user/EditProfileSkeleton';
import EditProfileForm from '../../../components/user/EditProfileForm';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function EditProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_URL}/api/users/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) return <EditProfileSkeleton />;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
  if (!profile) return <p className="text-center py-8">Profile data not available.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>
      <EditProfileForm profile={profile} />
    </div>
  );
}
