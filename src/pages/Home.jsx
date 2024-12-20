import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Selamat Datang, {user.name}</h1>
      <p>Umur: {user.age}</p>
      <p>Jenis Kelamin: {user.gender}</p>
      <div className="mt-4">
        <button
          onClick={() => navigate("/medical-records")}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Catatan Medis
        </button>
        <button
          onClick={() => navigate("/schedule")}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Jadwal Konsultasi
        </button>
        <button
          onClick={() => navigate("/prescriptions")}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Resep Obat
        </button>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
