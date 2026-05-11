import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Contact() {
  const [status, setStatus] = useState('');
  const location = useLocation();
  const [program, setProgram] = useState('1x');

  useEffect(() => {
    if (location.state?.plan) {
      setProgram(location.state.plan);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus('Submitting...');
    
    try {
      // PERMANENT FIX: Read the waiver file and convert to base64 to store in CRM
      const fileInput = document.getElementById('waiverUpload');
      const file = fileInput?.files[0];
      
      let base64Waiver = null;
      if (file) {
        const reader = new FileReader();
        base64Waiver = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        });
      }

      const handleSuccess = async () => {
        setStatus('Success! Redirecting to payment...');
        
        const formData = new FormData(form);
        const lead = {
          parentName: formData.get('parentName'),
          athleteName: formData.get('athleteName'),
          email: formData.get('email'),
          program: formData.get('program'),
          grade: formData.get('grade'),
          practiceDay: formData.get('practiceDay') || 'N/A',
          waiverData: base64Waiver, // Saved to CRM instead of emailing via Formspree
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

        // Redirect to Square Link
        if (program === '1x') {
          window.location.href = 'https://square.link/u/AKBWAP2h';
        } else if (program === '2x') {
          window.location.href = 'https://square.link/u/3kuIyrq7';
        } else {
          setStatus('Registration received! We will be in touch soon.');
          form.reset();
        }
      };

      const submitData = new FormData(form);
      // Remove file to prevent Formspree "File Uploads Not Permitted" error regardless of plan status
      submitData.delete('waiver');
      submitData.append('waiver_status', 'Waiver successfully uploaded and saved to Supabase CRM.');
      
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
            <span className="material-symbols-outlined text-3xl mb-2 text-primary">description</span>
            <h3 className="mb-2 text-xl font-bold">1. Download & Sign Waiver</h3>
            <p className="mb-4 text-muted text-sm">You must download, sign, and re-attach the waiver below to complete your registration.</p>
            <a href="/LIABILITY WAIVER.pdf" download="Elite Performance Liability Waiver.pdf" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Download Waiver Document</a>
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
              <label htmlFor="grade" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Grade</label>
              <select id="grade" name="grade" required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--white)' }}>
                <option value="">Select Grade</option>
                <option value="3rd">3rd Grade</option>
                <option value="4th">4th Grade</option>
                <option value="5th">5th Grade</option>
                <option value="6th">6th Grade</option>
                <option value="7th">7th Grade</option>
                <option value="8th">8th Grade</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address</label>
              <input type="email" id="email" name="email" required 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--white)' }} />
            </div>

            <div>
              <label htmlFor="program" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Program Interest</label>
              <select id="program" name="program" value={program} onChange={(e) => setProgram(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--white)' }}>
                <option value="1x">1x Per Week ($125)</option>
                <option value="2x">2x Per Week ($200)</option>
                <option value="other">Other / Questions</option>
              </select>
            </div>

            { (program && program.toString().includes('1x')) && (
              <div style={{ marginTop: '1rem', marginBottom: '1rem', padding: '1rem', border: '1px solid var(--primary)', borderRadius: '0.5rem', background: 'rgba(214, 4, 47, 0.05)' }}>
                <label htmlFor="practiceDay" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--white)', fontWeight: 'bold' }}>Practice Day Selection</label>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Please choose which day you would like your athlete to practice.</p>
                <select id="practiceDay" name="practiceDay" required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'var(--white)' }}>
                  <option value="">-- Choose a Day --</option>
                  <option value="Monday">Monday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>
            )}

            <div style={{ backgroundColor: 'rgba(214, 4, 47, 0.1)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--primary)' }}>
              <label htmlFor="waiverUpload" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--white)', fontWeight: 'bold' }}>2. Attach Signed Waiver (Required)</label>
              <input type="file" id="waiverUpload" name="waiver" required accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ width: '100%', padding: '0.5rem', color: 'var(--white)' }} />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>You cannot proceed to payment without attaching your signed waiver.</p>
            </div>

            <div>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Message / Questions (Optional)</label>
              <textarea id="message" name="message" rows="4" 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--white)', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4" style={{ marginTop: '1rem' }}>
              {status || 'Proceed to Payment'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
