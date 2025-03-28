"use client";

export default function CODPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-8">Layanan COD (Cash on Delivery)</h1>
      <p className="text-center text-gray-600 mb-12">
        Nikmati kemudahan berbelanja dengan membayar langsung saat barang sampai di tangan Anda. Berikut adalah informasi lengkap terkait layanan COD di toko kami.
      </p>

      {/* Section: Apa itu COD */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Apa itu COD?</h2>
        <p className="text-gray-700 leading-relaxed">
          Cash on Delivery (COD) adalah metode pembayaran di mana pelanggan membayar pesanan mereka secara tunai saat barang diterima. Layanan ini memudahkan Anda yang ingin memastikan produk sampai dengan aman sebelum melakukan pembayaran.
        </p>
      </section>

      {/* Section: Cara Menggunakan COD */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Bagaimana Cara Menggunakan Layanan COD?</h2>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700">
          <li>Pilih produk yang Anda inginkan dan tambahkan ke keranjang belanja.</li>
          <li>Lanjutkan ke halaman checkout.</li>
          <li>Pada bagian metode pembayaran, pilih opsi <strong>Cash on Delivery (COD)</strong>.</li>
          <li>Isi detail pengiriman Anda dengan benar, termasuk alamat dan nomor telepon aktif.</li>
          <li>Konfirmasi pesanan Anda dan tunggu hingga kurir mengantarkan barang ke alamat Anda.</li>
          <li>Bayar secara tunai saat barang sampai di tangan Anda.</li>
        </ol>
      </section>

      {/* Section: Syarat dan Ketentuan */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Syarat dan Ketentuan COD</h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          <li>Layanan COD hanya tersedia untuk wilayah tertentu. Pastikan alamat Anda berada dalam jangkauan layanan kami.</li>
          <li>Batas maksimal transaksi menggunakan COD adalah Rp 2.000.000.</li>
          <li>Pembayaran hanya dilakukan secara tunai, mohon siapkan uang pas untuk mempermudah proses.</li>
          <li>Jika pelanggan menolak pesanan tanpa alasan yang jelas, kami berhak membatasi penggunaan layanan COD di masa mendatang.</li>
        </ul>
      </section>

      {/* Section: Area Jangkauan */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Area Jangkauan Layanan COD</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Saat ini, layanan COD kami mencakup area berikut:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          <li>Jakarta</li>
          <li>Bogor</li>
          <li>Depok</li>
          <li>Tangerang</li>
          <li>Bekasi</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          Kami akan terus memperluas area jangkauan kami. Pantau terus pembaruan layanan kami!
        </p>
      </section>

      {/* Section: FAQ */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pertanyaan Umum tentang COD</h2>
        <details className="mb-4 border border-gray-200 rounded-lg p-4">
          <summary className="cursor-pointer font-medium text-gray-800">
            Apa yang terjadi jika saya tidak ada di rumah saat barang diantar?
          </summary>
          <p className="mt-2 text-gray-700 text-sm">
            Kurir akan menghubungi Anda terlebih dahulu. Jika Anda tidak dapat menerima barang, Anda bisa mengatur jadwal ulang pengiriman atau menunjuk seseorang untuk menerima pesanan Anda.
          </p>
        </details>
        <details className="mb-4 border border-gray-200 rounded-lg p-4">
          <summary className="cursor-pointer font-medium text-gray-800">
            Apakah saya bisa membayar dengan kartu saat menggunakan COD?
          </summary>
          <p className="mt-2 text-gray-700 text-sm">
            Saat ini, pembayaran COD hanya menerima uang tunai. Kami sarankan Anda menyiapkan uang pas untuk mempercepat proses pembayaran.
          </p>
        </details>
      </section>
    </div>
  );
}
