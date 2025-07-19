# Quick Fix for Render Deployment

## 🚨 Current Issue:
```
Error: Cannot find module 'express'
```

This means dependencies are not being installed properly.

## ✅ Solution:

### Step 1: Update Render Settings
In your Render dashboard, change the **Build Command** to:
```
npm install && npm run build
```

### Step 2: Verify Environment Variables
Make sure these are set in Render:
```
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
```

### Step 3: Redeploy
Click "Manual Deploy" → "Deploy latest commit"

## 🔧 Alternative Solution:

If the above doesn't work, try this build command instead:
```
npm ci --only=production
```

## 📝 What's Happening:

1. ✅ Build is successful (no more react-scripts error)
2. ❌ Dependencies not installed (express missing)
3. ✅ Root directory is correct (backend folder)
4. ❌ Build command not installing packages

## 🎯 Expected Result:

After fixing the build command, you should see:
```
Installing dependencies...
npm install
Dependencies installed
Starting server...
```

And the service should go "Live"! 🎉 