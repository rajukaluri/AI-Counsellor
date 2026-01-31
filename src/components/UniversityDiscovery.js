import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UniversityDiscovery = ({ userProfile, onLock }) => {
  const [filteredUnis, setFilteredUnis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // YOUR LIVE RENDER URL
  const BACKEND_URL = "https://ai-counsellor-server-rb2b.onrender.com";

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userProfile) return;
      
      setLoading(true);
      try {
        // Updated from localhost to your live Render backend
        const response = await axios.post(`${BACKEND_URL}/api/recommendations`, {
          gpa: userProfile.gpa,
          budget: userProfile.budget
        });
        
        setFilteredUnis(response.data);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        // Improved error message to explain the "Wake up" time for Render Free Tier
        setError("The server is waking up. This can take up to 60 seconds on the free tier. Please click Retry.");
      } finally {
        // Small delay to make the AI transition feel smoother
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchRecommendations();
  }, [userProfile]);

  if (loading) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '50px' }}>
        <div className="pulse" style={{ margin: '0 auto 20px' }}></div>
        <p className="text-gradient" style={{ fontWeight: 'bold' }}>AI is analyzing 32+ universities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card" style={{ border: '1px solid #ef4444', padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#ef4444', marginBottom: '15px' }}>{error}</p>
        <button className="btn-outline" onClick={() => window.location.reload()}>
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="discovery-wrapper fade-in">
      <div className="discovery-header" style={{ marginBottom: '2rem' }}>
        <h2 className="text-gradient">AI Recommended Shortlist</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Based on your {userProfile.gpa} GPA and ${userProfile.budget} budget.
        </p>
      </div>
      
      <div className="uni-grid" style={{ display: 'grid', gap: '20px' }}>
        {filteredUnis.length > 0 ? (
          filteredUnis.map(uni => (
            <div key={uni.id} className="glass-card uni-card-premium" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '24px'
            }}>
              <div className="uni-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0 }}>{uni.name}</h3>
                  <span className={`badge badge-${uni.risk.toLowerCase()}`}>
                    {uni.risk}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
                  📍 {uni.country} • <span style={{ color: '#fff' }}>${uni.cost.toLocaleString()}/yr</span>
                </p>
              </div>
              
              <button 
                onClick={() => onLock(uni)}
                className="btn-primary"
              >
                Lock & Commit
              </button>
            </div>
          ))
        ) : (
          <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
            <p>No matches found. Try increasing your budget or adjusting your target countries.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityDiscovery;