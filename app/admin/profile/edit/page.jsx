"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditAdminProfile() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [profile, setProfile] = useState({ name: "", address: "", profilePicture: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchProfile();
  }, [router]);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/admin/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setPreviewImage(data.profilePicture ? `${API_URL}${data.profilePicture}` : null);
      } else {
        setError("Failed to fetch profile data.");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Error fetching profile data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Tampilkan preview foto dari file yang dipilih
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("profilePicture", file);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/api/admin/profile/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setProfile({ ...profile, profilePicture: data.profilePicture });
        setPreviewImage(`${API_URL}${data.profilePicture}`);
        toast.success("Profile picture updated successfully.");
      } else {
        toast.error("Failed to upload profile picture.");
      }
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      toast.error("Error uploading profile picture.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/admin/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        toast.success("Profile updated successfully.");
        // Redirect kembali ke halaman informasi admin setelah 2 detik
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else {
        const errorData = await res.json();
        toast.error("Failed to update profile: " + (errorData.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Error updating profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Edit Admin Profile</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-center">
          <p className="mb-2 font-medium">Profile Preview:</p>
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              crossOrigin="anonymous"
              className="w-24 h-24 rounded-full object-cover mx-auto border border-gray-300 shadow"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
              No Image
            </div>
          )}
        </div>
        <div className="mb-4">
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
          <button
            type="button"
            onClick={handleUpload}
            className="w-full bg-blue-500 text-white py-2 mt-2 rounded"
          >
            Upload Foto
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter your address"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-green-500 text-white py-2 rounded w-full"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
