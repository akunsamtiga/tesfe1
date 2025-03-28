"use client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Komponen utama -> Membungkus konten dalam Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SuccessContent />
    </Suspense>
  );
}

// Komponen Loading untuk fallback Suspense
function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Loading...
        </h1>
      </div>
    </div>
  );
}

// Komponen yang mengakses useSearchParams()
function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [counter, setCounter] = useState(3);

  // Simpan token ke localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  // Countdown timer
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [token]);

  // Redirect setelah timer habis
  useEffect(() => {
    if (counter === 0) {
      router.push("/user");
    }
  }, [counter, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Autentikasi Berhasil!
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Akun Anda telah berhasil login. Anda akan diarahkan ke dashboard dalam:
        </p>

        {/* Tampilan Timer */}
        <div className="mt-6">
          <div className="text-4xl font-bold text-blue-600 animate-bounce">
            {counter}
          </div>
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(counter / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => router.push("/user")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Pergi ke Dashboard
          </button>
        </div>
        <div className="mt-4">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-gray-900 font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}
