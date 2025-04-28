import React from "react";
import "./download.css";

const DownloadExcelButton = () => {
  const handleDownload = () => {
    fetch("http://localhost:5000/export_students", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "students.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error("Download error:", error);
      });
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      Download Students Excel
    </button>
  );
};

export default DownloadExcelButton;
