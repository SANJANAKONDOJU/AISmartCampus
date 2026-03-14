// import React, { useState } from "react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const handleLogin = async () => {
//   if (!email || !password || !role) {
//     alert("Fill all fields");
//     return;
//   }

//   try {
//     const res = await fetch("http://127.0.0.1:5000/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     });

//     const data = await res.json();

//     if (data.success) {
//       localStorage.setItem("email", email);
//       localStorage.setItem("role", data.role);

//       window.location.href = `/${data.role}`;
//     } else {
//       alert("Invalid login");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Backend not reachable");
//   }
// };


//   return (
//     <div>
//       <h2>Smart Campus Login</h2>

//       <input
//         placeholder="College Email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//       />

//       <select value={role} onChange={e => setRole(e.target.value)}>
//         <option value="">Select Role</option>
//         <option value="student">Student</option>
//         <option value="faculty">Faculty</option>
//         <option value="admin">Admin</option>
//         <option value="worker">Worker</option>
//       </select>

//       <button onClick={handleLogin}>Login</button>

//       <button onClick={() => window.location.href = "/register"}>
//         Go to Register
//       </button>
//     </div>
//   );
// }
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f6f9"
    },
    box: {
      width: "360px",
      padding: "35px",
      background: "white",
      border: "1px solid #ccc",
      borderRadius: "8px"
    },
    title: {
      textAlign: "center",
      marginBottom: "20px"
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #aaa",
      borderRadius: "4px"
    },
    loginBtn: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      background: "#2563eb",
      color: "white",
      border: "none",
      cursor: "pointer"
    },
    registerBtn: {
      width: "100%",
      padding: "8px",
      background: "#e5e7eb",
      border: "1px solid #aaa",
      cursor: "pointer"
    }
  };

  const handleLogin = async () => {
    if (!email || !password || !role) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("email", email);
        localStorage.setItem("role", data.role);
        window.location.href = `/${data.role}`;
      } else {
        alert("Invalid login");
      }
    } catch (err) {
      console.error(err);
      alert("Backend not reachable");
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.box}>

        <h2 style={styles.title}>Smart Campus Login</h2>

        <input
          style={styles.input}
          placeholder="College Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <select
          style={styles.input}
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
          <option value="worker">Worker</option>
        </select>

        <button style={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>

        <button
          style={styles.registerBtn}
          onClick={() => window.location.href = "/register"}
        >
          Go to Register
        </button>

      </div>

    </div>
  );
}
