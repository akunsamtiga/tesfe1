'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useUserData from '../../hooks/useUserData';
import DashboardSkeleton from '../../components/user/DashboardSkeleton';
import ProfileCard from '../../components/user/ProfileCard';
import WishlistList from '../../components/user/WishlistList';
import ReviewsList from '../../components/user/ReviewList';
import Sidebar from '../../components/user/Sidebar';

function UserDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromQuery = searchParams.get('token');

  useEffect(() => {
    if (tokenFromQuery) {
      localStorage.setItem('token', tokenFromQuery);
      window.location.reload(); // 🔥 Memaksa refresh halaman
    } else {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    }
  }, [tokenFromQuery, router]);
  
  const { profile, wishlist, reviews, loading, error } = useUserData();
  const [activeTab, setActiveTab] = useState('profile');

  if (loading) return <DashboardSkeleton />;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
  if (!profile) return <p className="text-center py-8">Profile data not available.</p>;

  let content;
  switch (activeTab) {
    case 'wishlist':
      content = <WishlistList wishlist={wishlist} />;
      break;
    case 'reviews':
      content = <ReviewsList reviews={reviews} />;
      break;
    case 'profile':
      content = <ProfileCard profile={profile} />;
      break;
    default:
      content = null;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-8 sm:space-y-0">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow">{content}</div>
    </div>
  );
}

export default function UserPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <UserDashboard />
    </Suspense>
  );
}
