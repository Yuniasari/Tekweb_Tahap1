import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <h1 className="text-lg font-bold">HealthTrack</h1>
      <ul className="flex space-x-4 mt-2">
        <li>
          <Link to="/home" className="hover:underline">
            Beranda
          </Link>
        </li>
        <li>
          <Link to="/medical-records" className="hover:underline">
            Catatan Medis
          </Link>
        </li>
        <li>
          <Link to="/schedule" className="hover:underline">
            Jadwal Konsultasi
          </Link>
        </li>
        <li>
          <Link to="/prescriptions" className="hover:underline">
            Resep Obat
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
