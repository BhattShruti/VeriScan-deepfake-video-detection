# Installation Guide

## What You Need to Install

### Step 1: Install Node.js (if not already installed)
1. Go to: https://nodejs.org/
2. Download the LTS version (recommended)
3. Run the installer
4. Restart VS Code after installation

### Step 2: Install Project Dependencies

Open terminal in VS Code (press `Ctrl + ~`) and run these commands:

```bash
# Navigate to frontend folder
cd frontend

# Install all dependencies
npm install
```

This will install:
- React 18
- React DOM
- React Router
- Axios
- Framer Motion
- Vite (build tool)
- All other required packages

### Step 3: Start the Development Server

After installation completes, run:

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 4: Open in Browser

The browser should open automatically. If not, go to:
**http://localhost:3000**

## Complete Command Sequence

Copy and paste these commands one by one:

```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

### If `npm install` fails:
- Make sure Node.js is installed: `node --version`
- Make sure npm is installed: `npm --version`
- Try: `npm cache clean --force` then `npm install` again

### If port 3000 is busy:
- Close other applications using port 3000
- Or change port in `vite.config.js`

### If you see "command not found":
- Node.js is not installed or not in PATH
- Restart VS Code after installing Node.js
- Restart your computer if needed

## What Gets Installed?

The `npm install` command reads `package.json` and installs:

**Dependencies:**
- react ^18.2.0
- react-dom ^18.2.0
- react-router-dom ^6.20.0
- axios ^1.6.2
- framer-motion ^10.16.16

**Dev Dependencies:**
- vite ^5.0.8
- @vitejs/plugin-react ^4.2.1
- @types/react ^18.2.43
- @types/react-dom ^18.2.17

All packages will be installed in the `node_modules` folder.

## After Installation

Once `npm install` completes, you'll see a `node_modules` folder created.
Then run `npm run dev` to start the server.

The app will be available at: **http://localhost:3000**

