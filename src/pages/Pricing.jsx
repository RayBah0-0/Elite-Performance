import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <section className="pricing-section py-section bg-darker min-h-screen">
      <div className="container fade-in visible">
        <div className="section-header text-center">
          <h2>Simple <span className="text-gradient">Pricing</span></h2>
          <p>Year-round athletic development. Limited group sizes.</p>
        </div>
        <div className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Program 1 */}
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>1-on-1 Football Training</h3>
              <div className="price"><span>$</span>50</div>
              <p className="pricing-desc">45 Minute Session</p>
            </div>
            <ul className="pricing-features mb-6 text-left text-slate-300 text-sm space-y-3">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> 1 Athlete</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> Personalized Focus</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> At Your Home or Park</li>
            </ul>
            <Link to="/contact" className="btn btn-outline w-full">Select Program</Link>
          </div>

          {/* Program 2 */}
          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <div className="pricing-header">
              <h3>2-on-1 Football Training</h3>
              <div className="price"><span>$</span>80</div>
              <p className="pricing-desc">50 Minute Session</p>
            </div>
            <ul className="pricing-features mb-6 text-left text-slate-300 text-sm space-y-3">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> 2 Athletes ($40/each)</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> Competitive Environment</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> At Your Home or Park</li>
            </ul>
            <Link to="/contact" state={{ selectedProgram: '2-on-1 Football Training (50min) - $80' }} className="btn btn-primary w-full">Select Program</Link>
          </div>

          {/* Program 3 */}
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Small Group Football</h3>
              <div className="price"><span>$</span>120</div>
              <p className="pricing-desc">60 Minute Session</p>
            </div>
            <ul className="pricing-features mb-6 text-left text-slate-300 text-sm space-y-3">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> 3-4 Athletes</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> Team Dynamics</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> At Your Home or Park</li>
            </ul>
            <Link to="/contact" className="btn btn-outline w-full">Select Program</Link>
          </div>

          {/* Program 4 */}
          <div className="pricing-card">
            <div className="pricing-header" style={{ minHeight: '120px' }}>
              <h3 style={{ fontSize: '1.25rem', lineHeight: '1.2' }}>Strength, Agility, Speed</h3>
              <div className="price" style={{ fontSize: '2.5rem' }}><span>$</span>30<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/kid</span></div>
              <p className="pricing-desc">45 Minute Session (2-4 Kids)</p>
            </div>
            <ul className="pricing-features mb-6 text-left text-slate-300 text-sm space-y-3">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> 2 Kids: $60 Total</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> 4 Kids: $80 Total</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span> At Your Home or Park</li>
            </ul>
            <Link to="/contact" className="btn btn-outline w-full">Select Program</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
