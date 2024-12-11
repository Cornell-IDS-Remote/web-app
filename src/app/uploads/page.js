"use client";

import { useState } from "react";

export default function UploadPage() {
  const [carsFile, setCarsFile] = useState(null);
  const [experimentFile, setExperimentFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!carsFile || !experimentFile) {
      setMessage("Please upload both Cars.yaml and Experiment.yaml files.");
      return;
    }

    const formData = new FormData();
    formData.append("carsFile", carsFile);
    formData.append("experimentFile", experimentFile);

    try {
      const token = localStorage.getItem("token"); // Assume the token is stored in localStorage
      const response = await fetch("/api/users/uploads", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMessage("Files uploaded successfully!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to upload files.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("An error occurred while uploading files.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Basic Upload</h1>
      <p style={styles.instructions}>
        <strong>Instructions:</strong> You need to upload two YAML files:
      </p>
      <ul style={styles.list}>
        <li>
          <strong>Cars.yaml:</strong> Define paths, assign cars to those paths,
          and choose controls for cars.{" "}
          <a href="/CarsExample.yaml" style={styles.link} download>
            Download Example
          </a>
        </li>
        <li>
          <strong>Experiment.yaml:</strong> Define intended logic at
          intersections like stop signs, stoplights, and yield signs.{" "}
          <a href="/ExperimentExample.yaml" style={styles.link} download>
            Download Example
          </a>
        </li>
      </ul>

      <div style={styles.fileInput}>
        <label htmlFor="carsFile" style={styles.label}>
          Upload Cars.yaml:
        </label>
        <input
          id="carsFile"
          type="file"
          accept=".yaml"
          onChange={(e) => handleFileChange(e, setCarsFile)}
        />
      </div>

      <div style={styles.fileInput}>
        <label htmlFor="experimentFile" style={styles.label}>
          Upload Experiment.yaml:
        </label>
        <input
          id="experimentFile"
          type="file"
          accept=".yaml"
          onChange={(e) => handleFileChange(e, setExperimentFile)}
        />
      </div>

      <button onClick={handleUpload} style={styles.uploadButton}>
        Upload
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

// Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  instructions: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  list: {
    marginBottom: "20px",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
  fileInput: {
    marginBottom: "10px",
  },
  label: {
    marginRight: "10px",
  },
  uploadButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  message: {
    marginTop: "15px",
    color: "red",
    fontSize: "14px",
  },
};
