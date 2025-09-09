'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadImage from '@/components/UploadImage';
import UploadAudio from '@/components/UploadAudio';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // 🆕 Import auth

export default function Page() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !artist || !genre || !imageUrl || !audioUrl) {
      alert('Semua field harus diisi!');
      return;
    }

    setLoading(true);

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('Kamu harus login terlebih dahulu.');
      setLoading(false);
      return;
    }

    const songData = {
      title,
      artist,
      genre,
      coverUrl: imageUrl,
      audioUrl,
      lyrics,
      createdAt: new Date().toISOString(),
      userId: user.uid, // 🆕 Tambahkan userId
    };

    try {
      await addDoc(collection(db, 'songs'), songData);
      console.log('Lagu tersimpan:', songData);
      alert('Lagu berhasil disimpan!');
      router.push('/songs');
    } catch (error) {
      console.error('Gagal menyimpan lagu:', error);
      alert('Terjadi kesalahan saat menyimpan.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🎵 Upload Lagu Baru</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Judul Lagu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="text"
            placeholder="Nama Artis"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <UploadImage onUploaded={setImageUrl} />
          <UploadAudio onUploaded={setAudioUrl} />

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview Cover"
              className="max-w-xs mt-4 rounded shadow border border-gray-600"
            />
          )}

          {audioUrl && (
            <audio controls className="mt-4 w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Browser tidak mendukung pemutar audio.
            </audio>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? '⏳ Menyimpan...' : '💾 Simpan Lagu'}
          </button>
        </div>

        <Link href="/songs">
          <div className="mt-6 flex justify-end">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-300">
              Daftar Lagu 🎵
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
