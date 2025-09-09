'use client';

import { useState } from 'react';

interface UploadImageProps {
  onUploaded: (url: string) => void;
}

export default function UploadImage({ onUploaded }: UploadImageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !cloudName || !uploadPreset) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.secure_url) {
      onUploaded(data.secure_url);
    } else {
      alert('Upload gagal!');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
}
