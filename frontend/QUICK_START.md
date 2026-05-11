# Quick Start Guide - Fix Empty Page Issue

## Step 1: Install Dependencies
Open terminal in VS Code (Ctrl + ~) and run:
```bash
cd frontend
npm install
```

## Step 2: Start Dev Server
```bash
npm run dev
```

## Step 3: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any red error messages
4. Share the errors if you see any

## Step 4: Verify Server is Running
- You should see: "Local: http://localhost:3000"
- If port 3000 is busy, Vite will use another port (check terminal)

## Common Issues:

### Issue 1: Dependencies Not Installed
**Symptom:** Blank page, console shows module errors
**Fix:** Run `npm install` in the frontend folder

### Issue 2: Port Already in Use
**Symptom:** Server won't start
**Fix:** Change port in `vite.config.js` or close other apps using port 3000

### Issue 3: JavaScript Errors
**Symptom:** Blank page with console errors
**Fix:** Check browser console and fix the errors shown

### Issue 4: CORS or Network Errors
**Symptom:** Page loads but API calls fail
**Fix:** Make sure backend is running on port 5000

## Test if React is Working:
1. Open browser console (F12)
2. Type: `document.getElementById('root')`
3. Should return: `<div id="root">...</div>`
4. If it's empty, React isn't rendering

## Still Not Working?
1. Clear browser cache (Ctrl + Shift + Delete)
2. Try incognito/private window
3. Check if `node_modules` folder exists in `frontend` directory
4. Delete `node_modules` and `package-lock.json`, then run `npm install` again

