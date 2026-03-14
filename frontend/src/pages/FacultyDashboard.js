
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const email = localStorage.getItem("email");

  const styles = {
    page: {
      padding: "20px",
      background: "#f4f6f9",
      minHeight: "100vh"
    },
    title: {
      marginBottom: "15px"
    },
    button: {
      padding: "8px 14px",
      marginBottom: "10px",
      marginRight: "10px",
      border: "1px solid #888",
      background: "#fff",
      cursor: "pointer"
    },
    hr: {
      margin: "20px 0"
    },
    card: {
      border: "1px solid #999",
      padding: "12px",
      marginBottom: "12px",
      background: "white"
    }
  };

  const startAI = async () => {
    await fetch("http://127.0.0.1:5000/faculty/ai", {
      method: "POST"
    });

    alert("Attendance Completed");
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/my/${email}`)
      .then(res => res.json())
      .then(data => setComplaints(data));
  }, [email]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/materials")
      .then(r => r.json())
      .then(d => console.log("REVIEWS", d));
  }, []);

  return (
    <div style={styles.page}>

      <h2 style={styles.title}>Faculty Dashboard</h2>

      <button style={styles.button} onClick={startAI}>
        Start AI Attendance
      </button>

      <br />

      <button style={styles.button} onClick={() => navigate("/raise-complaint")}>
        Raise Complaint
      </button>

      <br />

      <button style={styles.button} onClick={() => navigate("/upload-material")}>
        Upload Study Material
      </button>

      <hr style={styles.hr} />

      <h3>Your Complaints</h3>

      {complaints.length === 0 && <p>No complaints yet.</p>}

      {complaints.map(c => (
        <div key={c._id} style={styles.card}>
          <b>{c.title}</b>
          <p>Status: {c.status}</p>

          <button
            style={styles.button}
            onClick={() => navigate(`/track-complaint/${c._id}`)}
          >
            Track
          </button>
        </div>
      ))}

    </div>
  );
}














// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function FacultyDashboard() {
//   const navigate = useNavigate();

//   const [complaints, setComplaints] = useState([]);

//   const email = localStorage.getItem("email");

//   const startAI = async () => {
//     await fetch("http://127.0.0.1:5000/faculty/ai", {
//       method: "POST"
//     });

//     alert("Attendance Completed");
//   };

//   useEffect(() => {
//     fetch(`http://127.0.0.1:5000/my/${email}`)
//       .then(res => res.json())
//       .then(data => setComplaints(data));
//   }, [email]);
 

//   useEffect(()=>{
//      fetch("http://127.0.0.1:5000/materials")
//        .then(r=>r.json())
//        .then(d=>console.log("REVIEWS",d));
//   },[]);

//   return (
//     <div>
//       <h2>Faculty Dashboard</h2>

//       <button onClick={startAI}>Start AI Attendance</button>

//       <br /><br />

//       <button onClick={() => navigate("/raise-complaint")}>
//         Raise Complaint
//       </button>

//       <br /> <br />
//       <button onClick={() => navigate("/upload-material")}>
//        Upload Study Material
//       </button>
//       <hr />

//       <h3>Your Complaints</h3>

//       {complaints.length === 0 && <p>No complaints yet.</p>}

//       {complaints.map(c => (
//         <div key={c._id} style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
//           <b>{c.title}</b>
//           <p>Status: {c.status}</p>

//           <button onClick={() => navigate(`/track-complaint/${c._id}`)}>
//             Track
//           </button>
        

//         </div>
//       ))}
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function FacultyDashboard() {

//   const [complaints, setComplaints] = useState([]);
//   const [materials, setMaterials] = useState([]);

//   const email = localStorage.getItem("email");
//   const navigate = useNavigate();

//   useEffect(() => {

//     // Faculty complaints
//     fetch(`http://127.0.0.1:5000/admin/complaints`)
//       .then(r => r.json())
//       .then(d => setComplaints(d));

//     // Study materials + reviews
//     fetch("http://127.0.0.1:5000/materials")
//       .then(r => r.json())
//       .then(d => setMaterials(d));

//   }, [email]);

//   return (
//     <div style={{ padding: 20 }}>

//       <h2>Faculty Dashboard</h2>

//       <button onClick={() => navigate("/raise-complaint")}>
//         Raise Complaint
//       </button>

//       <button onClick={() => navigate("/upload-material")}>
//         Upload Study Material
//       </button>

//       <hr />

//       <h3>Your Complaints</h3>

//       {complaints.map(c => (
//         <div key={c._id} style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
//           <b>{c.title}</b>
//           <p>Status: {c.status}</p>

//           <button onClick={() => navigate(`/track-complaint/${c._id}`)}>
//             Track
//           </button>
//         </div>
//       ))}

//       <hr />

//       <h3>Student Reviews</h3>

//       {materials
//         .filter(m => m.faculty === email)
//         .map(m => (

//         <div key={m._id} style={{ border: "1px solid green", padding: 10, margin: 10 }}>

//           <b>{m.title}</b>

//           {m.reviews.length === 0 && <p>No reviews yet</p>}

//           {m.reviews.map((r,i)=>(
//             <p key={i}>
//               🧑 {r.student} : {r.message}
//             </p>
//           ))}

//         </div>
//       ))}

//     </div>
//   );
// }
