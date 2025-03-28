// app/not-found.jsx
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata() {
  return {
    title: "404 - Halaman Tidak Ditemukan | Sanstore",
    description: "Halaman yang Anda cari tidak ditemukan. Kembali ke halaman utama.",
    openGraph: {
      title: "404 - Halaman Tidak Ditemukan",
      description: "Halaman yang Anda cari tidak ditemukan. Kembali ke halaman utama.",
      images: [
        {
          url: "https://example.com/404-image.jpg", // Ganti dengan URL gambar Anda
          width: 1200,
          height: 630,
          alt: "404 - Halaman Tidak Ditemukan",
        },
      ],
    },
  };
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4">
      {/* Ilustrasi Gambar */}
      <div className="mb-2 animate-pulse">
        <Image
          src="/images/404.png" // Ganti dengan path gambar ilustrasi Anda
          alt="404 Illustration"
          width={300}
          height={300}
          className="w-full max-w-md"
        />
      </div>

      {/* Pesan Error */}
      <p className="text-2xl md:text-3xl font-medium mb-6 text-center">
        Oops! Halaman tidak ditemukan.
      </p>

      {/* Deskripsi Tambahan */}
      <p className="text-base md:text-lg text-gray-600 mb-8 text-center">
        Sepertinya halaman yang Anda cari tidak tersedia. Silakan kembali ke halaman utama.
      </p>

      {/* Tombol Kembali ke Beranda */}
      <Link href="/">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
          Kembali ke Beranda
        </button>
      </Link>
    </div>
  );
}