# Render Deployment Guide

## 🚨 IMPORTANT: You're deploying the WRONG folder!

### Current Error:
```
> react-scripts build
sh: 1: react-scripts: not found
```

This error occurs because you're deploying the **frontend** (React) to Render, but Render is for **backend** deployment.

---

## ✅ Correct Render Deployment Steps:

### Step 1: Create New Web Service
1. Go to [Render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository: `itsmeAYUSH/quickVacancy-Job-portal`

### Step 2: Configure Settings
**CRITICAL SETTINGS:**
- **Name**: `quickvacancy-backend`
- **Root Directory**: `backend` ← **THIS IS THE KEY!**
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Step 3: Set Environment Variables
Add these in Render dashboard:
```
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
```

### Step 4: Deploy
Click "Create Web Service" and wait for deployment.

---

## 🧪 Verify Deployment

### Success Indicators:
- ✅ Build completes without errors
- ✅ Service shows "Live" status
- ✅ Health check passes: `https://your-app.onrender.com/api/health`

### Expected Output:
```json
{
  "status": "OK",
  "message": "Server is running",
  "emailConfigured": true,
  "twilioConfigured": false
}
```

---

## 🔧 Troubleshooting

### If you still get "react-scripts not found":
1. **Check Root Directory**: Make sure it's set to `backend`
2. **Redeploy**: Delete the service and create a new one
3. **Verify Structure**: Ensure `backend/server.js` exists

### If backend fails to start:
1. Check environment variables are set
2. Verify `backend/package.json` has correct dependencies
3. Check logs for specific error messages

---

## 📁 Correct File Structure for Render:

```
backend/
├── server.js ✅ (Express server)
├── package.json ✅ (Node.js dependencies)
└── start.sh ✅ (Start script)
```

**NOT the root folder with React files!** 