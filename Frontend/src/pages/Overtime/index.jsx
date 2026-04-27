import { useState, useEffect } from "react";
import axios from "axios";

function Overtime() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    workerId: "",
    date: "",
    hours: "",
    reason: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/data-pegawai")
      .then(res => setEmployees(res.data))
      .catch(() => setEmployees([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { workerId, date, hours, reason } = form;

    if (!workerId || !date || !hours || !reason) {
      return setError("All fields required");
    }

    if (hours < 1 || hours > 6) {
      return setError("Hours must be between 1 and 6");
    }

    const today = new Date();
    const inputDate = new Date(date);

    if (inputDate > today) {
      return setError("Future date not allowed");
    }

    const diff = (today - inputDate) / (1000 * 60 * 60 * 24);
    if (diff > 7) {
      return setError("Date cannot be older than 7 days");
    }

    if (reason.length < 10) {
      return setError("Reason must be at least 10 characters");
    }

    try {
      await axios.post("http://localhost:5000/api/overtime", form);
      alert("Overtime submitted successfully");
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
  <div style={styles.container}>
    <h2 style={styles.title}>Overtime Entry</h2>

    <form onSubmit={handleSubmit} style={styles.form}>
      
      <div style={styles.field}>
        <label>Worker</label>
        <select
          style={styles.input}
          onChange={(e) => setForm({ ...form, workerId: e.target.value })}
        >
          <option value="">Select Worker</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.nama}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.field}>
        <label>Date</label>
        <input
          type="date"
          style={styles.input}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>

      <div style={styles.field}>
        <label>Overtime Hours</label>
        <input
          type="number"
          style={styles.input}
          placeholder="Enter hours"
          onChange={(e) => setForm({ ...form, hours: e.target.value })}
        />
      </div>

      <div style={styles.field}>
        <label>Reason</label>
        <textarea
          style={{ ...styles.input, height: "80px" }}
          placeholder="Enter reason..."
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
      </div>

      <button type="submit" style={styles.button}>
        Submit
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </form>
  </div>
);
}

export default Overtime;

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  field: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  button: {
    padding: "12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    textAlign: "center"
  }
};