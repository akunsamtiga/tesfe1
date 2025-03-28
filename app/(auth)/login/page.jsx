"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../components/layout/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const targetRoute = user.role === "ADMIN" ? "/admin" : "/user";
      router.push(targetRoute);
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login gagal, periksa kredensial Anda.");
      }
      if (rememberMe) {
        localStorage.setItem("token", data.accessToken);
      } else {
        sessionStorage.setItem("token", data.accessToken);
      }
      login(data.accessToken);
      const nextPage = sessionStorage.getItem("redirectAfterLogin") || "/";
      router.push(nextPage);
      sessionStorage.removeItem("redirectAfterLogin");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Login</h1>
      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form email & password */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="rememberMe" className="flex items-center text-sm text-gray-600">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2 w-4 h-4"
            />
            Ingat saya
          </label>
          <Link href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
            Lupa password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#1F305E] text-white p-3 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#6082B6]"
          } transition-colors`}
        >
          {loading ? "Sedang login..." : "Login"}
        </button>
      </form>

      {/* Tombol Social Login dengan Logo Google */}
      <div className="flex flex-col bg-blue-100 bg-opacity-50 space-y-4 mt-6">
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`}
          className="w-full flex items-center justify-center border border-gray-300 p-3 rounded hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.9 0 6.5 1.7 8 3.1l5.9-5.9C33.3 3.5 28.1 1 24 1 14.8 1 6.8 6.2 3.2 13.3l7 5.4C11.7 13 17.4 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h12.6c-.5 2.7-2.1 5-4.4 6.5l7 5.4c4.1-3.8 6.5-9.4 6.5-16z"
            />
            <path
              fill="#FBBC05"
              d="M10.2 28.6c-.5-1.6-.8-3.3-.8-5 0-1.7.3-3.4.8-5l-7-5.4C2.4 18.3 2 21 2 24s.4 5.7 1.2 8.8l7-5.2z"
            />
            <path
              fill="#34A853"
              d="M24 46c6.5 0 11.9-2.2 15.9-6l-7-5.4c-2.2 1.5-5 2.4-8.9 2.4-6.6 0-12.2-4.4-14.2-10.4l-7 5.4C6.8 41.8 14.8 46 24 46z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          <span className="text-gray-700">Login dengan Google</span>
        </a>
      </div>

      <p className="mt-6 text-center text-gray-600">
        Belum punya akun?{" "}
        <Link href="/register" className="text-blue-500 hover:text-blue-700 font-medium">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
}
