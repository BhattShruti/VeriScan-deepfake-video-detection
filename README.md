# VeriScan

Deepfake video detection demo with a **React** frontend and **Flask** backend.

## Structure

- `frontend/` – React UI
- `backend/` – Flask API + detector/training scripts

## Quick start (local)

### Backend

```bash
pip install -r backend/requirements.txt
python backend/app.py
```

Backend runs at `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Repo hygiene

This repo ignores large assets (videos, model weights, training sets, logs) via `.gitignore`. Keep those in local folders like `backend/uploads/` or external storage.

