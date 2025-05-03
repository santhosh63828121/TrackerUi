

import React, { useState } from 'react';
import axios from 'axios';

function ExcelUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload_excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Check console for details.');
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Excel</button>
    </div>
  );
}

export default ExcelUpload;
