import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyle = {
    background: isScrolled ? 'rgba(14, 14, 16, 0.95)' : 'rgba(14, 14, 16, 0.85)',
    boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none'
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header" style={headerStyle}>
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/Logo.PNG" alt="Elite Performance Logo" className="logo-img" />
          <span className="logo-text text-gradient">ELITE PERFORMANCE</span>
        </Link>
        <nav className="nav-links">
          <Link to="/training" style={{ color: isActive('/training') ? 'var(--primary)' : '' }}>Training</Link>
          <Link to="/schedule" style={{ color: isActive('/schedule') ? 'var(--primary)' : '' }}>Schedule</Link>
          <Link to="/pricing" style={{ color: isActive('/pricing') ? 'var(--primary)' : '' }}>Pricing</Link>
          <Link to="/gallery" style={{ color: isActive('/gallery') ? 'var(--primary)' : '' }}>Gallery</Link>
          <Link to="/contact" style={{ color: isActive('/contact') ? 'var(--primary)' : '' }}>Contact</Link>
        </nav>
        <Link to="/contact" className="btn btn-primary header-btn">Reserve Your Spot</Link>
        <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      
      {mobileMenuOpen && (
        <div className="mobile-nav active">
          <Link to="/training" onClick={() => setMobileMenuOpen(false)}>Training</Link>
          <Link to="/schedule" onClick={() => setMobileMenuOpen(false)}>Schedule</Link>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Link to="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link to="/contact" className="btn btn-primary w-full text-center" onClick={() => setMobileMenuOpen(false)}>Reserve Your Spot</Link>
        </div>
      )}
    </header>
  );
}
