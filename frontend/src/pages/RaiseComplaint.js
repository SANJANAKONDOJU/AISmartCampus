
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RaiseComplaint() {
  const navigate = useNavigate();
  const [role] = useState(
  (localStorage.getItem("role") || "").toLowerCase());



  const email = localStorage.getItem("email");

  const [form, setForm] = useState({
    title: "",
    category: "Electrical",
    block: "",
    floor: "",
    room: "",
    priority: "Low",
    description: "",
    studentName: "",
    rollNo: "",
    year: "",
    studentDept: "",
    facultyName: "",
    facultyDept: "",
    designation: "",
    locationType: "",
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    let reportedBy = { 
      role,
      email
    };

    if (role === "Student") {
      reportedBy.studentDetails = {
        name: form.studentName,
        rollNo: form.rollNo,
        year: form.year,
        department: form.studentDept,
      };
    }

    if (role === "Faculty") {
      reportedBy.facultyDetails = {
        name: form.facultyName,
        department: form.facultyDept,
        designation: form.designation,
        locationType: form.locationType,
      };
    }

    const res = await fetch("http://127.0.0.1:5000/my/complaint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        category: form.category,
        location: {
          block: form.block,
          floor: form.floor,
          room: form.room,
        },
        priority: form.priority,
        description: form.description,
        reportedBy,
      }),
    });

    const data = await res.json();
    navigate(`/track-complaint/${data.id}`);
  };

  const input = {
    width: "100%",
    padding: 8,
    marginBottom: 10,
  };

  const row = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Raise Complaint</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>

        {role === "student" && (
          <>
            <div style={row}>
              <input style={input} name="studentName" placeholder="Student Name" onChange={handleChange} required />
              <input
                style={input}
                name="rollNo"
                placeholder="Roll Number (XXXX-XX-XXX-XXX)"
                pattern="^[0-9]{4}-[0-9]{2}-[0-9]{3}-[0-9]{3}$"
                required
                onChange={handleChange}
              />
            </div>

            <div style={row}>
              <input style={input} name="year" placeholder="Year (1 to 4)" onChange={handleChange} />
              <input style={input} name="studentDept" placeholder="Department" onChange={handleChange} />
            </div>
          </>
        )}

        {role === "faculty" && (
          <>
            <input style={input} name="facultyName" placeholder="Faculty Name" onChange={handleChange} required />

            <div style={row}>
              <input style={input} name="facultyDept" placeholder="Department" onChange={handleChange} />
              <input style={input} name="designation" placeholder="Designation" onChange={handleChange} />
            </div>

            <select style={input} name="locationType" onChange={handleChange}>
              <option value="">Location Type</option>
              <option>Cabin</option>
              <option>Lab</option>
              <option>Classroom</option>
            </select>
          </>
        )}

        <input style={input} name="title" placeholder="Issue Title" onChange={handleChange} required />

        <div style={row}>
          <select style={input} name="category" onChange={handleChange}>
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Internet</option>
            <option>Furniture</option>
          </select>

          <select style={input} name="block" onChange={handleChange} required>
            <option value="">Select Block</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>MECH</option>
            <option>CIVIL</option>
          </select>
        </div>

        <div style={row}>
          <input style={input} name="floor" placeholder="Floor" onChange={handleChange} required />
          <input style={input} name="room" placeholder="Room" onChange={handleChange} required />
        </div>

        <select style={input} name="priority" onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <textarea style={{ ...input, height: 80 }} name="description" placeholder="Description" onChange={handleChange} />

        <button style={{ width: "100%", padding: 10 }}>Submit Complaint</button>
      </form>

      <Link to="/">⬅ Back</Link>
    </div>
  );
}
