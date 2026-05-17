import React, { useState } from 'react';
import { addCandidate } from '../api';
import { UserPlus, X } from 'lucide-react';

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: [],
    experience: '',
    bio: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCandidate({
        ...formData,
        experience: Number(formData.experience)
      });
      setStatus({ type: 'success', message: 'Candidate added successfully!' });
      setFormData({ name: '', email: '', skills: [], experience: '', bio: '' });
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
      setStatus({ type: 'error', message: `Failed to add candidate: ${errorMsg}` });
    }
  };

  return (
    <div className="glass-panel">
      <h2><UserPlus size={24} color="var(--accent)" /> Add Candidate</h2>
      {status.message && (
        <div style={{ color: status.type === 'success' ? 'var(--success)' : '#ef4444', marginBottom: '1rem' }}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="e.g. Rahul Sharma"
          />
        </div>
        
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="e.g. rahul@example.com"
          />
        </div>

        <div className="form-group">
          <label>Years of Experience</label>
          <input 
            type="number" 
            min="0"
            required 
            value={formData.experience}
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
            placeholder="e.g. 3"
          />
        </div>

        <div className="form-group">
          <label>Skills</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input 
              type="text" 
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(e)}
              placeholder="Add a skill and press Add"
            />
            <button type="button" onClick={handleAddSkill} style={{ width: 'auto' }}>Add</button>
          </div>
          <div className="tag-input-container">
            {formData.skills.map(skill => (
              <span key={skill} className="tag">
                {skill}
                <button type="button" onClick={() => handleRemoveSkill(skill)}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Bio / Projects</label>
          <textarea 
            rows="3"
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            placeholder="Brief bio or links to projects..."
          />
        </div>

        <button type="submit">Save Candidate</button>
      </form>
    </div>
  );
};

export default CandidateForm;
