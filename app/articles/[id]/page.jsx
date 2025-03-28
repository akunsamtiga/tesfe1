// app/articles/[id]/page.jsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import TiptapViewer from '../../../components/ui/TiptapViewer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Fungsi generateMetadata akan dieksekusi pada server sebelum rendering halaman
export async function generateMetadata({ params }) {
  const res = await fetch(`${API_URL}/api/articles/${params.id}`);
  if (!res.ok) {
    return { title: 'Article Not Found' };
  }
  const article = await res.json();

  // Buat description dengan menghilangkan tag HTML jika tidak ada properti description tersendiri
  const description =
    article.description ||
    article.content.replace(/<[^>]+>/g, '').substring(0, 150);

  // URL artikel menggunakan slug atau fallback ke id
  const url = `https://yourwebsite.com/articles/${article.slug || article.id}`;

  // Pastikan URL gambar absolut
  const image = article.featuredImage
    ? article.featuredImage.startsWith('/')
      ? `${API_URL}${article.featuredImage}`
      : article.featuredImage
    : 'https://yourwebsite.com/default-image.jpg';

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      url,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [image],
    },
  };
}

export default async function ArticleDetail({ params }) {
  // Fetch data artikel secara server-side
  const res = await fetch(`${API_URL}/api/articles/${params.id}`);
  if (!res.ok) {
    notFound();
  }
  const article = await res.json();

  // Format tanggal
  const formattedDate = new Date(article.createdAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Container Utama */}
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md max-w-4xl">
        {/* Judul Artikel */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{article.title}</h1>

        {/* Gambar Featured (Jika Ada) */}
        {article.featuredImage && (
          <div className="relative overflow-hidden rounded-lg shadow-md mb-6">
            <img
              src={
                article.featuredImage.startsWith('/')
                  ? `${API_URL}${article.featuredImage}`
                  : article.featuredImage
              }
              alt={article.title}
              className="w-full h-auto aspect-[16/9] object-cover transition duration-300 hover:scale-105"
              loading="lazy"
              crossOrigin="anonymous"
            />
          </div>
        )}

        {/* Konten Artikel dengan TiptapViewer */}
        <div className="mb-6">
          <TiptapViewer content={article.content} />
        </div>

        {/* Informasi Metadata */}
        <div className="flex flex-col space-y-2 text-sm text-gray-500">
          <p>
            <span className="font-semibold">Author:</span> {article.author || 'Unknown'}
          </p>
          <p>
            <span className="font-semibold">Published:</span> {article.published ? 'Yes' : 'No'}
          </p>
          <p>
            <span className="font-semibold">Created:</span> {formattedDate}
          </p>
        </div>

        {/* Tombol Kembali */}
        <div className="mt-8">
          <Link
            href="/articles"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
          >
            Daftar Artikel
          </Link>
        </div>
      </div>
    </div>
  );
}
