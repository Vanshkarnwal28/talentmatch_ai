import React from 'react';
import { Award, CheckCircle2, Bot } from 'lucide-react';

const ShortlistedCandidates = ({ results }) => {
  if (!results) return null;

  return (
    <div className="glass-panel" style={{ border: '1px solid var(--accent)' }}>
      <h2>
        {results.type === 'ai' ? <Bot size={24} color="#8b5cf6" /> : <Award size={24} color="var(--accent)" />}
        Shortlisting Results
      </h2>

      {results.type === 'ai' ? (
        <div className="ai-recommendation" style={{ marginTop: 0 }}>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
            {results.data.recommendation}
          </pre>
        </div>
      ) : (
        <div className="candidate-list">
          {results.data.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No candidates matched the criteria.</p>
          ) : (
            results.data.map((candidate, idx) => (
              <div key={idx} className="candidate-card" style={{ borderColor: idx === 0 ? 'var(--accent)' : 'var(--border)' }}>
                <div className="candidate-header">
                  <div>
                    <div className="candidate-name" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {candidate.name}
                      {idx === 0 && <span style={{ color: '#f59e0b', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}>⭐ Top Match</span>}
                    </div>
                    <div className="candidate-email">{candidate.email} • {candidate.experience} Yrs Exp</div>
                  </div>
                  <div className="score-badge">
                    {candidate.matchScore.toFixed(0)}% Match
                  </div>
                </div>
                
                <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Matched Skills:</div>
                <div className="tag-input-container">
                  {candidate.matchedSkills.map((skill, i) => (
                    <span key={i} className="tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>
                      <CheckCircle2 size={12} /> {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ShortlistedCandidates;
