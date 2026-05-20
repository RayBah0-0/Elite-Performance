import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['/Hero1.JPG', '/Hero2.JPG', '/Hero3.JPG', '/Hero4.JPG'];
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "What ages do you train?", a: "We specialize in training young athletes ages 7 and up, focusing on foundational mechanics through advanced athletic development." },
    { q: "Where are sessions held?", a: "Our sessions take place at 1300 Hilton Parma Corners Rd, Hilton, NY. We use high-quality facilities suited for athletic development." },
    { q: "How does pricing work?", a: "Training is a flat $80 per 60-minute session. We don't lock you into complex monthly subscriptions or memberships." },
    { q: "Is the liability waiver required?", a: "Yes, for the safety of all participants, a digital liability waiver must be signed during the registration process." }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <section className="hero">
        <div className="hero-slideshow">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`slide ${index === currentSlide ? 'active' : ''}`} 
              style={{ backgroundImage: `url('${slide}')` }}
            ></div>
          ))}
        </div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content container fade-in visible hero-split">
          <div className="hero-logo-container">
            <img src="/Logo.PNG" alt="Elite Performance Logo" className="animate-pulse" />
          </div>
          <div className="hero-text-container">
            <div className="hero-badges" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ background: 'rgba(214, 4, 47, 0.2)', border: '1px solid rgba(214, 4, 47, 0.5)', color: '#ff8a8a', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>warning</span> 
                5-WEEK PROGRAM SIGNUPS CLOSED. STANDARD SESSIONS AVAILABLE.
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
                <span className="badge"><span className="material-symbols-outlined">verified</span> USA Football Certified</span>
                <span className="badge"><span className="material-symbols-outlined">medical_services</span> CPR & AED Certified</span>
              </div>
            </div>
            <h1 className="hero-title">Build Faster, <span className="text-gradient">Stronger</span>, More <br/> Confident <span className="italic">Young Athletes</span></h1>
            <p className="hero-subtitle">Speed, strength, agility, and football-focused training for ages 7 and up — led by certified coaching in Hilton, NY.</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary btn-large">
                Reserve Your Spot Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link to="/schedule" className="btn btn-outline btn-large">
                View Schedule
                <span className="material-symbols-outlined">calendar_month</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-section py-section bg-dark">
        <div className="container trust-grid fade-in visible">
          <div className="trust-item"><span className="material-symbols-outlined trust-icon">verified_user</span><h4>USA Football Certified</h4></div>
          <div className="trust-item"><span className="material-symbols-outlined trust-icon">health_and_safety</span><h4>Heads Up Concussion Certified</h4></div>
          <div className="trust-item"><span className="material-symbols-outlined trust-icon">medical_services</span><h4>CPR & AED Certified</h4></div>
          <div className="trust-item"><span className="material-symbols-outlined trust-icon">group</span><h4>Structured Age-Based Training</h4></div>
          <div className="trust-item"><span className="material-symbols-outlined trust-icon">location_on</span><h4>Local Hilton, NY Program</h4></div>
        </div>
      </section>

      <section className="why-us-section py-section bg-image" style={{ backgroundImage: "linear-gradient(rgba(19, 19, 21, 0.9), rgba(19, 19, 21, 0.9)), url('/Main1.JPG')" }}>
        <div className="container fade-in visible">
          <div className="section-header text-center">
            <h2>Why Choose <span className="text-gradient">Elite Performance</span></h2>
          </div>
          <div className="why-us-grid">
            <div className="why-item" style={{ textAlign: 'left', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '2.5rem' }}>sports_score</span>
              <h3 className="font-bold text-white mb-2 text-xl">Not Just Another Camp</h3>
              <p className="text-slate-400 text-sm">We focus on foundational mechanics, speed, and agility that translate directly to on-field performance.</p>
            </div>
            <div className="why-item" style={{ textAlign: 'left', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '2.5rem' }}>model_training</span>
              <h3 className="font-bold text-white mb-2 text-xl">Expert Coaching</h3>
              <p className="text-slate-400 text-sm">USA Football and CPR certified coaching ensuring a safe, structured, and high-intensity environment.</p>
            </div>
            <div className="why-item" style={{ textAlign: 'left', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '2.5rem' }}>groups</span>
              <h3 className="font-bold text-white mb-2 text-xl">No Subscription Traps</h3>
              <p className="text-slate-400 text-sm">Pay per session at $80 flat. We believe in earning your business through results, not complex recurring contracts.</p>
            </div>
            <div className="why-item" style={{ textAlign: 'left', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '2.5rem' }}>psychology</span>
              <h3 className="font-bold text-white mb-2 text-xl">Building Confidence</h3>
              <p className="text-slate-400 text-sm">Beyond physical traits, we teach athletes how to handle adversity, compete, and lead by example.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="process-section py-section bg-darker">
        <div className="container fade-in visible">
          <div className="section-header">
            <h2>How It <span className="text-gradient">Works</span></h2>
          </div>
          <div className="process-steps" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="step"><div className="step-number">1</div><h3>Submit Registration</h3><p className="text-slate-400 text-xs mt-2 text-center max-w-[200px] mx-auto">Sign the digital waiver and submit your athlete's information online.</p></div>
            <div className="step-connector"></div>
            <div className="step"><div className="step-number">2</div><h3>Coach Coordination</h3><p className="text-slate-400 text-xs mt-2 text-center max-w-[200px] mx-auto">We personally reach out to confirm your spot for an upcoming Wednesday session.</p></div>
            <div className="step-connector"></div>
            <div className="step"><div className="step-number">3</div><h3>Show Up & Train</h3><p className="text-slate-400 text-xs mt-2 text-center max-w-[200px] mx-auto">Bring your best effort. Pay the $80 session fee. See the results.</p></div>
          </div>
        </div>
      </section>

      <section className="testimonials-section py-section bg-dark">
        <div className="container fade-in visible">
          <div className="section-header text-center">
            <h2>Athlete <span className="text-gradient">Results</span></h2>
            <p>Don't just take our word for it. Hear from parents and athletes in our program.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text italic">"[Parent Testimonial Placeholder: Insert real parent quote about speed and confidence improvements here.]"</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Local Parent</h4>
                  <p>Parent of Athlete</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text italic">"[Parent Testimonial Placeholder: Insert real parent quote about the quality of coaching and structure here.]"</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Local Parent</h4>
                  <p>Parent of Athlete</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text italic">"[Parent Testimonial Placeholder: Insert real parent quote about athletic results and on-field translation here.]"</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Local Parent</h4>
                  <p>Parent of Athlete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section py-section bg-darker">
        <div className="container fade-in visible">
          <div className="section-header text-center">
            <h2>Frequently Asked <span className="text-gradient">Questions</span></h2>
          </div>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  {faq.q}
                  <span className="material-symbols-outlined" style={{ transform: activeFaq === index ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                    expand_more
                  </span>
                </button>
                {activeFaq === index && (
                  <div className="faq-answer fade-in visible" style={{ paddingTop: '0' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta-section py-section bg-primary text-center" style={{ backgroundImage: "linear-gradient(rgba(214, 4, 47, 0.9), rgba(150, 2, 30, 0.95)), url('/Main2.JPG')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className="container fade-in visible">
          <h2 className="font-display text-white text-5xl font-black italic uppercase tracking-tight mb-4">Ready to Get Your Athlete Ahead?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Spots are limited — once groups fill, registration closes.</p>
          <Link to="/contact" className="btn btn-white btn-large shadow-glow transform hover:-translate-y-1 transition-all">Sign Up Now</Link>
        </div>
      </section>
    </>
  );
}
