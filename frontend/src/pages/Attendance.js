// // import React, { useEffect } from "react";
// // import { startCamera, stopCamera } from "../camera";   // IMPORTANT

// // function Attendance() {

// //   useEffect(() => {
// //     // Auto close camera when leaving page
// //     return () => stopCamera();
// //   }, []);

// //   return (
// //     <div>

// //       <h2>Attendance</h2>

// //       <button onClick={startCamera}>Open Camera</button>

// //       <button onClick={stopCamera}>Close Camera</button>

// //     </div>
// //   );
// // }

// // export default Attendance;
// export default function Attendance() {
//   return (
//     <div>
//       <h2>Attendance Page</h2>
//       <p>Attendance is handled via Faculty Dashboard AI</p>
//     </div>
//   );
// }
export default function Attendance() {
  return (
    <>
      <div className="attendance-container">

        <h1>Smart Attendance</h1>
        <p className="attendance-sub">
          AI powered face recognition attendance system
        </p>

        <div className="attendance-info">
  ℹ️ This page is for demonstration only. Actual attendance is managed by faculty through secure dashboard access.
      </div>    

        <div className="attendance-box">
          <div className="camera-placeholder">
            Camera Preview
          </div>

          <button className="attendance-btn">
            Start Attendance
          </button>

          <p className="attendance-status">
            Waiting for camera...
          </p>
        </div>

      </div>

      <footer className="footer">
        <p>© 2026 MVSR Smart Campus. All Rights Reserved.</p>
        <div className="footer-links">
          <span>Home</span>
          <span>Dashboard</span>
          <span>Contact</span>
        </div>
      </footer>
    </>
  );
}
