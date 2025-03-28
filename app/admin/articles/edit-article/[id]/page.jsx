// app/admin/articles/edit-article/[id]/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TiptapEditor from '../../../../../components/ui/TiptapEditor';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function EditArticlePage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`${API_URL}/api/articles/${id}`);
        if (!res.ok) throw new Error('Failed to fetch article');
        const data = await res.json();
        setArticle(data);
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author || '');
        setPublished(data.published);
        setCurrentImage(data.featuredImage || '');
        setPreviewImage(
          data.featuredImage
            ? data.featuredImage.startsWith('/')
              ? `${API_URL}${data.featuredImage}`
              : data.featuredImage
            : ''
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('published', published);
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to update article');
        return;
      }
      router.push('/admin');
    } catch (err) {
      setError('Error updating article');
      console.error(err);
    }
  };

  if (loading) return <p>Loading article...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        {/* Judul Artikel */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        {/* Editor Konten dengan TiptapEditor */}
        <TiptapEditor content={content} setContent={setContent} />

        {/* Input Author */}
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Checkbox Published */}
        <div>
          <label className="mr-2">Published:</label>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
        </div>

        {/* Upload Gambar */}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setFeaturedImage(file);
            if (file) {
              setPreviewImage(URL.createObjectURL(file));
            }
          }}
          accept="image/*"
          className="w-full border p-2 rounded"
        />

        {/* Tampilkan gambar saat ini jika belum ada gambar baru yang dipilih */}
        {currentImage && !featuredImage && (
          <div className="mb-4">
            <p className="mb-2 font-semibold">Current Image:</p>
            <img
              src={currentImage.startsWith('/') ? `${API_URL}${currentImage}` : currentImage}
              alt="Current Featured"
              className="w-full h-48 object-cover rounded"
              crossOrigin="anonymous"
            />
          </div>
        )}

        {/* Preview gambar baru */}
        {featuredImage && (
          <div className="mb-4">
            <p className="mb-2 font-semibold">New Image Preview:</p>
            <img
              src={previewImage}
              alt="New Featured Preview"
              className="w-full h-48 object-cover rounded"
              crossOrigin="anonymous"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Update Article
        </button>
      </form>
    </div>
  );
}
