const express = require('express');
const Candidate = require('../models/Candidate');
const router = express.Router();

// Basic Logic Shortlisting
router.post('/', async (req, res) => {
  const { requiredSkills, minExperience } = req.body;

  try {
    const candidates = await Candidate.find();

    const matchedCandidates = candidates.map(candidate => {
      // Create a lowercase set of candidate skills for case-insensitive matching
      const candidateSkills = candidate.skills.map(s => s.toLowerCase());
      
      const matchedSkills = candidate.skills.filter(skill =>
        requiredSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
      );
      
      const score = matchedSkills.length / requiredSkills.length;
      
      return {
        ...candidate._doc,
        matchScore: score * 100, // percentage
        matchedSkills,
        meetsExperience: candidate.experience >= minExperience
      };
    })
    .filter(c => c.matchScore > 0 && c.meetsExperience) // Filter out 0% match and low experience
    .sort((a, b) => b.matchScore - a.matchScore);

    res.json(matchedCandidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// AI-Based Shortlisting (OpenRouter)
router.post('/ai/shortlist', async (req, res) => {
  const { requiredSkills, minExperience } = req.body;
  
  try {
    const candidates = await Candidate.find();
    
    // Filter candidates simply to pass a relevant subset to the AI (or pass all if small)
    // For this example, we pass all candidates
    const candidatesText = candidates.map((c, i) => 
      `${i + 1}. ${c.name} - Skills: ${c.skills.join(', ')} - Experience: ${c.experience} years`
    ).join('\n');

    const prompt = `
Job requires: ${requiredSkills.join(', ')} (${minExperience}+ years experience)

Candidates:
${candidatesText}

Rank the candidates based on how well they fit the job requirements.
Provide the output strictly in a structured format:
For each candidate, provide their Name, a Match Score (percentage), and a short explanation (1-2 sentences) of why they are suitable or not.
`;

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // Using a faster/cheaper model if gpt-5.2 doesn't exist
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const aiData = await openRouterResponse.json();
    
    if (!openRouterResponse.ok) {
        throw new Error(aiData.error?.message || "Failed to fetch from OpenRouter");
    }

    res.json({ recommendation: aiData.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
