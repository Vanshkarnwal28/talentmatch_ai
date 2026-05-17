import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const addCandidate = async (candidateData) => {
  const response = await axios.post(`${API_URL}/candidates`, candidateData);
  return response.data;
};

export const getCandidates = async () => {
  const response = await axios.get(`${API_URL}/candidates`);
  return response.data;
};

export const matchCandidates = async (jobData) => {
  const response = await axios.post(`${API_URL}/match`, jobData);
  return response.data;
};

export const aiShortlistCandidates = async (jobData) => {
  const response = await axios.post(`${API_URL}/match/ai/shortlist`, jobData);
  return response.data;
};
