// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">404 - Halaman Tidak Ditemukan</h1>
      <p className="mt-4">Maaf, halaman yang Anda cari tidak ada.</p>
      <Link to="/" className="mt-6 inline-block text-indigo-600 hover:underline">Kembali ke Beranda</Link>
    </div>
  );
}