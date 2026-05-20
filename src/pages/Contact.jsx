import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Contact() {
  const [status, setStatus] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when loading
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus('Submitting...');
    
    try {
      const isAgreed = form.waiverAgreed.checked;
      const signature = form.waiverSignature.value;

      if (!isAgreed || !signature.trim()) {
        setStatus('Error: Please sign the digital waiver to proceed.');
        return;
      }

      const timestamp = new Date().toLocaleString();
      const digitalWaiverString = `Digitally signed by: ${signature} on ${timestamp}. Agreement confirmed via checkbox.`;

      const handleSuccess = async () => {
        setStatus('Success! Redirecting to payment...');
        
        const formData = new FormData(form);
        const lead = {
          parentName: formData.get('parentName'),
          athleteName: formData.get('athleteName'),
          email: formData.get('email'),
          program: 'Training Session ($80)',
          grade: formData.get('grade') || 'Ages 7+',
          practiceDay: 'Wednesday',
          waiverData: digitalWaiverString,
          status: 'New'
        };
        
        // Save lead to Supabase CRM
        const { error: supabaseError } = await supabase.from('leads').insert([lead]);
        if (supabaseError) {
          console.error("Error saving lead to Supabase:", supabaseError);
          // Fallback to local storage if supabase fails
          const existingLeads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
          localStorage.setItem('crm_leads', JSON.stringify([...existingLeads, { ...lead, id: Date.now(), date: new Date().toISOString() }]));
        }

        // Manual coordination requested by owner
        setStatus('Registration received! We will be in touch soon to confirm your time block.');
        form.reset();
      };

      const submitData = new FormData(form);
      // Remove sensitive signature data from Formspree payload if desired, or keep it. We will just append the status.
      submitData.append('waiver_status', digitalWaiverString);
      
      const response = await fetch(form.action, {
        method: form.method,
        body: submitData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        handleSuccess();
      } else {
        const data = await response.json().catch(() => ({}));
        const errorMessage = data.errors ? data.errors.map(err => err.message).join(', ') : 'Oops! There was a problem submitting your form';
        setStatus(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      setStatus('Oops! There was a problem submitting your form');
    }
  };

  return (
    <section className="contact-section py-section bg-darker min-h-screen" style={{ backgroundImage: "linear-gradient(rgba(14, 14, 16, 0.95), rgba(14, 14, 16, 0.95)), url('/Main2.JPG')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container fade-in visible">
        <div className="section-header text-center mb-8">
          <h2>Reserve Your <span className="text-gradient">Spot</span></h2>
          <p>Get in touch with us to secure your athlete's spot in our upcoming sessions.</p>
        </div>

        <div className="max-w-2xl mx-auto bg-card border border-white/10 p-8 rounded-xl shadow-2xl" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '1rem', padding: '2rem' }}>
          
          <div className="waiver-card mb-8 text-center" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
            <span className="material-symbols-outlined text-3xl mb-2 text-primary">sports_gymnastics</span>
            <h3 className="mb-2 text-xl font-bold">Year-Round Training</h3>
            <p className="mb-4 text-muted text-sm">Wednesday Sessions (4:30 PM – 8:00 PM) for Ages 7 and Up.</p>
            <p className="text-emerald-400 font-bold">$80 / 60-Minute Session</p>
          </div>

          <form 
            action="https://formspree.io/f/meevdwyl" 
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label htmlFor="parentName" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Parent/Guardian Name</label>
              <input type="text" id="parentName" name="parentName" required 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--white)' }} />
            </div>

            <div>
              <label htmlFor="athleteName" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Athlete Name</label>
              <input type="text" id="athleteName" name="athleteName" required 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--white)' }} />
            </div>

            <div>
              <label htmlFor="grade" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Athlete Age</label>
              <input type="number" id="grade" name="grade" min="7" placeholder="Ages 7 and Up" required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--white)' }} />
            </div>

            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address</label>
              <input type="email" id="email" name="email" required 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--white)' }} />
            </div>

            <div style={{ backgroundColor: 'rgba(214, 4, 47, 0.05)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid var(--primary)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--white)', fontWeight: 'bold' }}>
                <span className="material-symbols-outlined text-primary">draw</span>
                Digital Liability Waiver
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                By signing below, I acknowledge and agree to the Elite Performance liability and safety terms for my athlete to participate in training sessions.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
                <input type="checkbox" id="waiverAgreed" name="waiverAgreed" required style={{ marginTop: '0.25rem', width: '1.25rem', height: '1.25rem', accentColor: 'var(--primary)' }} />
                <label htmlFor="waiverAgreed" style={{ fontSize: '0.9rem', color: 'var(--white)', cursor: 'pointer' }}>
                  I am the legal parent/guardian and I agree to the liability waiver.
                </label>
              </div>

              <div>
                <label htmlFor="waiverSignature" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Type Full Name as Electronic Signature</label>
                <input type="text" id="waiverSignature" name="waiverSignature" placeholder="John Doe" required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'var(--white)', fontFamily: 'monospace' }} />
              </div>
            </div>

            <div>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Message / Questions (Optional)</label>
              <textarea id="message" name="message" rows="4" 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--white)', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4" style={{ marginTop: '1rem' }}>
              {status || 'Submit Registration'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
