import React, { useState } from 'react';
import CandidateForm from './components/CandidateForm';
import JobRequirementForm from './components/JobRequirementForm';
import CandidateList from './components/CandidateList';
import ShortlistedCandidates from './components/ShortlistedCandidates';
import { Sparkles } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('add');
  const [shortlistResults, setShortlistResults] = useState(null);

  const handleShortlistComplete = (results) => {
    setShortlistResults(results);
    setActiveTab('match');
  };

  return (
    <div className="app-container">
      <header>
        <h1>TalentMatch AI <Sparkles size={28} style={{ verticalAlign: 'middle', color: '#a78bfa' }} /></h1>
        <p>Intelligent Candidate Shortlisting System</p>
      </header>

      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Candidate
        </button>
        <button 
          className={`nav-tab ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          View Database
        </button>
        <button 
          className={`nav-tab ${activeTab === 'match' ? 'active' : ''}`}
          onClick={() => setActiveTab('match')}
        >
          Match & Shortlist
        </button>
      </div>

      {activeTab === 'add' && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <CandidateForm />
        </div>
      )}

      {activeTab === 'view' && (
        <CandidateList />
      )}

      {activeTab === 'match' && (
        <div className="grid-layout">
          <div>
            <JobRequirementForm onShortlistComplete={handleShortlistComplete} />
          </div>
          <div>
            <ShortlistedCandidates results={shortlistResults} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
