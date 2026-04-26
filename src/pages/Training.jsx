import { Link } from 'react-router-dom';

export default function Training() {
  return (
    <section className="services-section py-section bg-darker min-h-screen">
      <div className="container fade-in visible">
        <div className="section-header">
          <h2>Our <span className="text-gradient">Programs</span></h2>
          <p>Comprehensive training designed to develop foundational athletic skills and sport-specific techniques.</p>
        </div>
        <div className="services-grid">
          <div className="service-card group-hover">
            <div className="service-icon"><span className="material-symbols-outlined">bolt</span></div>
            <h3>Youth Performance Training</h3>
            <ul className="service-list">
              <li><span className="material-symbols-outlined">check_circle</span> Speed & agility development</li>
              <li><span className="material-symbols-outlined">check_circle</span> Strength fundamentals</li>
              <li><span className="material-symbols-outlined">check_circle</span> Athletic movement training</li>
            </ul>
          </div>
          <div className="service-card group-hover">
            <div className="service-icon"><span className="material-symbols-outlined">sports_football</span></div>
            <h3>Football Skills Training</h3>
            <ul className="service-list">
              <li><span className="material-symbols-outlined">check_circle</span> Position-specific training</li>
              <li><span className="material-symbols-outlined">check_circle</span> 1-on-1 or small group sessions</li>
              <li><span className="material-symbols-outlined">check_circle</span> Skill development for serious athletes</li>
            </ul>
          </div>
          <div className="service-card group-hover">
            <div className="service-icon"><span className="material-symbols-outlined">groups</span></div>
            <h3>Group Training Sessions</h3>
            <ul className="service-list">
              <li><span className="material-symbols-outlined">check_circle</span> Age-based structured groups</li>
              <li><span className="material-symbols-outlined">check_circle</span> High-energy sessions</li>
              <li><span className="material-symbols-outlined">check_circle</span> Max 24 athletes per group</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-12">
            <Link to="/contact" className="btn btn-primary btn-large">Reserve Your Spot</Link>
        </div>
      </div>
    </section>
  );
}
