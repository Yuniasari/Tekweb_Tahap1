import React, { useState, useEffect } from "react";

const MedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [formData, setFormData] = useState({
    diagnosis: "",
    doctor: "",
    date: "",
  });

  // Fetch data dari localStorage atau inisialisasi
  useEffect(() => {
    const records = JSON.parse(localStorage.getItem("medicalRecords")) || [];
    setMedicalRecords(records);
  }, []);

  // Handle perubahan form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Tambah data
  const handleAdd = (e) => {
    e.preventDefault();
    const newRecord = { id: Date.now(), ...formData };
    const updatedRecords = [...medicalRecords, newRecord];
    setMedicalRecords(updatedRecords);
    localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords));
    setFormData({ diagnosis: "", doctor: "", date: "" });
  };

  // Hapus data
  const handleDelete = (id) => {
    const updatedRecords = medicalRecords.filter((record) => record.id !== id);
    setMedicalRecords(updatedRecords);
    localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords));
  };

  // Edit data (versi sederhana: update inline)
  const handleEdit = (id) => {
    const record = medicalRecords.find((record) => record.id === id);
    setFormData(record);
    handleDelete(id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Catatan Medis</h1>
      <form onSubmit={handleAdd} className="mb-6">
        <input
          type="text"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Diagnosis"
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          placeholder="Dokter"
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Tambah Catatan
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Daftar Catatan</h2>
      {medicalRecords.length > 0 ? (
        <table className="w-full bg-white shadow-lg rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Tanggal</th>
              <th className="p-2">Diagnosis</th>
              <th className="p-2">Dokter</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {medicalRecords.map((record) => (
              <tr key={record.id} className="border-b">
                <td className="p-2">{record.date}</td>
                <td className="p-2">{record.diagnosis}</td>
                <td className="p-2">{record.doctor}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(record.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
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
        <p className="text-gray-500">Belum ada catatan medis.</p>
      )}
    </div>
  );
};

export default MedicalRecords;
