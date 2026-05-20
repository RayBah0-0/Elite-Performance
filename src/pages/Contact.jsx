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
          phone: formData.get('phone') || 'N/A',
          program: 'Training Session ($80)',
          grade: formData.get('grade') || 'Ages 7+',
          practiceDay: 'Wednesday',
          emergencyContact: formData.get('emergencyContact') || 'N/A',
          medicalInfo: formData.get('medicalInfo') || 'N/A',
          pickupAuth: formData.get('pickupAuth') || 'N/A',
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

            <div>
              <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Phone Number</label>
              <input type="tel" id="phone" name="phone" required placeholder="(555) 000-0000"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--white)' }} />
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--white)', fontWeight: 'bold' }}>
                <span className="material-symbols-outlined text-primary">health_and_safety</span>
                Medical & Emergency Info
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="emergencyContact" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Emergency Contact Name & Phone</label>
                <input type="text" id="emergencyContact" name="emergencyContact" required placeholder="Jane Doe - (555) 123-4567"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'var(--white)' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="medicalInfo" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Known Medical Conditions & Allergies (or type "None")</label>
                <textarea id="medicalInfo" name="medicalInfo" required rows="2" placeholder="Asthma, peanut allergy, etc."
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'var(--white)', resize: 'vertical' }}></textarea>
              </div>

              <div>
                <label htmlFor="pickupAuth" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Authorized Individuals for Pickup</label>
                <input type="text" id="pickupAuth" name="pickupAuth" required placeholder="John Doe, Jane Doe"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'var(--white)' }} />
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(214, 4, 47, 0.05)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid var(--primary)', marginTop: '0.5rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--white)', fontWeight: 'bold' }}>
                <span className="material-symbols-outlined text-primary">gavel</span>
                Liability Waiver & Agreement
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Please review the full terms. By signing below, you acknowledge and agree to Elite Performance's liability, safety, and operational terms.
              </p>
              
              <div className="waiver-scroll-container" style={{ 
                maxHeight: '280px', 
                overflowY: 'auto', 
                padding: '1.5rem', 
                background: 'rgba(0,0,0,0.5)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '0.5rem', 
                marginBottom: '1.5rem',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                lineHeight: '1.6',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
              }}>
                <h4 style={{ color: 'var(--white)', fontWeight: 'bold', marginBottom: '0.5rem' }}>ASSUMPTION OF RISK & PERMISSION</h4>
                <p style={{ marginBottom: '1.5rem' }}>I give permission for my child to participate and I knowingly assume all inherent risks associated with sports training and related activities, whether arising from my child's own actions, the actions of other participants or third parties, the use of equipment, environmental conditions, or conditions at third-party/rented facilities, to the fullest extent permitted by applicable law (including New York law, if applicable). I understand that injuries may occur even when safety rules are followed. If my child is injured, feels unwell, experiences concussion-like symptoms, or believes any activity or condition is unsafe, my child will stop participation and notify a coach immediately.</p>

                <h4 style={{ color: 'var(--white)', fontWeight: 'bold', marginBottom: '0.5rem' }}>PARTICIPANT RESPONSIBILITIES</h4>
                <ul style={{ paddingLeft: '1.2rem', marginBottom: '1.5rem', listStyleType: 'disc' }}>
                  <li>Follow all coaching instructions, posted facility rules, and safety rules (including warm-up, hydration, and return-to-play directions).</li>
                  <li>Use equipment only as instructed and only for its intended purpose; report damaged equipment immediately.</li>
                  <li>Immediately report injuries, pain, dizziness, concussion-like symptoms, breathing difficulty, or any unsafe condition.</li>
                  <li>Treat coaches, staff, and other participants respectfully; no bullying, harassment, fighting, threats, or inappropriate language.</li>
                  <li>Arrive on time and be picked up on time.</li>
                </ul>

                <h4 style={{ color: 'var(--white)', fontWeight: 'bold', marginBottom: '0.5rem' }}>EMERGENCY MEDICAL AUTHORIZATION</h4>
                <p style={{ marginBottom: '1.5rem' }}>If I cannot be reached promptly in an emergency, I authorize the Company, its coaches, and staff to contact emergency services (911), and to obtain or authorize emergency evaluation, first aid, transportation (including ambulance), and medical or dental treatment for my child as deemed necessary by medical professionals. I accept full financial responsibility for all medical expenses incurred. Non-emergency treatment will not be authorized without my consent when I can be reached in time to make decisions.</p>

                <h4 style={{ color: 'var(--white)', fontWeight: 'bold', marginBottom: '0.5rem' }}>RELEASE / LIMITATION OF LIABILITY (NEW YORK)</h4>
                <p style={{ marginBottom: '0.5rem' }}>In consideration of being allowed to participate in the program, I (on behalf of myself and my child) agree as follows, to the fullest extent allowed by applicable law:</p>
                <ol style={{ paddingLeft: '1.2rem', marginBottom: '1.5rem', listStyleType: 'decimal' }}>
                  <li style={{ marginBottom: '0.25rem' }}>I will not make a claim against, sue, or seek to hold liable the Company and its owners, officers, employees, contractors/coaches, volunteers, agents, and any facility owners/operators where training occurs (collectively, the "Releasees") for ordinary negligence arising out of the inherent risks of sports training and related activities.</li>
                  <li style={{ marginBottom: '0.25rem' }}>I understand that New York General Obligations Law § 5-326 may render some liability releases void and unenforceable when a fee is paid for use of certain recreational facilities; therefore, this agreement is intended primarily as an assumption-of-risk and informed-consent acknowledgment and shall be enforced only to the extent permitted by New York law.</li>
                  <li style={{ marginBottom: '0.25rem' }}>Nothing in this agreement releases or limits liability for gross negligence, reckless or intentional misconduct, or any other liability that cannot be waived under law.</li>
                </ol>

                <h4 style={{ color: 'var(--white)', fontWeight: 'bold', marginBottom: '0.5rem' }}>THIRD-PARTY FACILITIES / RENTED LOCATIONS</h4>
                <p style={{ marginBottom: '1.5rem' }}>I understand that training sessions may be held at facilities owned or operated by third parties (for example, schools, parks, gyms, or rented fields). The Company does not own or control these locations and may have limited ability to inspect, repair, or modify the premises. To the fullest extent permitted by law, I assume the risks associated with the condition of any third-party premises.</p>

                <h4 style={{ color: 'var(--white)', fontWeight: 'bold', marginBottom: '0.5rem' }}>PHOTO & MEDIA RELEASE</h4>
                <p style={{ marginBottom: '1.5rem' }}>I grant permission for the Company to photograph, audio record, and/or video record my child during activities, and to use my child's image/likeness for the Company's promotional and informational purposes (including social media, website, and print materials). I understand my child's name will not be used unless I provide separate written permission.</p>

                <h4 style={{ color: 'var(--white)', fontWeight: 'bold', marginBottom: '0.5rem' }}>PAYMENT & ATTENDANCE POLICY</h4>
                <p style={{ marginBottom: '1.5rem' }}>Refunds: All fees are due in advance, and fees are non-refundable once a session/package/program is purchased. Participant cancellations / no-shows: If the participant does not attend a scheduled session (including late arrival that prevents meaningful participation), the session will be treated as used and no refund will be provided. Cancellations: If the session cancels due to weather, unsafe conditions, third-party facility closure/unavailability, or other circumstances outside the Company's reasonable control, you will receive a make-up session.</p>
              </div>
              
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
