// components/layout/AuthContext.jsx
"use client";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (token) {
        fetchUserProfile(token); // Ambil ulang data user
      } else {
        setUser(null);
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        fetchUserProfile(token);
      }
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchUserProfile(token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Invalid token or session expired");
      const data = await res.json();
      const decoded = jwtDecode(token);
      setUser({
        ...data,
        role: decoded.role?.toUpperCase() || "USER",
      });
      scheduleTokenRefresh(decoded.exp);
    } catch (error) {
      console.error("Authentication error:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }

  function login(token) {
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event("storage")); // 🔥 Paksa update state di semua komponen
    
    const decoded = jwtDecode(token);
    setUser({
      ...decoded,
      role: decoded.role?.toUpperCase() || "USER",
    });
  
    const targetRoute = decoded.role?.toUpperCase() === "ADMIN" ? "/admin" : "/user";
    router.push(targetRoute);
    scheduleTokenRefresh(decoded.exp);
  }
  
  function logout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  }

  function scheduleTokenRefresh(exp) {
    const timeUntilRefresh = exp * 1000 - Date.now() - 60000; // 1 menit sebelum kadaluarsa
    if (timeUntilRefresh > 0) {
      setTimeout(() => {
        refreshAccessToken();
      }, timeUntilRefresh);
    }
  }

  async function refreshAccessToken() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to refresh token");
      const { accessToken } = await res.json();
      login(accessToken);
    } catch (error) {
      console.error("Token refresh error:", error);
      logout();
    }
  }

  const value = useMemo(() => ({ user, login, logout, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}