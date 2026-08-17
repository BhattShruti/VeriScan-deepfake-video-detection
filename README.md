# VeriScan
> Forked from [Deepti-1010/Veri_scan](https://github.com/Deepti-1010/Veri_scan) — original team project, B.Tech final year, GB Pant University.

## My Contribution

I was responsible for the full-stack layer of this project:

- **Frontend** (`frontend/`) — Built the entire React UI: routing (React Router), the component library (upload flow, results display, loading states, animations via Framer Motion), and the glassmorphism design system.
- **Backend** (`backend/app.py`) — Built the Flask REST API: `/upload` and `/predict` endpoints, CORS handling, secure file validation/storage (`werkzeug.secure_filename`), and response shaping.
- **Integration** — Connected frontend and backend end-to-end via Axios: upload → predict → result flow, including sessionStorage handoff between pages.

The CNN-LSTM detection pipeline (`backend/detector.py`, `train.py`, model training) was built collaboratively with my teammates; I understand and can walk through the full architecture and training pipeline, but that code specifically was not authored by me.

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

