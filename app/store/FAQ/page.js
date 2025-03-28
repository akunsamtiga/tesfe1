"use client";
import { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Apa itu [Nama Toko]?",
      answer:
        "[Nama Toko] adalah platform e-commerce terpercaya yang menyediakan berbagai produk berkualitas dari berbagai kategori, mulai dari fashion, elektronik, hingga kebutuhan sehari-hari.",
    },
    {
      question: "Bagaimana cara melakukan pemesanan?",
      answer:
        "Untuk memesan produk, cukup tambahkan produk ke keranjang belanja Anda, lanjutkan ke halaman checkout, isi detail pengiriman, dan lakukan pembayaran sesuai metode yang tersedia.",
    },
    {
      question: "Metode pembayaran apa saja yang tersedia?",
      answer:
        "Kami menerima berbagai metode pembayaran, termasuk transfer bank, kartu kredit/debit, e-wallet (OVO, GoPay, Dana), dan COD (Bayar di Tempat) untuk area tertentu.",
    },
    {
      question: "Berapa lama proses pengiriman?",
      answer:
        "Waktu pengiriman bergantung pada lokasi Anda. Biasanya, pengiriman memakan waktu 2-5 hari kerja untuk area perkotaan dan hingga 7 hari untuk daerah terpencil.",
    },
    {
      question: "Bagaimana cara melacak pesanan saya?",
      answer:
        "Setelah pesanan Anda dikirim, Anda akan menerima email atau notifikasi berisi nomor resi. Anda bisa melacak pesanan melalui halaman 'Lacak Pesanan' di website kami.",
    },
    {
      question: "Bisakah saya mengembalikan produk?",
      answer:
        "Ya, kami memiliki kebijakan pengembalian produk dalam 7 hari setelah barang diterima. Pastikan produk masih dalam kondisi asli dan lengkap dengan kemasannya.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <p className="text-center text-gray-600 mb-12">
        Temukan jawaban untuk pertanyaan yang sering diajukan. Jika Anda memerlukan bantuan lebih lanjut, jangan ragu untuk menghubungi kami!
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-800 hover:bg-gray-100 transition"
            >
              <span>{faq.question}</span>
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="p-5 border-t border-gray-200 bg-gray-50 text-gray-700 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
