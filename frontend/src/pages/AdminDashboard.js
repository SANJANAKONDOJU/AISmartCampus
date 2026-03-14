
// // // // import { useEffect, useState } from "react";

// // // // export default function AdminDashboard() {
// // // //   const [complaints, setComplaints] = useState([]);
// // // //   const [worker, setWorker] = useState("");
// // // //   const [deadline, setDeadline] = useState("");

// // // //   useEffect(() => {
// // // //     loadComplaints();
// // // //   }, []);

// // // //   const loadComplaints = async () => {
// // // //     const res = await fetch("http://127.0.0.1:5000/admin/complaints");
// // // //     const data = await res.json();
// // // //     setComplaints(data);
// // // //   };

// // // //   const updateComplaint = async (id) => {
// // // //     await fetch(`http://127.0.0.1:5000/admin/update/${id}`, {
// // // //       method: "PUT",
// // // //       headers: { "Content-Type": "application/json" },
// // // //       body: JSON.stringify({
// // // //         status: "Assigned",
// // // //         assignedTo: worker,
// // // //         deadlineDate: deadline
// // // //       })
// // // //     });

// // // //     alert("Assigned successfully");
// // // //     loadComplaints();
// // // //   };

// // // //   return (
// // // //     <div style={{ padding: 20 }}>
// // // //       <h2>Admin Dashboard</h2>

// // // //       {complaints.map(c => (
// // // //         <div key={c._id} style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
// // // //           <b>{c.title}</b>
// // // //           <p>Status: {c.status}</p>
// // // //           <p>Reported By: {c.reportedBy?.email}</p>

// // // //           <input
// // // //             placeholder="Assign Worker"
// // // //             onChange={e => setWorker(e.target.value)}
// // // //           />

// // // //           <input
// // // //             type="date"
// // // //             onChange={e => setDeadline(e.target.value)}
// // // //           />

// // // //           <br /><br />

// // // //           <button onClick={() => updateComplaint(c._id)}>
// // // //             Assign + Set Deadline
// // // //           </button>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }
// // // import { useEffect, useState } from "react";

// // // export default function AdminDashboard() {
// // //   const [complaints, setComplaints] = useState([]);
// // //   const [workers, setWorkers] = useState(["worker1", "worker2"]);

// // //   useEffect(() => {
// // //     fetch("http://127.0.0.1:5000/admin/complaints")
// // //       .then(r => r.json())
// // //       .then(d => setComplaints(d));
// // //   }, []);

// // //   const updateComplaint = async (id, status, assignedTo) => {
// // //     await fetch(`http://127.0.0.1:5000/admin/update/${id}`, {
// // //       method: "PUT",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({
// // //         status,
// // //         assignedTo
// // //       })
// // //     });

// // //     alert("Updated");

// // //     window.location.reload();
// // //   };

// // //   return (
// // //     <div style={{ padding: 20 }}>
// // //       <h2>Admin Dashboard</h2>

// // //       {complaints.map(c => (
// // //         <div key={c._id} style={{ border: "1px solid gray", padding: 10, margin: 10 }}>

// // //           <b>{c.title}</b>

// // //           <p>By: {c.reportedBy?.email || c.email || "Unknown"}</p>

// // //           <p>Status: {c.status || "Reported"}</p>


// // //           <select onChange={e => updateComplaint(c._id, e.target.value, c.assignedTo)}>
// // //             <option>Reported</option>
// // //             <option>Assigned</option>
// // //           </select>

// // //           <br/><br/>

// // //           <select onChange={e => updateComplaint(c._id, c.status || "Reported", e.target.value)}>
// // //             <option value="">Assign Worker</option>
// // //             {workers.map(w => (
// // //               <option key={w}>{w}</option>
// // //             ))}
// // //           </select>

// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }
// // import { useEffect, useState } from "react";

// // export default function AdminDashboard() {
// //   const [complaints, setComplaints] = useState([]);
// //   const [workers, setWorkers] = useState([]);

// //   useEffect(() => {
// //     fetch("http://127.0.0.1:5000/admin/complaints")
// //       .then(r => r.json())
// //       .then(d => setComplaints(d));

// //     fetch("http://127.0.0.1:5000/admin/workers")
// //       .then(r => r.json())
// //       .then(d => setWorkers(d));
// //   }, []);

// //   const updateComplaint = async (id, field, value) => {
// //     await fetch(`http://127.0.0.1:5000/admin/update/${id}`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ [field]: value })
// //     });

// //     window.location.reload();
// //   };

// //   return (
// //     <div>
// //       <h2>CampusFix - Admin Panel ✅</h2>

// //       {complaints.map(c => (
// //         <div key={c._id} style={{ border: "1px solid gray", padding: 15, margin: 15 }}>

// //           <b>{c.title}</b>

// //           <p>By: {c.reportedBy?.email}</p>

// //           <p>Location:{c.location?.block || "N/A"}, Floor {c.location?.floor || "N/A"}, Room {c.location?.room || "N/A"}</p>


// //           <p>Status: {c.status}</p>

// //           {/* Assign Worker */}
// //           <select onChange={e => updateComplaint(c._id, "assignedTo", e.target.value)}>
// //             <option value="">Assign Worker</option>

// //             {workers.map(w => (
// //               <option key={w}>{w}</option>
// //             ))}

// //           </select>

// //           <br /><br />

// //           {/* Status */}
// //           <select onChange={e => updateComplaint(c._id, "status", e.target.value)}>
// //             <option>Reported</option>
// //             <option>Assigned</option>
// //             <option>Closed</option>
// //           </select>

// //           <br /><br />

// //           {/* Deadline */}
// //           <input
// //             type="date"
// //             onChange={e => updateComplaint(c._id, "deadlineDate", e.target.value)}
// //           />

// //         </div>
// //       ))}

// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";

// export default function AdminDashboard() {

//   const [complaints, setComplaints] = useState([]);
//   const [workers, setWorkers] = useState([]);

//   // Load complaints + workers
//   useEffect(() => {

//     fetch("http://127.0.0.1:5000/admin/complaints")
//       .then(r => r.json())
//       .then(d => setComplaints(d));

//     fetch("http://127.0.0.1:5000/admin/workers")
//       .then(r => r.json())
//       .then(d => setWorkers(d));

//   }, []);

//   // Update complaint
//   const updateComplaint = async (id, payload) => {

//     await fetch(`http://127.0.0.1:5000/admin/update/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });

//     // Refresh complaints WITHOUT reload
//     fetch("http://127.0.0.1:5000/admin/complaints")
//       .then(r => r.json())
//       .then(d => setComplaints(d));
//   };

//   return (
//     <div style={{ padding: 20 }}>

//       <h2>CampusFix – Admin Panel ✅</h2>

//       {complaints.length === 0 && <p>No complaints yet</p>}

//       {complaints.map(c => (

//         <div key={c._id} style={{ border: "1px solid gray", padding: 15, marginBottom: 15 }}>

//           <b>{c.title}</b>

//           <p>
//             By: {c.reportedBy?.email || "Unknown"}
//           </p>

//           <p>
//             Location:
//             {c.location?.block || "N/A"},
//             Floor {c.location?.floor || "N/A"},
//             Room {c.location?.room || "N/A"}
//           </p>

//           <p>Status: <b>{c.status}</b></p>

//           {/* Assign Worker */}
//           <select
//             value={c.assignedTo || ""}
//             onChange={e => updateComplaint(c._id, { assignedTo: e.target.value })}
//           >
//             <option value="">Assign Worker</option>

//             {workers.map(w => (
//               <option key={w} value={w}>{w}</option>
//             ))}

//           </select>

//           <br /><br />

//           {/* Status */}
//           <select
//             value={c.status}
//             onChange={e => updateComplaint(c._id, { status: e.target.value })}
//           >
//             <option>Reported</option>
//             <option>Assigned</option>
//             <option>In Progress</option>
//             <option>Completed</option>
//             <option>Closed</option>
//           </select>

//           <br /><br />

//           {/* Deadline */}
//           <input
//             type="date"
//             value={c.deadlineDate || ""}
//             onChange={e => updateComplaint(c._id, { deadlineDate: e.target.value })}
//           />

//         </div>

//       ))}

//     </div>
//   );
// }
import { useEffect, useState } from "react";

export default function AdminDashboard() {

  const [complaints, setComplaints] = useState([]);
  const [workers, setWorkers] = useState([]);
  const statusColor = s => ({
  Reported: "orange",
  Assigned: "blue",
  "In Progress": "purple",
  Completed: "green",
  Closed: "gray"
  }[s] || "black");

  useEffect(() => {

    fetch("http://127.0.0.1:5000/admin/complaints")
      .then(r => r.json())
      .then(d => setComplaints(d));

    fetch("http://127.0.0.1:5000/admin/workers")
      .then(r => r.json())
      .then(d => setWorkers(d));

  }, []);

  const updateComplaint = async (id, field, value) => {

    await fetch(`http://127.0.0.1:5000/admin/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value })
    });

    refresh();
  };

  const refresh = () => {
    fetch("http://127.0.0.1:5000/admin/complaints")
      .then(r => r.json())
      .then(d => setComplaints(d));
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>CampusFix – Admin Panel ✅</h2>
  


      {complaints.map(c => (

        <div key={c._id} style={{ border: "1px solid gray", padding: 15, marginBottom: 15 }}>

          <b>{c.title}</b>

          <p>By: {c.reportedBy?.email}</p>

          <p>
            Location: {c.location?.block}, Floor {c.location?.floor}, Room {c.location?.room}
          </p>

          <p>Status: <b>{c.status}</b></p>


          {/* Assign Worker */}
          <select onChange={e => updateComplaint(c._id, "assignedTo", e.target.value)}>
            <option value="">Assign Worker</option>
            {workers.map(w => <option key={w}>{w}</option>)}
          </select>

          <br /><br />

          {/* Deadline */}
          <input type="date"
            onChange={e => updateComplaint(c._id, "deadlineDate", e.target.value)}
          />

          <br /><br />

          {/* ADMIN CLOSE */}
          {c.status === "Completed" && (
            <button onClick={() => updateComplaint(c._id, "status", "Closed")}>
              ✅ Close Complaint
            </button>
          )}

        </div>

      ))}

    </div>
  );
}
