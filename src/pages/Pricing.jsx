import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <section className="pricing-section py-section bg-darker min-h-screen">
      <div className="container fade-in visible">
        <div className="section-header text-center">
          <h2>Simple <span className="text-gradient">Pricing</span></h2>
          <p>Year-round athletic development. Limited group sizes.</p>
        </div>
        <div className="pricing-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '400px', margin: '0 auto' }}>
          <div className="pricing-card popular">
            <div className="popular-badge">Year-Round Training</div>
            <div className="pricing-header">
              <h3>Training Session</h3>
              <div className="price"><span>$</span>80</div>
              <p className="pricing-desc">60 Minute Session</p>
            </div>
            <ul className="pricing-features mb-6 text-left text-slate-300 text-sm space-y-3">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> Ages 7 and Up</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> Elite Coaching</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> Speed & Agility Focus</li>
            </ul>
            <Link to="/contact" className="btn btn-primary w-full">Start Training Today</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
