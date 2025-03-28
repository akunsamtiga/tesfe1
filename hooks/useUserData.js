// hooks/useUserData.js
'use client';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function useUserData() {
  const [profile, setProfile] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }
    async function fetchData() {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        const [profileRes, wishlistRes, reviewsRes] = await Promise.all([
          fetch(`${API_URL}/api/users/profile`, { headers }),
          fetch(`${API_URL}/api/wishlist`, { headers }),
          fetch(`${API_URL}/api/users/reviews`, { headers })
        ]);
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        if (!wishlistRes.ok) throw new Error('Failed to fetch wishlist');
        if (!reviewsRes.ok) throw new Error('Failed to fetch reviews');
        const profileData = await profileRes.json();
        const wishlistData = await wishlistRes.json();
        const reviewsData = await reviewsRes.json();
        setProfile(profileData);
        setWishlist(wishlistData);
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { profile, wishlist, reviews, loading, error };
}
