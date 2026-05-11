# Troubleshooting Empty Page

## Quick Checks:

1. **Is the dev server running?**
   - Open terminal in VS Code (Ctrl + ~)
   - Navigate to frontend: `cd frontend`
   - Run: `npm install` (if not done)
   - Run: `npm run dev`
   - Should see: "Local: http://localhost:3000"

2. **Check Browser Console (F12)**
   - Open DevTools → Console tab
   - Look for red error messages
   - Common errors:
     - "Cannot find module" → Run `npm install`
     - "Failed to fetch" → Server not running
     - "Uncaught SyntaxError" → Check file syntax

3. **Verify Files Exist:**
   - `frontend/src/main.jsx` ✓
   - `frontend/src/App.jsx` ✓
   - `frontend/src/index.css` ✓
   - `frontend/index.html` ✓

4. **Test Simple React:**
   - Temporarily change `main.jsx` to:
   ```jsx
   import React from 'react'
   import ReactDOM from 'react-dom/client'
   
   ReactDOM.createRoot(document.getElementById('root')).render(
     <h1 style={{color: 'white', padding: '50px'}}>React Works!</h1>
   )
   ```
   - If this shows, React is working
   - If still blank, check browser console

5. **Clear Cache:**
   - Hard refresh: Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)
   - Or clear browser cache

6. **Check Network Tab:**
   - Open DevTools → Network tab
   - Refresh page
   - Look for failed requests (red)
   - Check if `main.jsx` is loading (should be 200 status)

## Most Common Issue:
**Dependencies not installed!**
```bash
cd frontend
npm install
npm run dev
```

## Still Empty?
Share:
1. Browser console errors (screenshot or copy text)
2. Terminal output when running `npm run dev`
3. Network tab showing any failed requests

