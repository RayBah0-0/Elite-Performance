import { Link } from 'react-router-dom';

export default function Schedule() {
  return (
    <section className="schedule-section py-section bg-dark min-h-screen">
      <div className="container fade-in visible">
        <div className="schedule-header" style={{ marginBottom: '3rem' }}>
          <div className="section-header no-margin text-left">
            <h2>Training <span className="text-gradient">Schedule</span></h2>
            <div style={{ backgroundColor: 'rgba(0, 51, 160, 0.2)', border: '1px solid var(--secondary)', padding: '0.75rem 1.25rem', borderRadius: '0.5rem', margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--white)', fontWeight: 'bold', width: 'fit-content' }}>
              <span className="material-symbols-outlined text-secondary" style={{ fontSize: '1.25rem' }}>event</span>
              <span style={{ fontSize: '0.9rem' }}>May 18, 2026 – June 20, 2026</span>
            </div>
            <p className="location-text" style={{ marginBottom: '1.5rem' }}>
              <span className="material-symbols-outlined text-primary">location_on</span>
              1300 Hilton Parma Corners Rd, Hilton, NY
            </p>
            <div className="enrolling-badge pulse-badge" style={{ display: 'inline-block' }}>
              Now Enrolling!
            </div>
          </div>
        </div>

        <div className="schedule-grid">
          <div className="schedule-card border-top-primary">
            <div className="day-bg-text">MON</div>
            <h3 className="schedule-day-title">Monday Sessions</h3>
            <div className="schedule-rows stagger-animate visible">
              <div className="schedule-row">
                <div className="schedule-info"><h4>3rd & 4th Grade</h4></div>
                <div className="schedule-time text-primary">4:30 – 5:30 PM</div>
              </div>
              <div className="schedule-row">
                <div className="schedule-info"><h4>5th & 6th Grade</h4></div>
                <div className="schedule-time text-primary">5:30 – 6:30 PM</div>
              </div>
              <div className="schedule-row">
                <div className="schedule-info"><h4>7th & 8th Grade</h4></div>
                <div className="schedule-time text-primary">6:30 – 7:30 PM</div>
              </div>
            </div>
          </div>

          <div className="schedule-card border-top-secondary">
            <div className="day-bg-text">SAT</div>
            <h3 className="schedule-day-title">Saturday Sessions</h3>
            <div className="schedule-rows stagger-animate visible">
              <div className="schedule-row">
                <div className="schedule-info"><h4>3rd & 4th Grade</h4></div>
                <div className="schedule-time text-secondary">8:00 – 9:00 AM</div>
              </div>
              <div className="schedule-row">
                <div className="schedule-info"><h4>5th & 6th Grade</h4></div>
                <div className="schedule-time text-secondary">9:00 – 10:00 AM</div>
              </div>
              <div className="schedule-row">
                <div className="schedule-info"><h4>7th & 8th Grade</h4></div>
                <div className="schedule-time text-secondary">10:00 – 11:00 AM</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
            <Link to="/contact" className="btn btn-primary btn-large">Reserve Your Spot</Link>
        </div>
      </div>
    </section>
  );
}
