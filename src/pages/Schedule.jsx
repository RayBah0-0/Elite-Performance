import { Link } from 'react-router-dom';

export default function Schedule() {
  return (
    <section className="schedule-section py-section bg-dark min-h-screen">
      <div className="container fade-in visible">
        <div className="schedule-header" style={{ marginBottom: '3rem' }}>
          <div className="section-header no-margin text-left">
            <h2>Training <span className="text-gradient">Schedule</span></h2>
            <p className="location-text" style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
              <span className="material-symbols-outlined text-primary">location_on</span>
              1300 Hilton Parma Corners Rd, Hilton, NY
            </p>
          </div>
        </div>

        <div className="schedule-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '600px', margin: '0 auto' }}>
          <div className="schedule-card border-top-primary" style={{ marginBottom: '1.5rem' }}>
            <div className="day-bg-text">WED</div>
            <h3 className="schedule-day-title">Wednesday Sessions</h3>
            <div className="schedule-rows stagger-animate visible">
              <div className="schedule-row" style={{ justifyContent: 'center' }}>
                <div className="schedule-time text-primary">4:30 PM – 8:00 PM</div>
              </div>
            </div>
          </div>

          <div className="schedule-card border-top-secondary">
            <div className="day-bg-text">SAT</div>
            <h3 className="schedule-day-title">Optional Saturday Availability</h3>
            <div className="schedule-rows stagger-animate visible">
              <div className="schedule-row" style={{ justifyContent: 'center' }}>
                <div className="schedule-time text-primary">8:00 AM – 12:00 PM</div>
              </div>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm mt-6 text-center italic">
            Exact training times coordinated after signup confirmation.
          </p>
        </div>
        
        <div className="text-center mt-12">
            <Link to="/contact" className="btn btn-primary btn-large">Reserve Your Spot</Link>
        </div>
      </div>
    </section>
  );
}
