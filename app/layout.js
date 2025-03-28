// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "../components/layout/AuthContext";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata = {
  title: "Sanstore",
  description:
    "Temukan produk teknologi terbaik seperti smartphone, laptop, dan aksesoris di Sanstore. Harga terjangkau, kualitas terjamin, dan pengiriman cepat.",
  keywords:
    "sanstore, toko online, belanja online, smartphone, laptop, aksesoris teknologi, harga murah, produk terbaru",
  openGraph: {
    title: "Sanstore - Solusi Belanja Terpercaya",
    description:
      "Sanstore menyediakan berbagai produk teknologi berkualitas tinggi dengan harga kompetitif. Nikmati kemudahan belanja online dengan layanan pelanggan terbaik.",
    images: [
      {
        url: "https://example.com/logoSANSTORE.jpg",
        width: 1200,
        height: 630,
        alt: "Deskripsi gambar",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Navbar />
            <main>{children}</main>
            <footer aria-label="Site footer">
              <Footer />
            </footer>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
