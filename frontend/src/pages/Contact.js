const team = [
  {
    name: "KONDOJU SANJANA",
    role: "Frontend & Backend",
    phone: "9640616186",
    email: "245123733165@mvsrec.edu.in",
  }
];

export default function Contact() {
  return (
  <>
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p className="contact-sub">
        For support, reporting issues, or updates — contact the team.
      </p>

      <div className="contact-grid">
        {team.map((member, index) => (
          <div key={index} className="contact-card">
            <div className="avatar">{member.name.charAt(0)}</div>

            <h3>{member.name}</h3>
            <span>{member.role}</span>

            <p>📞 {member.phone}</p>
            <p>✉️ {member.email}</p>
          </div>
        ))}
      </div>
    </div>

    {/* FOOTER STRIP */}
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