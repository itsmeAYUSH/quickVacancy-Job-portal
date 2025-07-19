# QuickVacancy Deployment Guide

## 🚀 Complete Deployment Solution

### Current Structure ✅
```
Root/
├── src/ (Frontend - React)
├── public/ (Frontend - React assets)
├── package.json (Frontend - for Netlify)
├── netlify.toml (Frontend - Netlify config)
├── backend/ (Backend - Node.js)
│   ├── server.js
│   └── package.json
├── render.yaml (Backend - Render config)
└── .gitignore
```

---

## 🔧 Backend Deployment (Render.com)

### Step 1: Deploy Backend
1. Go to [Render.com](https://render.com)
2. Connect your GitHub repository
3. Create a **Web Service**
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node.js

### Step 2: Set Environment Variables
In Render dashboard, add these environment variables:
```
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
TWILIO_ACCOUNT_SID=your_twilio_sid (optional)
TWILIO_AUTH_TOKEN=your_twilio_token (optional)
TWILIO_PHONE_NUMBER=your_twilio_phone (optional)
```

### Step 3: Get Backend URL
After deployment, note your backend URL:
`https://your-app-name.onrender.com`

---

## 🌐 Frontend Deployment (Netlify.com)

### Step 1: Deploy Frontend
1. Go to [Netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Base directory**: Leave empty (root)

### Step 2: Set Environment Variables
In Netlify dashboard, add:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### Step 3: Deploy
Click "Deploy site" and wait for build to complete.

---

## 🧪 Testing

### Test Backend
Visit: `https://your-backend-url.onrender.com/api/health`
Should return: `{"status":"OK","message":"Server is running"}`

### Test Frontend
Visit your Netlify URL and test OTP functionality.

---

## 🔧 Troubleshooting

### If Backend Fails on Render:
1. Check environment variables are set
2. Verify `backend/server.js` exists
3. Check `backend/package.json` has correct dependencies

### If Frontend Fails on Netlify:
1. Check `package.json` has `react-scripts`
2. Verify `src/` and `public/` folders exist
3. Check environment variables are set

### If OTP Doesn't Work:
1. Verify backend URL in frontend environment variables
2. Check CORS settings in backend
3. Test backend health endpoint

---

## 📝 Important Notes

1. **Backend URL**: Update `REACT_APP_API_URL` in Netlify with your actual Render backend URL
2. **Email Setup**: Use Gmail with App Password for email OTP
3. **CORS**: Backend is configured to accept requests from common domains
4. **Environment**: Frontend automatically detects development vs production

---

## 🎯 Success Checklist

- [ ] Backend deployed on Render ✅
- [ ] Frontend deployed on Netlify ✅
- [ ] Environment variables set ✅
- [ ] Backend health check passes ✅
- [ ] OTP functionality works ✅
- [ ] Frontend connects to backend ✅ 