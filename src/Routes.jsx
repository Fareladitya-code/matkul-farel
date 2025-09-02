// src/Routes.jsx
import { lazy } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Gunakan lazy loading untuk performa yang lebih baik
const InputMataKuliah = lazy(() => import("./pages/InputMataKuliah"));
const DaftarKelas = lazy(() => import("./pages/DaftarKelas"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Arahkan halaman utama ke halaman input */}
          <Route index element={<Navigate to="/input-matkul" replace />} />
          <Route path="input-matkul" element={<InputMataKuliah />} />
          <Route path="daftar-kelas" element={<DaftarKelas />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
    
  );
}