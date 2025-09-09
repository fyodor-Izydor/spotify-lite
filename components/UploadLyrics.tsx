// components/UploadLyrics.tsx
'use client';

type Props = {
  lyrics: string;
  setLyrics: (lyrics: string) => void;
};

export default function UploadLyrics({ lyrics, setLyrics }: Props) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold">📝 Lirik Lagu (.lrc)</label>
      <textarea
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
        placeholder={`Contoh format:\n[00:10.00] Lirik lagu baris pertama\n[00:15.50] Baris berikutnya`}
        rows={8}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}
