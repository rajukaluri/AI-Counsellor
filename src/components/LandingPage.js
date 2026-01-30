import React from 'react';

const LandingPage = ({ onStart, onDemo }) => {
  // Function to handle the demo click
  const handleDemoClick = () => {
    const demoData = {
      fullName: "Alex Smith",
      major: "Computer Science",
      gpa: "8.0",
      targetCountry: "USA",
      budget: "45000",
      isDemo: true
    };
    // Call the parent function with the demo data
    onDemo(demoData);
  };

  return (
    <div className="landing-container fade-in" style={{ 
      textAlign: 'center', 
      padding: '100px 20px', 
      maxWidth: '900px', 
      margin: '0 auto' 
    }}>
      <div className="badge badge-target" style={{ marginBottom: '20px' }}>
        v2.0 AI Engine Active
      </div>
      
      <h1 className="text-gradient" style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1' }}>
        Your Journey to Global Education, <br /> Guided by AI.
      </h1>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', margin: '30px auto', maxWidth: '600px' }}>
        Analyze your profile, discover world-class universities, and track your application roadmap in one intelligent workspace.
      </p>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button className="btn-primary" onClick={onStart} style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
          Get Started
        </button>
        {/* Updated View Demo Button */}
        <button className="btn-outline" onClick={handleDemoClick} style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
          View Demo
        </button>
      </div>

      <div className="glass-card" style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-around', padding: '30px' }}>
        <div>
          <h3 className="text-gradient">500+</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Partnered Unis</p>
        </div>
        <div style={{ borderLeft: '1px solid var(--border-light)', height: '50px' }}></div>
        <div>
          <h3 className="text-gradient">98%</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Success Rate</p>
        </div>
        <div style={{ borderLeft: '1px solid var(--border-light)', height: '50px' }}></div>
        <div>
          <h3 className="text-gradient">24/7</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI Support</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;