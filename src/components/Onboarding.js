import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    major: '',
    gpa: '',
    targetCountry: 'USA',
    budget: '50000',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <div className="onboarding-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-card fade-in" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
        
        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ 
              height: '4px', 
              flex: 1, 
              borderRadius: '2px',
              background: i <= step ? 'var(--primary)' : 'var(--glass-border)',
              transition: '0.4s'
            }} />
          ))}
        </div>

        {step === 1 && (
          <div className="step-content fade-in">
            <h2 className="text-gradient">Let's start with the basics</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>What should the AI call you?</p>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem' }}>Full Name</label>
              <input 
                name="fullName" 
                placeholder="Enter your name" 
                value={formData.fullName} 
                onChange={handleChange} 
              />
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: '24px' }} onClick={next}>Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content fade-in">
            <h2 className="text-gradient">Academic Profile</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Your scores help us calculate "Dream" vs "Safe" matches.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem' }}>Intended Major</label>
                <input name="major" placeholder="e.g. Computer Science" value={formData.major} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem' }}>Current GPA (Scale 10.0)</label>
                <input type="number" name="gpa" placeholder="e.g. 8.5" value={formData.gpa} onChange={handleChange} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button className="btn-outline" style={{ flex: 1 }} onClick={back}>Back</button>
              <button className="btn-primary" style={{ flex: 2 }} onClick={next}>Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content fade-in">
            <h2 className="text-gradient">Preferences</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Almost there! Where and what's the budget?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem' }}>Target Country</label>
                <select name="targetCountry" value={formData.targetCountry} onChange={handleChange}>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem' }}>Yearly Budget ($)</label>
                <input type="number" name="budget" placeholder="e.g. 40000" value={formData.budget} onChange={handleChange} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button className="btn-outline" style={{ flex: 1 }} onClick={back}>Back</button>
              <button className="btn-primary" style={{ flex: 2 }} onClick={() => onComplete(formData)}>Build My Dashboard</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;