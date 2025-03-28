// /app/about/page.jsx atau /pages/about.js
"use client";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About <span className="text-blue-500">Us</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Selamat datang di <strong>[Nama Brand Anda]</strong> — tempat terbaik
          untuk menemukan [jenis produk] berkualitas dan terjangkau. Kami hadir
          untuk memberikan pengalaman belanja online yang mudah, aman, dan
          memuaskan.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
        <p className="text-gray-600 leading-relaxed">
          Semua bermula dari sebuah ide sederhana:{" "}
          <em>
            "Bagaimana jika kami bisa menghadirkan produk terbaik langsung ke
            tangan pelanggan, tanpa proses rumit dan harga yang melambung
            tinggi?"
          </em>{" "}
          <br />
          <br />
          Dari garasi kecil di <strong>[lokasi awal]</strong>, kami memulai
          perjalanan ini dengan menjual [produk pertama]. Dukungan pelanggan
          mendorong kami untuk berkembang — menghadirkan lebih banyak koleksi,
          lebih banyak pilihan, dan tentunya, layanan yang lebih baik.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What We Believe
        </h2>
        <ul className="text-gray-600 space-y-3 list-disc list-inside">
          <li>
            <strong>Kualitas Tanpa Kompromi:</strong> Setiap produk dikurasi
            dengan ketat.
          </li>
          <li>
            <strong>Harga yang Jujur:</strong> Kami percaya belanja seharusnya
            menyenangkan, tanpa menguras dompet.
          </li>
          <li>
            <strong>Kepuasan Pelanggan:</strong> Anda adalah prioritas utama
            kami.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              🌟 Produk Berkualitas
            </h3>
            <p className="text-gray-600">
              Kami hanya bekerja sama dengan produsen terpercaya untuk
              memastikan kualitas terbaik.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              🔒 Belanja Aman
            </h3>
            <p className="text-gray-600">
              Sistem pembayaran kami terverifikasi & keamanan data pelanggan
              terjamin.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              🚀 Pengiriman Cepat
            </h3>
            <p className="text-gray-600">
              Jaringan logistik kami memastikan pesanan sampai tepat waktu.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              📞 Dukungan 24/7
            </h3>
            <p className="text-gray-600">
              Tim kami selalu siap membantu menjawab pertanyaan Anda kapan pun.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Join Our Journey
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Kami lebih dari sekadar toko online — kami adalah komunitas bagi
          mereka yang percaya bahwa belanja adalah bagian dari ekspresi diri.
        </p>
        <Link
          href="/contact"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
