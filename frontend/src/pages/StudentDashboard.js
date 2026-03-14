
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {

  const [attendance, setAttendance] = useState(0);
  const [complaints, setComplaints] = useState([]);

  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {

    fetch(`http://127.0.0.1:5000/student/attendance/${email}`)
      .then(r => r.json())
      .then(d => setAttendance(d.percentage || 0));

    fetch(`http://127.0.0.1:5000/admin/complaints`)
      .then(r => r.json())
      .then(d => setComplaints(d));

  }, [email]);

  return (
    <div style={{ padding: 20 }}>

      <h2>Student Dashboard</h2>

      <h3>Attendance: {attendance}%</h3>

      <hr />

      {/* 🔹 NEW BUTTON */}
      <button onClick={() => navigate("/materials")}>
        📚 View Study Materials
      </button>

      <hr />

      <h3>Your Complaints</h3>

      {complaints.length === 0 && <p>No complaints yet</p>}

      {complaints.map(c => (
        <div
          key={c._id}
          style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}
        >
          <b>{c.title}</b>
          <p>Status: {c.status}</p>

          <button onClick={() => navigate(`/track-complaint/${c._id}`)}>
            Track
          </button>
        </div>
      ))}

      <br />

      <button onClick={() => navigate("/raise-complaint")}>
        Raise New Complaint
      </button>

    </div>
  );
}

