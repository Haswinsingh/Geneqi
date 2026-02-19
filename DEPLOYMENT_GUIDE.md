# Deployment Guide for Geneqi Platform

This guide outlines how to deploy your full-stack application for public access.

## Architecture Overview
- **Frontend (React/Vite)**: Deploy on **Vercel** or **Netlify**.
- **Backend (Node.js/Express)**: Deploy on **Render** or **Railway**.
- **Python Service (FastAPI)**: Deploy on **Render** or **Railway**.
- **Database (MongoDB)**: Use **MongoDB Atlas** (Cloud).

---

## Step 1: Prepare Your Code (I can do this for you!)

### frontend
1.  Replace all hardcoded `http://localhost:5000` with `import.meta.env.VITE_API_URL`.
2.  Create a `.env` file with `VITE_API_URL=http://localhost:5000` for local development.

### backend
1.  Ensure `server.js` uses `process.env.PORT`.
2.  Ensure `config/db.js` uses `process.env.MONGO_URI` (This is already set up).

### python-service
1.  Ensure `main.py` listens so that the port is dynamic (e.g. `os.getenv("PORT", 8000)`).
2.  Create a `Procfile` if needed (Render detects Python automatically but `uvicorn` command is needed).

---

## Step 2: Push to GitHub
If you haven't already, push your code to a GitHub repository.

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

---

## Step 3: Deploy Backend (Node.js) to Render

1.  Go to [dashboard.render.com](https://dashboard.render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  Select the `backend` folder as **Root Directory**.
5.  **Build Command**: `npm install`
6.  **Start Command**: `node server.js`
7.  **Environment Variables**:
    -   `NODE_ENV`: `production`
    -   `MONGO_URI`: Your MongoDB Atlas connection string.
    -   `JWT_SECRET`: Your secret key.
    -   `PYTHON_SERVICE_URL`: Your **Python Render URL** (from Step 4).
    -   `FRONTEND_URL`: Your **Vercel Frontend URL** (after you deploy it).
8.  Click **Create Web Service**.
9.  Copy the **URL** (e.g., `https://geneqi-backend.onrender.com`).

---

## Step 4: Deploy Python Service to Render

1.  Go to [dashboard.render.com](https://dashboard.render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  Select the `python-service` folder as **Root Directory**.
5.  **Build Command**: `pip install -r requirements.txt`
6.  **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7.  Click **Create Web Service**.
8.  Copy the URL.

---

## Step 5: Deploy Frontend to Vercel

1.  Go to [vercel.com](https://vercel.com).
2.  Click **Add New** -> **Project**.
3.  Import your GitHub repository.
4.  Select `Vite` as the framework (it should auto-detect).
5.  **Root Directory**: Edit and select `frontend`.
6.  **Environment Variables**:
    -   `VITE_API_URL`: Paste your **Backend Render URL** here (from Step 3).
    -   `VITE_PYTHON_API_URL`: Paste your **Python Render URL** here (from Step 4).
7.  Click **Deploy**.

---

## Done!
Your website will be live at the Vercel URL.
