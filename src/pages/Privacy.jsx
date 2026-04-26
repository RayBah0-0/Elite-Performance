import React from 'react';

export default function Privacy() {
  return (
    <div className="legal-page py-section min-h-screen bg-dark">
      <div className="container max-w-4xl">
        <h1 className="text-4xl mb-8">Privacy <span className="text-gradient">Policy</span></h1>
        
        <div className="legal-content text-slate-300 space-y-6 text-lg leading-relaxed">
          <p className="text-sm italic text-slate-500 mb-8">Last Updated: April 25, 2024</p>
          
          <section>
            <h2 className="text-white text-2xl mb-4 italic">1. Introduction</h2>
            <p>
              Welcome to Elite Performance Sports Training. We value your privacy and are committed to protecting the personal information of our athletes and their families. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website and register for our programs.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl mb-4 italic">2. Information We Collect</h2>
            <p>We collect information necessary to provide professional sports training services, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Parent/Guardian Information:</strong> Name, email address, and contact details.</li>
              <li><strong>Athlete Information:</strong> Name, grade level, and specific training interests.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, collected via standard web analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-2xl mb-4 italic">3. How We Use Your Information</h2>
            <p>Your data is used specifically for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Processing program registrations and managing training rosters.</li>
              <li>Communicating schedule changes, weather alerts, and program updates.</li>
              <li>Improving our training programs and website experience.</li>
              <li>Maintaining safety and eligibility records for our athletes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-2xl mb-4 italic">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information. Our website uses secure data handling through services like Supabase and Formspree to ensure your registration details are handled with the highest level of care.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl mb-4 italic">5. Third-Party Services</h2>
            <p>
              We may use third-party services to assist in our operations. These services are only provided with the information necessary to perform their specific functions (e.g., email delivery or database management) and are required to maintain the confidentiality of your data.
            </p>
          </section>

          <section>
            <h2 className="text-white text-2xl mb-4 italic">6. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact us through our website contact form or visit us at our training location in Hilton, NY.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
