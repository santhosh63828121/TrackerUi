import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

function App() {
  const [students, setStudents] = useState([]);
  const [qrInput, setQrInput] = useState("");
  const [message, setMessage] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const handleScan = async (qrData) => {
    try {
      const res = await axios.post("http://localhost:5000/scan", {
        qr_id: qrData,
      });
      setMessage(res.data.message);
      await fetchStudents(); // refresh after scan
    } catch (err) {
      setMessage("Error: Scan failed");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Auto-submit when a QR ID is entered completely
  useEffect(() => {
    if (qrInput.trim()) {
      const timeout = setTimeout(() => {
        handleScan(qrInput.trim());
        setQrInput(""); // clear input after scan
      }, 500); // delay allows user to finish typing

      return () => clearTimeout(timeout); // cancel on new input
    }
  }, [qrInput]);

  const handleManualSubmit = () => {
    if (!qrInput.trim()) return;
    handleScan(qrInput.trim());
    setQrInput("");
  };

  return (
    <div className="App">
      <h2>📚 Maharishi School Mobile Locate System</h2>

      <div className="manual-input">
        <input
          type="text"
          value={qrInput}
          placeholder="Scan QR ID"
          onChange={(e) => setQrInput(e.target.value)}
        />
        <button onClick={handleManualSubmit}>Submit</button>
      </div>

      <p>{message}</p>

      <div className="grid">
        {students.map((s) => (
          <div key={s.qr_id} className={`card ${s.status}`}>
            <img src={s.photo} alt={s.name} />
            <h3>{s.name}</h3>
            <p>QR ID: {s.qr_id}</p>
            <p>Status: {s.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
