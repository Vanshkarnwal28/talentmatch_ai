import React, { useState } from 'react';
import { Search, X, Bot } from 'lucide-react';
import { matchCandidates, aiShortlistCandidates } from '../api';

const JobRequirementForm = ({ onShortlistComplete }) => {
  const [jobData, setJobData] = useState({
    requiredSkills: [],
    minExperience: 1
  });
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !jobData.requiredSkills.includes(skillInput.trim())) {
      setJobData({
        ...jobData,
        requiredSkills: [...jobData.requiredSkills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setJobData({
      ...jobData,
      requiredSkills: jobData.requiredSkills.filter(s => s !== skillToRemove)
    });
  };

  const handleBasicMatch = async () => {
    if (jobData.requiredSkills.length === 0) return alert("Add at least one required skill.");
    setLoading(true);
    try {
      const results = await matchCandidates(jobData);
      onShortlistComplete({ type: 'basic', data: results });
    } catch (error) {
      console.error(error);
      alert("Error finding candidates");
    } finally {
      setLoading(false);
    }
  };

  const handleAIMatch = async () => {
    if (jobData.requiredSkills.length === 0) return alert("Add at least one required skill.");
    setAiLoading(true);
    try {
      const results = await aiShortlistCandidates(jobData);
      onShortlistComplete({ type: 'ai', data: results });
    } catch (error) {
      console.error(error);
      alert("Error with AI Shortlisting");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="glass-panel">
      <h2><Search size={24} color="var(--accent)" /> Job Requirements</h2>
      
      <div className="form-group">
        <label>Minimum Experience (Years)</label>
        <input 
          type="number" 
          min="0"
          value={jobData.minExperience}
          onChange={(e) => setJobData({...jobData, minExperience: Number(e.target.value)})}
        />
      </div>

      <div className="form-group">
        <label>Required Skills</label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input 
            type="text" 
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(e)}
            placeholder="e.g. React"
          />
          <button type="button" onClick={handleAddSkill} style={{ width: 'auto' }}>Add</button>
        </div>
        <div className="tag-input-container">
          {jobData.requiredSkills.map(skill => (
            <span key={skill} className="tag">
              {skill}
              <button type="button" onClick={() => handleRemoveSkill(skill)}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button onClick={handleBasicMatch} disabled={loading} style={{ background: 'transparent', border: '1px solid var(--accent)' }}>
          {loading ? 'Processing...' : 'Basic Match'}
        </button>
        <button onClick={handleAIMatch} disabled={aiLoading} style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
          <Bot size={18} /> {aiLoading ? 'Analyzing Profiles...' : 'AI Shortlist'}
        </button>
      </div>
    </div>
  );
};

export default JobRequirementForm;
