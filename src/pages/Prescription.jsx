import React, { useState, useEffect } from "react";

function Prescription() {
  const [prescriptions, setPrescriptions] = useState(() => {
    // Ambil data dari local storage saat komponen dimuat
    const savedData = localStorage.getItem("prescriptions");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [newPrescription, setNewPrescription] = useState({
    name: "",
    dose: "",
    status: "Sedang Digunakan",
    notes: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Simpan data ke local storage setiap kali prescriptions berubah
  useEffect(() => {
    localStorage.setItem("prescriptions", JSON.stringify(prescriptions));
  }, [prescriptions]);

  const addPrescription = () => {
    if (!newPrescription.name || !newPrescription.dose) {
      alert("Harap isi Nama Obat dan Dosis!");
      return;
    }
    setPrescriptions([...prescriptions, newPrescription]);
    setNewPrescription({ name: "", dose: "", status: "Sedang Digunakan", notes: "" });
  };

  const deletePrescription = (index) => {
    const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updatedPrescriptions);
  };

  const startEditPrescription = (index) => {
    setNewPrescription(prescriptions[index]);
    setEditIndex(index);
  };

  const updatePrescription = () => {
    if (editIndex !== null) {
      const updatedPrescriptions = [...prescriptions];
      updatedPrescriptions[editIndex] = newPrescription;
      setPrescriptions(updatedPrescriptions);
      setEditIndex(null);
      setNewPrescription({ name: "", dose: "", status: "Sedang Digunakan", notes: "" });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manajemen Resep Obat</h1>
      {/* Form Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nama Obat"
          value={newPrescription.name}
          onChange={(e) => setNewPrescription({ ...newPrescription, name: e.target.value })}
          className="block w-full p-2 border mb-2"
        />
        <input
          type="text"
          placeholder="Dosis (misalnya: 2x sehari)"
          value={newPrescription.dose}
          onChange={(e) => setNewPrescription({ ...newPrescription, dose: e.target.value })}
          className="block w-full p-2 border mb-2"
        />
        <select
          value={newPrescription.status}
          onChange={(e) => setNewPrescription({ ...newPrescription, status: e.target.value })}
          className="block w-full p-2 border mb-2"
        >
          <option value="Sedang Digunakan">Sedang Digunakan</option>
          <option value="Sudah Habis">Sudah Habis</option>
        </select>
        <textarea
          placeholder="Catatan Tambahan (opsional)"
          value={newPrescription.notes}
          onChange={(e) => setNewPrescription({ ...newPrescription, notes: e.target.value })}
          className="block w-full p-2 border mb-2"
        ></textarea>
        {editIndex === null ? (
          <button onClick={addPrescription} className="bg-blue-500 text-white px-4 py-2 rounded">
            Tambah Resep
          </button>
        ) : (
          <button onClick={updatePrescription} className="bg-green-500 text-white px-4 py-2 rounded">
            Simpan Perubahan
          </button>
        )}
      </div>

      {/* Daftar Resep */}
      <h2 className="text-xl font-bold mb-4">Daftar Resep Obat</h2>
      {prescriptions.length === 0 ? (
        <p className="text-gray-500">Belum ada resep obat.</p>
      ) : (
        <ul>
          {prescriptions.map((prescription, index) => (
            <li
              key={index}
              className="mb-4 border-b pb-2 flex justify-between items-center"
            >
              <div>
                <p><strong>Nama Obat:</strong> {prescription.name}</p>
                <p><strong>Dosis:</strong> {prescription.dose}</p>
                <p><strong>Status:</strong> {prescription.status}</p>
                {prescription.notes && <p><strong>Catatan:</strong> {prescription.notes}</p>}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEditPrescription(index)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePrescription(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Prescription;
