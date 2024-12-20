import React, { useState, useEffect } from "react";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    doctor: "",
  });

  // Fetch data dari localStorage atau inisialisasi
  useEffect(() => {
    const savedSchedules = JSON.parse(localStorage.getItem("schedules")) || [];
    setSchedules(savedSchedules);
  }, []);

  // Handle perubahan form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Tambah data
  const handleAdd = (e) => {
    e.preventDefault();
    const newSchedule = { id: Date.now(), ...formData };
    const updatedSchedules = [...schedules, newSchedule];
    setSchedules(updatedSchedules);
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
    setFormData({ date: "", location: "", doctor: "" });
  };

  // Hapus data
  const handleDelete = (id) => {
    const updatedSchedules = schedules.filter((schedule) => schedule.id !== id);
    setSchedules(updatedSchedules);
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
  };

  // Edit data (inline update)
  const handleEdit = (id) => {
    const schedule = schedules.find((schedule) => schedule.id === id);
    setFormData(schedule);
    handleDelete(id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Jadwal Konsultasi Dokter</h1>
      <form onSubmit={handleAdd} className="mb-6">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="Tanggal"
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Lokasi"
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          placeholder="Nama Dokter"
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Tambah Jadwal
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Daftar Jadwal</h2>
      {schedules.length > 0 ? (
        <table className="w-full bg-white shadow-lg rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Tanggal</th>
              <th className="p-2">Lokasi</th>
              <th className="p-2">Nama Dokter</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id} className="border-b">
                <td className="p-2">{schedule.date}</td>
                <td className="p-2">{schedule.location}</td>
                <td className="p-2">{schedule.doctor}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(schedule.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(schedule.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Belum ada jadwal konsultasi.</p>
      )}
    </div>
  );
};

export default Schedule;
