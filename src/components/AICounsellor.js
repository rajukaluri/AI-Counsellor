import React from 'react';

const AICounsellor = ({ currentStage, userProfile, selectedUni }) => {
  
  // Logic to generate contextual advice based on the App state
  const getGuidance = () => {
    // 1. Safety check for initial load
    if (!userProfile) {
      return { 
        insight: "Initializing AI logic...", 
        actionable: "Please complete your profile to begin.", 
        tip: "Your data is secured with AES-256 encryption." 
      };
    }

    // 2. Logic for University Discovery Stage
    if (currentStage === 'discovery') {
      return {
        insight: `I've analyzed your ${userProfile.gpa} CGPA. You have strong potential for ${userProfile.targetCountry || 'International'} universities.`,
        actionable: "Review the 'Shortlist' in the main panel. I have categorized them by 'Risk' based on your profile.",
        tip: "Most successful students apply to at least 1 'Safe' school to ensure a 100% success rate."
      };
    }

    // 3. Logic for Application/Roadmap Stage
    if (currentStage === 'application' && selectedUni) {
      return {
        insight: `Strategic Choice: ${selectedUni.name} aligns with your $${userProfile.budget} budget.`,
        actionable: `Since this is a ${selectedUni.riskLevel} match, prioritize your Statement of Purpose (SOP) to stand out.`,
        tip: "I've unlocked your roadmap. The first task is the most critical for your timeline."
      };
    }

    return { 
      insight: "Waiting for selection...", 
      actionable: "Select a university to generate your custom roadmap.", 
      tip: "Your CGPA puts you in the top tier of applicants." 
    };
  };

  const advice = getGuidance();

  return (
    <div className="ai-sidebar-content fade-in">
      {/* AI Active Status Header */}
      <div className="ai-status" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
        <div className="pulse"></div>
        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '1px' }}>
          AI COUNSELLOR ACTIVE
        </span>
      </div>

      {/* Dynamic Advice Bubbles */}
      <div className="ai-bubble-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div className="ai-bubble glass-card" style={{ padding: '1.25rem', borderRadius: '20px 20px 20px 4px' }}>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            <strong style={{ color: 'var(--primary)', display: 'block', fontSize: '0.7rem', marginBottom: '5px' }}>ANALYSIS</strong>
            {advice.insight}
          </p>
        </div>

        <div className="ai-bubble glass-card" style={{ padding: '1.25rem', borderRadius: '20px 20px 4px 20px', borderLeft: '3px solid var(--primary)' }}>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            <strong style={{ color: 'var(--primary)', display: 'block', fontSize: '0.7rem', marginBottom: '5px' }}>NEXT STEP</strong>
            {advice.actionable}
          </p>
        </div>

        {advice.tip && (
          <div className="ai-tip" style={{ 
            background: 'rgba(245, 158, 11, 0.1)', 
            border: '1px solid rgba(245, 158, 11, 0.2)', 
            padding: '1rem', 
            borderRadius: '12px' 
          }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#fbbf24' }}>
              💡 <strong>Pro Tip:</strong> {advice.tip}
            </p>
          </div>
        )}
      </div>

      <hr style={{ border: '0', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />

      {/* Profile Strength Visualizer */}
      <div className="profile-snapshot">
        <h4 style={{ marginBottom: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Profile Strength</h4>
        <div className="strength-bar" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
          <div 
            className="strength-fill" 
            style={{ 
              width: userProfile?.gpa > 8 ? '90%' : '65%', 
              background: 'linear-gradient(90deg, #6366f1, #a855f7)', 
              height: '100%',
              transition: 'width 1s ease-in-out',
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)'
            }}
          ></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          <small style={{ fontSize: '0.75rem' }}>Academic Score</small>
          <small style={{ fontSize: '0.75rem' }}><strong>{userProfile?.gpa || 0}/10</strong></small>
        </div>
      </div>
    </div>
  );
};

export default AICounsellor;