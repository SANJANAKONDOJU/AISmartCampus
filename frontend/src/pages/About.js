export default function About() {
  return (
  <>
    <div className="about-container">

      <h1>About MVSR AI Smart Campus</h1>
      <p className="about-sub">
        A unified intelligent platform transforming campus operations through automation and AI.
      </p>

      <div className="about-section">
        <div className="about-card">
          <h3>🚨 Problem</h3>
          <p>
            Colleges still rely on fragmented systems for attendance, complaints,
            academics and student services — leading to inefficiency, delays and poor coordination.
          </p>
        </div>

        <div className="about-card">
          <h3>💡 Our Solution</h3>
          <p>
            MVSR AI Smart Campus integrates everything into one centralized platform
            with AI-powered attendance, dashboards and smart workflows.
          </p>
        </div>
      </div>

      <h2>Main Features</h2>

      <div className="features-grid">
        <div className="feature">🎯 Face Recognition Attendance</div>
        <div className="feature">🛠 Complaint Management</div>
        <div className="feature">📚 Academic Materials</div>
        <div className="feature">🔐 Secure Login System</div>
        <div className="feature">⚡ Real Time Updates</div>
      </div>

    </div>

    {/* FOOTER SAME AS CONTACT */}
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
