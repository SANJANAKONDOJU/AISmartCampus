import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  // 12 digit college mail
  const emailPattern = /^[0-9]{12}@mvsrec\.edu\.in$/;

  const handleRegister = async () => {
    if (!emailPattern.test(email)) {
      alert("Use college mail like 235123733165@mvsrec.edu.in");
      return;
    }

    if (!role) {
      alert("Select role");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });

      const data = await res.json();

      if (data.success) {
        alert("Registered successfully");
        navigate("/login");   // ✅ React redirect
      } else {
        alert(data.message || "Registration failed");
      }

    } catch (err) {
      alert("Backend not running");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="College Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="admin">Admin</option>
        <option value="worker">Worker</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
