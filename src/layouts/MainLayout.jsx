// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Memastikan layout mengisi seluruh tinggi layar
        backgroundColor: "#f4f6f8", // Warna latar belakang utama
      }}
    >
      <Navbar />
      <main
        style={{
          flex: 1, // Mengambil sisa ruang yang tersedia, mendorong footer ke bawah
          width: "100%",
          padding: "2rem",
        }}
      >
        {/* Container untuk membatasi lebar konten dan membuatnya di tengah */}
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}><Outlet /></div>
      </main>
      <Footer />
    </div>
  );
}
