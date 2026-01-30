import React, { useState } from 'react';
import AICounsellor from './AICounsellor';
import ChatAI from './ChatAI';
import UniversityDiscovery from './UniversityDiscovery';

export default function Dashboard({ profile }) {
  const [lockedUni, setLockedUni] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Logic to handle Locking a University
  const handleLock = (uni) => {
    const confirmLock = window.confirm(`Locking ${uni.name} will generate your personal roadmap. Ready?`);
    if (!confirmLock) return;

    setLockedUni(uni);
    // These tasks are now personalized based on the locked university
    setTasks([
      { id: 1, text: `Validate ${profile.major} prerequisites for ${uni.name}`, completed: false },
      { id: 2, text: `Prepare Statement of Purpose for ${uni.country} visa`, completed: false },
      { id: 3, text: `Submit official transcripts (GPA: ${profile.gpa} verified)`, completed: false },
      { id: 4, text: `Finalize financial proof for $${uni.cost.toLocaleString()} budget`, completed: false }
    ]);
  };

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Final Success View
  if (isSubmitted) {
    return (
      <div className="glass-card fade-in" style={{ textAlign: 'center', maxWidth: '600px', margin: '100px auto' }}>
        <h1 className="text-gradient">Application Sent! 🚀</h1>
        <p>Your profile has been transmitted to <strong>{lockedUni?.name}</strong>.</p>
        <button className="btn-primary" onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>
          Start New Journey
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-grid fade-in">
      <main className="dashboard-main">
        {/* Stage Progress Header */}
        <div className="stepper" style={{ marginBottom: '2rem', display: 'flex', gap: '10px' }}>
          <div className={`step ${lockedUni ? 'completed' : 'active'}`}>1. Discovery</div>
          <div className={`step ${lockedUni ? 'active' : ''}`}>2. Application</div>
        </div>

        {!lockedUni ? (
          <UniversityDiscovery userProfile={profile} onLock={handleLock} />
        ) : (
          <section className="glass-card roadmap-section fade-in">
            <button className="btn-outline" onClick={() => setLockedUni(null)} style={{ marginBottom: '20px', fontSize: '0.8rem' }}>
              ← Change University
            </button>
            <h2>📋 {lockedUni.name} Roadmap</h2>
            <div className="task-list" style={{ margin: '20px 0' }}>
              {tasks.map(t => (
                <div key={t.id} className={`task-item ${t.completed ? 'task-done' : ''}`} style={{ display: 'flex', gap: '10px', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <input 
                    type="checkbox" 
                    checked={t.completed} 
                    onChange={() => toggleTask(t.id)} 
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span style={{ textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? 'var(--text-muted)' : 'inherit' }}>
                    {t.text}
                  </span>
                </div>
              ))}
            </div>

            {progressPercent === 100 && (
              <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }} onClick={() => setIsSubmitted(true)}>
                Submit Final Application
              </button>
            )}
          </section>
        )}
      </main>

      {/* Persistent AI Sidebar */}
      <aside className="ai-sidebar">
        <div className="glass-card" style={{ position: 'sticky', top: '20px' }}>
          <AICounsellor 
            currentStage={lockedUni ? 'application' : 'discovery'} 
            userProfile={profile} 
            selectedUni={lockedUni} 
          />
          
          {lockedUni && (
            <div className="progress-box" style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                <span>Application Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--primary)', borderRadius: '10px', transition: 'width 0.3s' }}></div>
              </div>
            </div>
          )}

          <hr style={{ margin: '2rem 0', opacity: 0.1 }} />
          <ChatAI user={profile} />
        </div>
      </aside>
    </div>
  );
}