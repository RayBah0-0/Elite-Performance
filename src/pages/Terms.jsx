import React from 'react';

export default function Terms() {
  return (
    <div className="legal-page py-section min-h-screen bg-dark">
      <div className="container max-w-4xl">
        <h1 className="text-4xl mb-8">Terms of <span className="text-gradient">Service</span></h1>
        
        <div className="legal-content text-slate-300 space-y-6 text-lg leading-relaxed">
          <p className="text-sm italic text-slate-500 mb-8">Last Updated: April 25, 2024</p>
          
          <section>
            <h2 className="text-white text-2xl mb-4 italic">1. Acceptance of Terms</h2>
            <p>
              By accessing our website or registering for any program at Elite Performance Sports Training, you agree to comply with and be bound by the following terms and conditions. These terms apply to all visitors, users, athletes, and parents/guardians.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl mb-4 italic">2. Program Registration</h2>
            <p>
              Registration is on a first-come, first-served basis. Groups are limited to 24 athletes to ensure high-quality coaching and safety. We reserve the right to close registration once a group has reached maximum capacity.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl mb-4 italic">3. Liability Waiver</h2>
            <p>
              A signed Liability Waiver is mandatory for every athlete before participating in any training session. No athlete will be permitted to train without a completed waiver on file. This waiver must be signed by a parent or legal guardian for athletes under the age of 18.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl mb-4 italic">4. Code of Conduct</h2>
            <p>
              Elite Performance maintains a high-standard, high-energy environment. We expect all athletes to show respect to coaches, staff, and fellow athletes. Any behavior deemed disruptive or disrespectful may result in immediate dismissal from the program without refund.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl mb-4 italic">5. Payment and Refunds</h2>
            <p>
              Full payment is required to secure an athlete's spot in a program. Due to limited group sizes, we have a strict no-refund policy for missed sessions or mid-program withdrawals. Credits may be issued at the discretion of the coaching staff in the event of injury or medical necessity.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl mb-4 italic">6. Location and Governance</h2>
            <p>
              All training takes place at 1300 Hilton Parma Corners Rd, Hilton, NY. These terms are governed by the laws of the State of New York.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl mb-4 italic">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Significant changes will be communicated via email to registered participants or posted clearly on our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
