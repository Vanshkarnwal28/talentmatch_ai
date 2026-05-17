# Candidate Profile Shortlisting System

This is a full-stack MERN application that allows recruiters to add candidates, input job requirements, and shortlist candidates using a basic matching algorithm and an AI-powered shortlisting mechanism using the OpenRouter API.

## Project Structure

- `backend/`: Node.js, Express, MongoDB (Mongoose) backend.
- `frontend/`: React, Vite frontend.

## Local Setup

1. **Backend**:
   - `cd backend`
   - Create a `.env` file with the following variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     OPENROUTER_API_KEY=your_openrouter_api_key
     PORT=5000
     ```
   - Run `npm install`
   - Run `npm run dev` to start the backend server on port 5000.

2. **Frontend**:
   - `cd frontend`
   - Run `npm install`
   - Run `npm run dev` to start the frontend Vite server.

## Postman Collection
A `Candidate_Shortlisting_API.postman_collection.json` file is included in the root of this project. You can import it directly into Postman to test all the backend API endpoints (`POST /api/candidates`, `GET /api/candidates`, `POST /api/match`, `POST /api/match/ai/shortlist`).

---

## Deployment & GitHub Steps

### 1. Pushing to GitHub

1. Open your terminal in the root directory (`/Users/vanshkarnwal/aifsdfinal`).
2. Initialize git:
   ```bash
   git init
   ```
3. Add a `.gitignore` file to the root directory to ignore node_modules and .env files:
   ```bash
   echo "node_modules/\n.env" > .gitignore
   echo "node_modules/\n.env" > backend/.gitignore
   ```
4. Stage and commit your files:
   ```bash
   git add .
   git commit -m "Initial commit: Candidate Shortlisting System"
   ```
5. Create a new repository on GitHub.
6. Link your local repository to GitHub and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

### 2. Deploying the Backend (e.g., Render)

1. Go to [Render.com](https://render.com/) and create a new **Web Service**.
2. Connect your GitHub repository.
3. Configure the settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `OPENROUTER_API_KEY`: Your OpenRouter API key.
5. Deploy. Render will give you a live URL (e.g., `https://your-backend.onrender.com`).

### 3. Deploying the Frontend (e.g., Vercel)

1. First, update your `frontend/src/api.js` to point to the live Render backend URL instead of `http://localhost:5000/api`.
   *Example: `const API_URL = 'https://your-backend.onrender.com/api';`*
2. Go to [Vercel.com](https://vercel.com/) and create a new Project.
3. Import your GitHub repository.
4. Configure the settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
5. Deploy. Vercel will give you a live URL for your React app.
