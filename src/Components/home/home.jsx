import React, { useState, useEffect, useRef } from "react"; // Step 1
import axios from "axios";
import "./home.css";

function App() {
  const [students, setStudents] = useState([]);
  const [qrInput, setQrInput] = useState("");
  const [message, setMessage] = useState("");

  const inputRef = useRef(null); // Step 2

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
    inputRef.current?.focus(); // Step 3 - focus on load
  }, []);

  useEffect(() => {
    if (qrInput.trim()) {
      const timeout = setTimeout(() => {
        handleScan(qrInput.trim());
        setQrInput(""); // clear input after scan
        inputRef.current?.focus(); // focus again after scan
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [qrInput]);

  const handleManualSubmit = () => {
    if (!qrInput.trim()) return;
    handleScan(qrInput.trim());
    setQrInput("");
    inputRef.current?.focus(); // focus after manual submit
  };

  return (
    <div className="App">
      <h2>📚 Maharishi School Mobile Locate System</h2>

      <div className="manual-input">
        <input
          ref={inputRef} // Set the input ref here
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
