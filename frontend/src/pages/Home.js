// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <nav>
//         <button onClick={() => navigate("/")}>Home</button>
//         <button onClick={() => navigate("/about")}>About</button>
//         <button onClick={() => navigate("/attendance")}>Attendance</button>
//         <button onClick={() => navigate("/contact")}>Contact</button>
//         <button onClick={() => navigate("/login")}>Login</button>
//       </nav>

//       <h1>Welcome to MVSR AI Smart Campus</h1>
//     </div>
//   );
// }
export default function Home() {
  return (
    <div
      className="hero"
      style={{ backgroundImage: "url('/mvsr.jpg')" }}
    >
      <div className="overlay">
        <div className="hero-content">
          <h1>MVSR AI Smart Campus</h1>
          <p>Transforming Campus Life with Intelligence & Innovation</p>
        </div>
      </div>
    </div>
  );
}