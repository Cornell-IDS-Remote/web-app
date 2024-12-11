"use client";

import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch("/api/admin/uploads");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch uploads");
        }
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        console.error("Error fetching uploads:", err);
        setError(err.message);
      }
    };

    fetchUploads();
  }, []);

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>User ID</th>
            <th style={styles.header}>Cars File</th>
            <th style={styles.header}>Experiment File</th>
          </tr>
        </thead>
        <tbody>
          {uploads.map((upload) => (
            <tr key={upload._id}>
              <td style={styles.cell}>{upload.userId}</td>
              <td style={styles.cell}>
                <a
                  href={`data:text/yaml;charset=utf-8,${encodeURIComponent(
                    upload.carsFile.data
                  )}`}
                  download={upload.carsFile.name}
                  style={styles.link}
                >
                  {upload.carsFile.name}
                </a>
              </td>
              <td style={styles.cell}>
                <a
                  href={`data:text/yaml;charset=utf-8,${encodeURIComponent(
                    upload.experimentFile.data
                  )}`}
                  download={upload.experimentFile.name}
                  style={styles.link}
                >
                  {upload.experimentFile.name}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  header: {
    border: "1px solid #ddd",
    padding: "8px",
    fontWeight: "bold",
    textAlign: "left",
    backgroundColor: "#f4f4f4",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
  error: {
    color: "red",
    fontSize: "16px",
  },
};

export default AdminDashboard;
