import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo">
          <img src="/Logo.PNG" alt="Elite Performance" className="h-16 w-auto" />
        </div>
        <nav className="footer-nav">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
        <p className="copyright text-muted text-sm uppercase tracking-widest text-center mt-6">
          © 2024 <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Elite Performance Sports Training</Link>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
