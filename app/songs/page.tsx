'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';

type Song = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  coverUrl: string;
  audioUrl: string;
  userId: string;
};

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const auth = getAuth();

        onAuthStateChanged(auth, async (user) => {
          if (!user) {
            setSongs([]);
            setLoading(false);
            return;
          }

          const snapshot = await getDocs(collection(db, 'songs'));
          const allSongs: Song[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Song, 'id'>),
          }));

          const userSongs = allSongs.filter((song) => song.userId === user.uid);
          setSongs(userSongs);
          setLoading(false);
        });
      } catch (error) {
        console.error('Gagal mengambil data lagu:', error);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push('/'); // arahkan ke halaman login setelah logout
  };

  if (loading) return <p className="p-6 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1f1f1f] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">🎵 Koleksi Lagu Kamu</h1>
            <Link href="/Upload">
              <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-300">
                + Tambah Lagu Baru
              </button>
            </Link>
          </div>
          <Link href="../" className="text-blue-400 hover:underline">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-300"
            >
              Logout
            </button>
          </Link>
          
        </header>

        {songs.length === 0 ? (
          <p className="text-gray-400">Belum ada lagu yang kamu upload.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {songs.map((song) => (
              <Link
                href={`/songs/${song.id}`}
                key={song.id}
                className="bg-[#181818] hover:bg-[#252525] rounded-xl overflow-hidden shadow-md transition-transform duration-200 hover:scale-105 group"
              >
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold group-hover:underline truncate">{song.title}</h2>
                  <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                </div>
                <div className="flex justify-end px-4 pb-4">
                  <MoreHorizontal className="text-gray-500 group-hover:text-white" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
