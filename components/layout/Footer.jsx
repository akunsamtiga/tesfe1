// components/layout/Footer.jsx
"use client";
import Link from 'next/link';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { SocialIcon } from 'react-social-icons';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-footer)] text-[var(--color-footer-text)]">
      <div className="w-full px-6 md:px-8 lg:px-12 pt-4 md:pt-6 lg:pt-10 pb-6">
        {/* Top Section Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Sanstore */}
          <div>
            <h3 className="text-[var(--color-footer-title)] font-semibold md:font-bold lg:font-bold text-base md:text-xl lg:text-2xl mb-4">
              Sanstore
            </h3>
            <p className="inline-block text-xs border-b border-[var(--color-border)] pb-2 lg:py-2">
              RT 04 RW 02 Krajan, Ngadisuko, Durenan, Trenggalek, Jawa Timur, Indonesia
            </p>
            <p className="inline-block text-xs border-b border-[var(--color-border)] py-2 lg:py-2">
              Email:{" "}
              <a
                href="mailto:sanstore-help@gmail.com"
                className="font-medium hover:text-red-400 transition"
              >
                sanstore-help@gmail.com
              </a>
            </p>
            <p className="text-xs pt-2 lg:pt-2">
              Whatsapp:{" "}
              <a
                href="https://wa.me/6281217811062"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-green-500 transition"
              >
                +62 812 1781 1062
              </a>
            </p>
          </div>

          {/* Dukungan */}
          <div>
            <h3 className="text-[var(--color-footer-title)] font-semibold text-base mb-4">
              Dukungan
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/store/about" className="hover:text-[var(--color-primary)] transition">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="/store/contact" className="hover:text-[var(--color-primary)] transition">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="/store/FAQ" className="hover:text-[var(--color-primary)] transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/store/COD" className="hover:text-[var(--color-primary)] transition">
                  COD
                </Link>
              </li>
              <li>
                <Link href="/store/TT" className="hover:text-[var(--color-primary)] transition">
                  Tukar Tambah
                </Link>
              </li>
            </ul>
          </div>

          {/* Metode Pembayaran */}
          <div>
            <h3 className="text-[var(--color-footer-title)] font-semibold text-base mb-4">
              Metode Pembayaran
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 items-center">
              <Image src="/images/gopay.png" alt="GoPay" width={60} height={40} />
              <Image src="/images/ovo.png" alt="OVO" width={60} height={40} />
              <Image src="/images/dana.png" alt="DANA" width={60} height={40} />
              <Image src="/images/bri.png" alt="BRI" width={60} height={40} />
              <Image src="/images/shopeepay.png" alt="ShopeePay" width={50} height={40} />
              <Image src="/images/tether.png" alt="Tether" width={60} height={40} />
            </div>
          </div>

          {/* Sosial Media */}
          <div className="text-center">
            <h3 className="text-[var(--color-footer-title)] font-semibold text-base mb-4">
              Sosial Media
            </h3>
            <div className="grid grid-cols-4 place-items-center lg:mx-8">
              <SocialIcon
                url="https://facebook.com"
                className="hover:scale-110 transition-transform"
                style={{ width: 30, height: 30 }}
              />
              <SocialIcon
                url="https://tiktok.com"
                className="hover:scale-110 transition-transform"
                style={{ width: 30, height: 30 }}
              />
              <SocialIcon
                url="https://instagram.com"
                className="hover:scale-110 transition-transform"
                style={{ width: 30, height: 30 }}
              />
              <SocialIcon
                url="https://youtube.com"
                className="hover:scale-110 transition-transform"
                style={{ width: 30, height: 30 }}
              />
            </div>
          </div>

        </div>

        {/* Certificate */}
        <div className="hidden lg:visible py-4 lg:flex lg:justify-end">
          <div className="text-center lg:text-center  ">
            <h3 className="text-[var(--color-footer-title)] lg:bg-green-200 lg:py-1 lg:rounded-tl-3xl font-semibold text-base">
              Sertifikasi Keamanan
            </h3>
            <div className="lg:bg-green-50 grid grid-cols-2 mx-auto w-[70%] md:w-[50%] lg:w-auto h-auto place-items-center">
              <Image
                src="/images/trusted.png"
                alt="Trusted Site Verified"
                width={150}
                height={50}
                className="object-contain max-w-[200px] max-h-[100px]"
              />

              <Image
                src="/images/ssl.png"
                alt="SSL"
                width={150}
                height={50}
                className="object-contain max-w-[150px] max-h-[50px]"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-footer-divider)] my-4 lg:mt-10"></div>

        {/* Bottom Section */}
        <div className="text-xs grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-0 lg:gap-0">
          {/* Language Selector */}
          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <GlobeAltIcon className="h-5 w-5 text-[var(--color-muted)]" />
            <span>Indonesia / English</span>
          </div>
          {/* Links */}
          <div className="flex justify-center space-x-6 md:space-x-5 lg:space-x-12">
            <Link href="/terms" className="hover:text-[var(--color-primary)] transition">
              Privasi
            </Link>
            <Link href="/privacy" className="hover:text-[var(--color-primary)] transition">
              Legal
            </Link>
            <Link href="/cookies" className="hover:text-[var(--color-primary)] transition">
              Peta Situs
            </Link>
          </div>
          {/* Copyright */}
          <div className="text-center md:text-right">
            &copy; {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
