import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['/public/Hero1.JPG', '/public/Hero2.JPG', '/public/Hero3.JPG', '/public/Hero4.JPG'];
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "What ages do you train?", a: "We specialize in training young athletes ages 7–14, grouped by grade level (3rd-4th, 5th-6th, and 7th-8th)." },
    { q: "Where are sessions held?", a: "Our sessions take place at 1300 Hilton Parma Corners Rd, Hilton, NY. We use high-quality facilities suited for athletic development." },
    { q: "What should my athlete bring?", a: "Athletes should bring plenty of water, comfortable athletic wear, and cleats or sneakers depending on the session type." },
    { q: "Is the liability waiver required?", a: "Yes, for the safety of all participants, a signed liability waiver must be submitted before the first session begins." }
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
            <img src="/public/Logo.PNG" alt="Elite Performance Logo" className="animate-pulse" />
          </div>
          <div className="hero-text-container">
            <div className="hero-badges">
              <span className="badge"><span className="material-symbols-outlined">verified</span> USA Football Certified</span>
              <span className="badge"><span className="material-symbols-outlined">medical_services</span> CPR & AED Certified</span>
              <span className="badge pulse-badge"><span className="material-symbols-outlined">timer</span> Limited Spots Available</span>
            </div>
            <h1 className="hero-title">Build Faster, <span className="text-gradient">Stronger</span>, More <br/> Confident <span className="italic">Young Athletes</span></h1>
            <p className="hero-subtitle">Speed, strength, and football-focused training for ages 7–14 — led by certified coaching in Hilton, NY.</p>
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

      <section className="why-us-section py-section bg-image" style={{ backgroundImage: "linear-gradient(rgba(19, 19, 21, 0.9), rgba(19, 19, 21, 0.9)), url('/public/Main1.JPG')" }}>
        <div className="container fade-in visible">
          <div className="section-header text-center">
            <h2>Why Choose <span className="text-gradient">Elite Performance</span></h2>
          </div>
          <div className="why-us-grid">
            <div className="why-item"><h3 className="font-bold text-white">Not Just Another Camp</h3></div>
            <div className="why-item"><h3 className="font-bold text-white">Built for Real Results</h3></div>
            <div className="why-item"><h3 className="font-bold text-white">Age-Specific Training</h3></div>
            <div className="why-item"><h3 className="font-bold text-white">Limited Spots = More Attention</h3></div>
          </div>
        </div>
      </section>

      <section className="process-section py-section bg-darker">
        <div className="container fade-in visible">
          <div className="section-header">
            <h2>How It <span className="text-gradient">Works</span></h2>
          </div>
          <div className="process-steps">
            <div className="step"><div className="step-number">1</div><h3>Choose Your Program</h3></div>
            <div className="step-connector"></div>
            <div className="step"><div className="step-number">2</div><h3>Register Your Athlete</h3></div>
            <div className="step-connector"></div>
            <div className="step"><div className="step-number">3</div><h3>Show Up & Train</h3></div>
            <div className="step-connector"></div>
            <div className="step"><div className="step-number">4</div><h3>See Real Results</h3></div>
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
              <p className="testimonial-text">"My son's confidence on the field has skyrocketed. The coaches are professional and the drills are exactly what he needed to get to the next level."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Karey</h4>
                  <p>Parent of 5th Grade Athlete</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"The group atmosphere is amazing. My daughter has gotten noticeably faster and stronger in just a few weeks of sessions."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Isaiah</h4>
                  <p>Parent of 7th Grade Athlete</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"Best sports training in the Hilton area. Highly recommend for any young athlete looking to truly level up their game and athleticism."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Anonymous</h4>
                  <p>Parent of 3rd Grade Athlete</p>
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

      <section className="final-cta-section py-section bg-primary text-center" style={{ backgroundImage: "linear-gradient(rgba(214, 4, 47, 0.9), rgba(150, 2, 30, 0.95)), url('/public/Main2.JPG')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className="container fade-in visible">
          <h2 className="font-display text-white text-5xl font-black italic uppercase tracking-tight mb-4">Ready to Get Your Athlete Ahead?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Spots are limited — once groups fill, registration closes.</p>
          <Link to="/contact" className="btn btn-white btn-large shadow-glow transform hover:-translate-y-1 transition-all">Sign Up Now</Link>
        </div>
      </section>
    </>
  );
}
