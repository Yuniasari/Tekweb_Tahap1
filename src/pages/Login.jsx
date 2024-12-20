import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-80"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={userData.name}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Umur"
          value={userData.age}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
          required
        />
        <select
          name="gender"
          value={userData.gender}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
          required
        >
          <option value="">Jenis Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
