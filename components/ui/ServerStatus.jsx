// components/ui/ServerStatus.jsx
"use client";
import React, { useEffect, useState } from 'react';

export default function ServerStatus() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/status`);
        if (res.ok) {
          const data = await res.json();
          setStatus(data.status); // 'online' atau 'offline'
        } else {
          setStatus('offline');
        }
      } catch (error) {
        setStatus('offline');
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 5000); // Cek status server tiap 5 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
      <span>Server:</span>
      <div
        className={`w-3 h-3 rounded-full ${
          status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        }`}
      ></div>
      <span className={`${status === 'online' ? 'text-green-600' : 'text-red-600'}`}>
        {status === 'online' ? 'Online' : 'Offline'}
      </span>
    </div>
  );
}
