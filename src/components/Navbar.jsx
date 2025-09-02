import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Farel Aditya
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/input-matkul" className="nav-link">Input Kelas</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/daftar-kelas" className="nav-link">Daftar Kelas</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}