# Geneqi – Youth Action Platform 🛡️🎓

Geneqi is a full-stack platform designed to help economically disadvantaged youth (ages 15–24) access government scholarships and harassment support. It converts awareness into action through verified guidelines and an AI-driven interface.

## 🚀 Tech Stack
- **Frontend**: React (Vite), Vanilla CSS, Lucide Icons
- **Backend**: Node.js, Express, MongoDB
- **AI Service**: Python (FastAPI), Uvicorn
- **Deployment**: Vercel (Frontend), Render (Backend/Python), MongoDB Atlas

## 📂 Project Structure
- `frontend/`: React application (Mobile-first, Tamil+English toggle)
- `backend/`: Express API (Metric logging, Data management)
- `python-service/`: FastAPI microservice (Eligibility logic, Intent detection)

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js & npm
- Python 3.8+
- MongoDB Atlas Account

### 2. Backend Setup
1. `cd backend`
2. `npm install`
3. Create `.env` file from template:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri
   PYTHON_SERVICE_URL=http://localhost:8000
   ```
4. Seed initial data: `node scripts/seedData.js`
5. Start server: `node server.js`

### 3. Python Service Setup
1. `cd python-service`
2. `pip install -r requirements.txt`
3. Start service: `python main.py`

### 4. Frontend Setup
1. `cd frontend`
2. `npm install`
3. Start dev server: `npm run dev`

## 📊 Features
1. **Scholarship Module**: Filter schemes by age, income, and education.
2. **Harassment Support**: Legal guidance for Workplace, Cyber, Domestic, and Child protection.
3. **AI Chat**: Simple routing chatbot.
4. **Admin Dashboard**: Analytics on clicks, referrals, and demographics.

## 🔐 Privacy
- No Aadhaar or sensitive data stored.
- Explicit consent popup before any metric logging.
- Anonymized district and gender tracking only.

## 🌐 Deployment Steps

### Frontend (Vercel)
- Connect repository.
- Build command: `npm run build`
- Output directory: `dist`

### Backend & Python (Render)
- Create two separate Web Services on Render.
- Environment variables: `MONGO_URI`, `PYTHON_SERVICE_URL`.

---
*Built for Youth Action & Empowerment.*
