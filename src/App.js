import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  // Use 'view' as the single source of truth for navigation
  // Options: 'landing', 'onboarding', 'dashboard'
  const [view, setView] = useState('landing');
  const [userProfile, setUserProfile] = useState(null);

  // 1. Transition from Landing to Onboarding
  const handleStart = () => {
    setView('onboarding');
  };

  // 2. Transition from Onboarding to Dashboard
  const handleOnboardingComplete = (data) => {
    setUserProfile(data);
    setView('dashboard');
  };

  // 3. The Demo Logic: Skips onboarding and loads mock data
  const handleViewDemo = (demoProfile) => {
    setUserProfile(demoProfile);
    setView('dashboard'); // Jump straight to results
  };

  return (
    <div className="App">
      {/* Landing View */}
      {view === 'landing' && (
        <LandingPage 
          onStart={handleStart} 
          onDemo={handleViewDemo} 
        />
      )}

      {/* Onboarding View */}
      {view === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {/* Dashboard View */}
      {view === 'dashboard' && (
        <Dashboard profile={userProfile} />
      )}
    </div>
  );
}

export default App;