import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <section className="pricing-section py-section bg-darker min-h-screen">
      <div className="container fade-in visible">
        <div className="section-header text-center">
          <h2>Simple <span className="text-gradient">Pricing</span></h2>
          <p>Limited to 24 athletes per group. Secure your spot today.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <div className="pricing-header">
              <h3>1x Per Week</h3>
              <div className="price"><span>$</span>125</div>
              <p className="pricing-desc">5 Week Program</p>
            </div>
            <Link to="/contact" state={{ plan: '1x' }} className="btn btn-primary w-full">Select Plan</Link>
          </div>
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>2x Per Week</h3>
              <div className="price"><span>$</span>200</div>
              <p className="pricing-desc">5 Week Program</p>
            </div>
            <Link to="/contact" state={{ plan: '2x' }} className="btn btn-outline w-full">Select Plan</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
