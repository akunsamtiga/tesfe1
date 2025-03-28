// app/admin/articles/add-article/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TiptapEditor from '../../../../components/ui/TiptapEditor';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AddArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFeaturedImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

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
      const res = await fetch(`${API_URL}/api/articles`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to add article');
        return;
      }

      router.push('/admin');
    } catch (err) {
      setError('Error adding article');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Article</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        {/* Judul Artikel */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-3 rounded"
        />

        {/* Editor Konten dengan Tiptap */}
        <TiptapEditor content={content} setContent={setContent} />

        {/* Input Author */}
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-3 rounded"
        />

        {/* Checkbox Published */}
        <div className="flex items-center space-x-2">
          <label className="text-lg">Published:</label>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-5 h-5"
          />
        </div>

        {/* Upload Gambar */}
        <div>
          <label className="block text-lg font-semibold mb-2">Featured Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full border p-3 rounded"
          />
        </div>

        {/* Preview Gambar */}
        {previewImage && (
          <div className="mt-4">
            <p className="font-semibold">Preview:</p>
            <img src={previewImage} alt="Preview" className="w-full h-48 object-cover rounded border" />
          </div>
        )}

        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
        >
          Add Article
        </button>
      </form>
    </div>
  );
}
