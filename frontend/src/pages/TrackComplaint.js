// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// const steps = ["Reported", "Assigned", "In Progress", "Completed", "Closed"];

// export default function TrackComplaint() {
//   const { id } = useParams();
//   const [complaint, setComplaint] = useState(null);

//   useEffect(() => {
//     fetch(`http://127.0.0.1:5000/complaints/${id}`)
//       .then(res => res.json())
//       .then(data => setComplaint(data));
//   }, [id]);

//   if (!complaint) return <p>Loading...</p>;

//   const currentStep = steps.indexOf(complaint.status);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Complaint Tracking</h2>

//       <h3>{complaint.title}</h3>
//       <p>Status: {complaint.status}</p>

//       {steps.map((s, i) => (
//         <span key={s} style={{ padding: 6, background: i <= currentStep ? "#d1fae5" : "#eee", margin: 4 }}>
//           {s}
//         </span>
//       ))}

//       <h4>Timeline</h4>

//       {complaint.statusHistory.map((t, i) => (
//         <div key={i}>
//           <b>{t.status}</b> – {t.message}<br />
//           <small>{new Date(t.time).toLocaleString()}</small>
//         </div>
//       ))}

//       <Link to="/">⬅ Back</Link>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const steps = ["Reported", "Assigned", "In Progress", "Completed", "Closed"];

export default function TrackComplaint() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f4f6f9",
      padding: "30px",
      display: "flex",
      justifyContent: "center"
    },
    card: {
      width: "600px",
      background: "white",
      padding: "25px",
      border: "1px solid #ccc"
    },
    step: active => ({
      padding: "6px 12px",
      margin: "4px",
      display: "inline-block",
      background: active ? "#d1fae5" : "#eee",
      border: "1px solid #999",
      fontSize: "13px"
    }),
    timelineBox: {
      border: "1px solid #aaa",
      padding: "10px",
      marginBottom: "10px",
      background: "#fafafa"
    },
    back: {
      display: "inline-block",
      marginTop: "15px",
      textDecoration: "none"
    }
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/complaints/${id}`)
      .then(res => res.json())
      .then(data => setComplaint(data));
  }, [id]);

  if (!complaint) return <p>Loading...</p>;

  const currentStep = steps.indexOf(complaint.status);

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h2>Complaint Tracking</h2>

        <h3>{complaint.title}</h3>
        <p>Status: {complaint.status}</p>

        {steps.map((s, i) => (
          <span key={s} style={styles.step(i <= currentStep)}>
            {s}
          </span>
        ))}

        <h4 style={{ marginTop: 20 }}>Timeline</h4>

        {complaint.statusHistory.map((t, i) => (
          <div key={i} style={styles.timelineBox}>
            <b>{t.status}</b> – {t.message}<br />
            <small>{new Date(t.time).toLocaleString()}</small>
          </div>
        ))}

        <Link style={styles.back} to="/">⬅ Back</Link>

      </div>

    </div>
  );
}

