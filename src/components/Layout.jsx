import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {/* Outlet akan merender komponen rute anak (misal: InputMataKuliah) */}
        <Outlet />
      </main>
    </div>
  );
}