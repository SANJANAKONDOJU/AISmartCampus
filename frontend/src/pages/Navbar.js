import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">MVSR Smart Campus</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
         <li>
          <a
            href="https://ai-course-chi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learning
          </a>
        </li>

        <li><Link to="/contact">Contact</Link></li>
      </ul>



      <Link to="/login">
        <button className="login-btn">Login</button>
      </Link>
    </nav>
  );
}

export default Navbar;
