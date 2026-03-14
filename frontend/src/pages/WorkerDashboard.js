
// import { useEffect, useState } from "react";

// export default function WorkerDashboard() {

//   const email = localStorage.getItem("email");
//   const [complaints, setComplaints] = useState([]);

//   useEffect(() => {

//     fetch(`http://127.0.0.1:5000/worker/my/${email}`)
//       .then(r => r.json())
//       .then(d => setComplaints(d));

//   }, [email]);

//   const updateStatus = async (id, status) => {

//     await fetch(`http://127.0.0.1:5000/admin/update/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status })
//     });

//     // reload assigned jobs
//     fetch(`http://127.0.0.1:5000/worker/my/${email}`)
//       .then(r => r.json())
//       .then(d => setComplaints(d));
//   };

//   return (
//     <div style={{ padding: 20 }}>

//       <h2>Worker Dashboard</h2>

//       {complaints.length === 0 && <p>No assigned complaints</p>}

//       {complaints.map(c => (

//         <div key={c._id} style={{ border: "1px solid gray", padding: 15, marginBottom: 10 }}>

//           <b>{c.title}</b>

//           <p>Status: {c.status}</p>

//           <select
//             value={c.status}
//             onChange={e => updateStatus(c._id, e.target.value)}
//           >
//             <option>Assigned</option>
//             <option>In Progress</option>
//             <option>Completed</option>
//           </select>

//         </div>

//       ))}

//     </div>
//   );
// }
import { useEffect, useState } from "react";

export default function WorkerDashboard() {

  const email = localStorage.getItem("email");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    fetch(`http://127.0.0.1:5000/worker/${email}`)
      .then(r=>r.json())
      .then(d=>setJobs(d));

  }, [email]);

  const updateStatus = async (id,status) => {

    await fetch(`http://127.0.0.1:5000/admin/update/${id}`,{
      method:"PUT",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({status})
    });

    window.location.reload();
  };

  return (
    <div style={{padding:20}}>

      <h2>Worker Dashboard</h2>

      {jobs.length===0 && <p>No assigned complaints</p>}

      {jobs.map(j=>(
        <div key={j._id} style={{border:"1px solid gray",padding:10,margin:10}}>

          <b>{j.title}</b>

          <p>Status: {j.status}</p>

          <select onChange={e=>updateStatus(j._id,e.target.value)}>
            <option>Assigned</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

        </div>
      ))}

    </div>
  );
}
