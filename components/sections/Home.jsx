// components/sections/Home.jsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import FeaturedHeroImage from "./FeaturedHeroImage";

export default function Home() {
  const sentence =
    "Temukan penawaran terbaik untuk smartphone, laptop, dan aksesoris.";
  const words = sentence.split(" ");

  // Animasi judul
  const titleVariants = {
    hidden: { opacity: 0, x: -100, skewX: -15 },
    visible: {
      opacity: 1,
      x: 0,
      skewX: 0,
      transition: {
        duration: 1,
        ease: [0.25, 1, 0.5, 1], // Bezier curve for smooth bounce-like effect
      },
    },
  };
  
  // Animasi paragraf (stagger per kata)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Jeda antar kata
        delayChildren: 1, // Mulai setelah judul selesai
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  // Animasi tombol
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 2.2, duration: 0.5 }, // Setelah paragraf selesai
    },
  };

  // Animasi gambar
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 2.8, duration: 0.8 }, // Terakhir
    },
  };

  // Link animasi
  const MotionLink = motion(Link);

  return (
    <section className="custom-radial-bg text-[var(--color-surface)] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          {/* Animasi Judul */}
          <motion.h1
            className="text-[var(--color-home-title)] text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 px-5 md:px-0 lg:px-0 tracking-wide"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            Harga Hemat, Kualitas Premium!
          </motion.h1>

          {/* Animasi Paragraf */}
          <motion.p
            className="text-[var(--color-home-text)] text-base md:text-lg lg:text-xl mb-6 px-5 md:px-0 lg:px-0 pr-0 md:pr-10 lg:pr-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Animasi Tombol */}
          <MotionLink
            href="/product"
            className="inline-block bg-[var(--color-home-button)] hover:bg-white text-[var(--color-home-title)] hover:text-black font-semibold py-2 px-3 rounded-md transition-colors"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lihat Produk
          </MotionLink>
        </div>

        {/* Animasi Gambar */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <FeaturedHeroImage />
        </motion.div>
      </div>
    </section>
  );
}
