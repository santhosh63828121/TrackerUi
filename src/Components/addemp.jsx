


import React, { useState } from "react";
import axios from "axios";
import './addemp.css';

function AddStudent() {
  const [qr_id, setQrId] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [status, setStatus] = useState("checked_out");
  const [message, setMessage] = useState("");

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    
    localStorage.setItem('studentPhoto', photo);

  
    const studentData = {
      qr_id,
      name,
      photo, 
      status
    };

    try {
      
      const response = await axios.post("http://127.0.0.1:5000/add_student", studentData);

     
      setMessage(response.data.message);

      
      setQrId("");
      setName("");
      setPhoto("");
      setStatus("checked_out");
    } catch (error) {
      
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPhoto(fileReader.result); 
      };
      fileReader.readAsDataURL(file); 
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add Users</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>QR ID</label>
          <input
            type="text"
            value={qr_id}
            onChange={(e) => setQrId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Photo URL</label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
          />
        </div>

        
        <div>
          <label>Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="checked_out">Checked Out</option>
            <option value="checked_in">Checked In</option>
          </select>
        </div>

        <button type="submit">Add User</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddStudent;
