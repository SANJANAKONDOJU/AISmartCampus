import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import Attendance from "./pages/Attendance";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RaiseComplaint from "./pages/RaiseComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import UploadMaterial from "./pages/UploadMaterial";
import StudentMaterials from "./pages/StudentMaterials";


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/worker" element={<WorkerDashboard />} />
        <Route path="/raise-complaint" element={<RaiseComplaint />} />
        <Route path="/track-complaint/:id" element={<TrackComplaint />} />
        <Route path="/upload-material" element={<UploadMaterial />} />
        <Route path="/materials" element={<StudentMaterials />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
