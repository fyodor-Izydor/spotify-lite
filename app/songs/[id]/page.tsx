'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ArrowLeft, Pause, Play, Repeat, SkipBack, SkipForward } from 'lucide-react';
import Link from 'next/link';

interface SongData {
  title: string;
  artist: string;
  genre: string;
  coverUrl: string;
  audioUrl: string;
  createdAt?: string | Timestamp;
}

export default function SongDetailPage() {
  const { id } = useParams();
  const [song, setSong] = useState<SongData | null>(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const docRef = doc(db, 'songs', id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSong(docSnap.data() as SongData);
        } else {
          console.error('Lagu tidak ditemukan.');
        }
      } catch (err) {
        console.error('Gagal memuat lagu:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSong();
  }, [id]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleEnded = () => {
    if (isRepeat) {
      audioRef.current?.play();
    } else {
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) =>
    `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, '0')}`;

  if (loading) return <div className="text-white p-6 text-center">🎵 Memuat lagu...</div>;
  if (!song) return <div className="text-red-400 p-6 text-center">🚫 Lagu tidak ditemukan.</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url(${song.coverUrl})`,
        backgroundColor: '#707070',
        backgroundBlendMode: 'multiply',
      }}
    >
      <div className="absolute top-4 left-4">
        <Link href="/songs" className="text-white flex items-center space-x-1 hover:underline text-sm">
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </Link>
      </div>

      <div className="rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 w-full max-w-4xl backdrop-blur-sm">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-48 h-48 object-cover rounded-lg shadow-md border border-gray-600"
          onError={(e) => (e.currentTarget.src = '/placeholder-image.jpg')}
        />
        <div className="flex-1 w-full text-center md:text-left">
          <h1 className="text-2xl font-bold">{song.title}</h1>
          <p className="text-gray-300">{song.artist}</p>
          <p className="text-sm text-gray-400 mt-1">{song.genre}</p>

          {/* Hidden default player */}
          <audio
            ref={audioRef}
            src={song.audioUrl}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            hidden
          />

          {/* Custom Controls */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center gap-8">
              <button onClick={() => (audioRef.current!.currentTime -= 10)}>
                <SkipBack size={24} />
              </button>

              <button
                onClick={togglePlay}
                className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button onClick={() => (audioRef.current!.currentTime += 10)}>
                <SkipForward size={24} />
              </button>

              <button onClick={() => setIsRepeat(!isRepeat)} className={isRepeat ? 'text-green-400' : ''}>
                <Repeat size={20} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-8 flex items-center gap-2 text-xs text-gray-300">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={currentTime}
                onChange={handleProgressChange}
                className="flex-1 accent-blue-500"
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
