'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Banner() {
  return (
    <div>
      {/* Section Utama dengan animasi saat muncul di layar */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative text-white py-12 md:py-16"
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-banner)] to-[var(--color-primary)]">
          <Image
            src="/images/bg1iphone.jpg" // Ganti dengan path gambar Anda
            alt="Banner Image"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-40 drop-shadow-xl"
          />
        </div>

        {/* Content dengan animasi saat on screen */}
        <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-[var(--color-banner-title)] drop-shadow-xl"
          >
            Iphone 16 Series
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-base md:text-lg text-[var(--color-banner-text1)] mb-8 drop-shadow-xl"
          >
            Discover the latest gadgets and accessories to elevate your lifestyle.
          </motion.p>

          {/* Tombol dengan efek hover scaling */}
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <Link
              href="/products"
              className="inline-block bg-blue-100 hover:bg-blue-600 text-gray-800 hover:text-[var(--color-banner-title)] font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Belanja Sekarang
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Section Diskon dengan animasi saat on screen */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-12 md:py-16 bg-[var(--color-banner)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-[var(--color-banner-title)] text-base md:text-xl lg:text-2xl font-bold mb-4"
          >
            Diskon Spesial 50% Hanya Hari Ini!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-[var(--color-banner-text2)] text-xs md:text-sm px-3 md:px-8 lg:px-10"
          >
            Nikmati penawaran eksklusif untuk produk favoritmu. Jangan lewatkan kesempatan ini, belanja sekarang dan hemat lebih banyak!
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}
