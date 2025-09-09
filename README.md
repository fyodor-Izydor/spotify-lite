# 🎵 Spotify Lite

Sebuah aplikasi web streaming musik sederhana seperti Spotify, dibangun menggunakan **Next.js App Router**, **TypeScript**, dan **Firebase**.

## 🚀 Fitur

- ✅ Upload lagu (audio, cover, dan lirik)
- ✅ Menampilkan detail lagu berdasarkan ID
- ❌ Lirik disimpan dan ditampilkan dalam format `.lrc` (on progress)
- ✅ UI modern dan elegan, terinspirasi dari Windows Media Player


## 🛠️ Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/fyodor-Izydor/spotify-lite.git
cd spotify-lite
```

### 2. Install Dependencies

```bash
npm install
```

> Pastikan udah menginstal **Node.js** versi 18 ke atas.

### 3. Install Package Tambahan


```bash
npm install firebase axios lucide-react
```

Jika belum install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

untuk auth login dengan firebase
```bash
npm install firebase react-hook-form
```
### 4. Buat file .env.local

# ===== Firebase Config =====
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=xxx

# ===== Cloudinary Config =====
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxx
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=xxx


### 5. Jalankan di Lokal

```bash
npm run dev
```

Akses di `http://localhost:3000`

## salam yayuk (fyodor-izydor)

### Next Update 
1. Realtime Lyric
2. Play Music In mini
3. Fitur Playlist
4. Tombol Play Lagu Selanjutnya/Sebelum

### Moga aja ga males :D