'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push('/'); // Arahkan ke homepage setelah berhasil register
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Daftar Akun</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-4 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            disabled={loading}
          >
            {loading ? 'Mendaftarkan...' : 'Daftar'}
          </button>
        </form>

        <p className=" mt-6 text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <a href="/" className="text-blue-600 hover:underline">
            Masuk di sini
          </a>
        </p>
      </div>
    </div>
  );
}
