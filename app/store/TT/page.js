"use client";

import { useState } from "react";

export default function TukarTambahPage() {
  const [formData, setFormData] = useState({
    productName: "",
    condition: "Baik",
    description: "",
    contact: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Layanan Tukar Tambah</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Tukar produk lama Anda dengan produk baru favorit! Isi formulir di bawah ini dan kami akan segera menghubungi Anda.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">Terima Kasih!</h2>
            <p className="text-gray-600 mt-2">
              Kami akan segera menghubungi Anda untuk proses tukar tambah.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Produk */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Produk Lama
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Contoh: iPhone 12"
              />
            </div>

            {/* Kondisi Produk */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kondisi Produk
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="Baik">Baik</option>
                <option value="Sedang">Sedang</option>
                <option value="Buruk">Buruk</option>
              </select>
            </div>

            {/* Deskripsi Produk */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi Produk
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Jelaskan kondisi produk Anda"
              ></textarea>
            </div>

            {/* Kontak */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor WhatsApp / Email
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Contoh: 08123456789"
              />
            </div>

            {/* Tombol Submit */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Ajukan Tukar Tambah
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
