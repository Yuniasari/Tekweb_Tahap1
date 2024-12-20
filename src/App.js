import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Medical from "./pages/Medical";
import Schedule from "./pages/Schedule";
import Prescription from "./pages/Prescription";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState({ name: "", age: "", gender: "" });

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Menampilkan NavBar jika user sudah login */}
        {user.name && <NavBar />}
        <Routes>
          <Route
            path="/"
            element={<Login setUser={setUser} />}
          />
          <Route
            path="/home"
            element={<Home user={user} />}
          />
          <Route
            path="/medical-records"
            element={<Medical />}
          />
          <Route
            path="/schedule"
            element={<Schedule />}
          />
          <Route
            path="/prescriptions"
            element={<Prescription />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
