"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const showAlert = (message, type = "error") => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ message: "", type: "" });
    setLoading(true);

    if (password.length < 8) {
      showAlert("Password harus minimal 8 karakter.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      showAlert("Password dan konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registrasi gagal, periksa data Anda.");
      }

      showAlert(
        "Registrasi berhasil! Anda akan diarahkan ke halaman login...",
        "success"
      );
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      showAlert(err.message || "Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-6 bg-[var(--color-background)] shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Daftar Akun
      </h1>

      {alert.message && (
        <div
          className={`p-4 mb-6 rounded-lg text-sm font-medium ${
            alert.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama
          </label>
          <input
            id="name"
            type="text"
            placeholder="Masukkan nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-100 border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Masukkan email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Konfirmasi Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Ulangi password Anda"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-100 border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white p-3 rounded transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {loading ? "Sedang mendaftar..." : "Daftar"}
        </button>
      </form>

      {/* Opsi Social Register dengan Logo Google */}
      <div className="flex flex-col bg-blue-100 bg-opacity-50 space-y-4 mt-6">
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`}
          className="w-full flex items-center justify-center border border-gray-300 p-3 rounded hover:bg-gray-100 transition-colors"
        >
          {/* Inline SVG Google Logo */}
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
          <span className="text-gray-700">Daftar dengan Google</span>
        </a>
      </div>

      <p className="mt-6 text-center text-gray-600">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          Silakan login
        </Link>
      </p>
    </div>
  );
}
