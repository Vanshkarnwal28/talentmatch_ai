import React, { useEffect, useState } from 'react';
import { getCandidates } from '../api';
import { Users } from 'lucide-react';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidates();
        setCandidates(data);
      } catch (error) {
        console.error("Failed to fetch candidates", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  if (loading) return <div>Loading candidates...</div>;

  return (
    <div className="glass-panel">
      <h2><Users size={24} color="var(--accent)" /> All Candidates ({candidates.length})</h2>
      {candidates.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No candidates found in the database.</p>
      ) : (
        <div className="candidate-list">
          {candidates.map(candidate => (
            <div key={candidate._id} className="candidate-card">
              <div className="candidate-header">
                <div>
                  <div className="candidate-name">{candidate.name}</div>
                  <div className="candidate-email">{candidate.email}</div>
                </div>
                <div className="score-badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>
                  {candidate.experience} Yrs Exp
                </div>
              </div>
              <div className="tag-input-container">
                {candidate.skills.map((skill, i) => (
                  <span key={i} className="tag" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateList;
