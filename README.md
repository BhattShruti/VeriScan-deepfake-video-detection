# VeriScan — Deepfake Video Detection

VeriScan is a web-based deepfake video detection system that analyzes uploaded videos and predicts whether they are real or manipulated.

The project combines a CNN-LSTM based detection pipeline with a React frontend and Flask backend to provide an end-to-end video analysis workflow.

> **Note:** VeriScan was developed as a team project. My primary contribution was the full-stack application layer: React frontend, Flask REST API, API integration, and the end-to-end upload-to-prediction workflow. The CNN-LSTM detection and training pipeline was developed collaboratively with my teammates.

---

## Overview

Deepfake detection is more difficult for videos than for individual images because useful information can appear both within individual frames and across a sequence of frames.

VeriScan explores this problem using a CNN-LSTM approach:

- CNN-based feature extraction from video frames
- Temporal modeling using LSTM
- Video processing and prediction through a Flask backend
- React-based interface for uploading videos and viewing results

The goal was to connect the machine-learning pipeline with a usable web application rather than keeping the model as an isolated training script.

---

## Features

- Video upload through a React web interface
- Video processing through a Flask backend
- Frame-based deepfake analysis
- CNN-based visual feature extraction
- LSTM-based temporal modeling
- Deepfake prediction
- React frontend with multiple application views
- Flask REST API
- Frontend-backend integration using Axios
- Upload and prediction workflow
- Loading and result states
- Error handling
- Secure uploaded filename handling
- CORS support

---

## How It Works

    Video Upload
          │
          ▼
    React Frontend
          │
          │ Axios
          ▼
    Flask REST API
          │
          ▼
    Video Processing
          │
          ▼
    Frame Extraction
          │
          ▼
    CNN Feature Extraction
          │
          ▼
    LSTM Temporal Modeling
          │
          ▼
    Prediction
          │
          ▼
    Flask Response
          │
          ▼
    React Result Page

The frontend handles the user interaction and sends the uploaded video to the Flask backend.

The backend processes the request and connects the application to the deepfake detection pipeline. The resulting prediction is then returned to the frontend and displayed to the user.

---

## Detection Pipeline

    Input Video
         │
         ▼
    Frame Extraction
         │
         ▼
    Face / Frame Processing
         │
         ▼
    CNN Feature Extraction
         │
         ▼
    Sequence of Features
         │
         ▼
    LSTM
         │
         ▼
    Video Classification
         │
         ▼
    Prediction

### CNN

The CNN component extracts visual information from individual frames.

This provides the spatial features used by the later stages of the pipeline.

### LSTM

The extracted frame-level features are processed as a sequence by the LSTM.

This allows the model to consider temporal information across multiple frames instead of treating each frame independently.

---

## Application Architecture

    ┌──────────────────────────┐
    │      React Frontend      │
    │                          │
    │  Video Upload            │
    │  Navigation              │
    │  Loading States          │
    │  Results Display         │
    └────────────┬─────────────┘
                 │
                 │ Axios / HTTP
                 ▼
    ┌──────────────────────────┐
    │       Flask API          │
    │                          │
    │  /upload                 │
    │  /predict                │
    │  File Validation         │
    │  CORS                    │
    │  Response Handling       │
    └────────────┬─────────────┘
                 │
                 ▼
    ┌──────────────────────────┐
    │   Detection Pipeline     │
    │                          │
    │  Video Processing        │
    │  CNN Features            │
    │  LSTM                    │
    │  Prediction              │
    └────────────┬─────────────┘
                 │
                 ▼
             Prediction
                 │
                 ▼
          React Results UI

---

## My Contribution

VeriScan was developed collaboratively, so the responsibilities are intentionally separated here.

### React Frontend

I worked on the frontend application, including:

- React UI development
- Application routing using React Router
- Video upload workflow
- Upload and result views
- Loading states
- Result presentation
- UI components
- Animations using Framer Motion
- Frontend-to-backend communication using Axios
- Session-based handoff of prediction information between application pages

### Flask Backend

I worked on the Flask application layer, including:

- Flask REST API
- `/upload` endpoint
- `/predict` endpoint
- Video upload handling
- File validation
- Secure filename handling using `werkzeug.secure_filename`
- CORS configuration
- API response handling
- Connecting the web application to the detection pipeline

### End-to-End Integration

I connected the application flow from:

    User
      ↓
    React
      ↓
    Axios
      ↓
    Flask API
      ↓
    Video / Model Processing
      ↓
    Prediction
      ↓
    Flask Response
      ↓
    React Result

The CNN-LSTM detection and model-training implementation was developed collaboratively with the team.

---

## Tech Stack

### Frontend

- React
- JavaScript
- Vite
- React Router
- Axios
- Framer Motion

### Backend

- Python
- Flask
- Flask-CORS
- REST API

### Machine Learning

- TensorFlow
- CNN
- LSTM
- Deep Learning

### Computer Vision

- OpenCV
- Video Frame Processing

---

## Project Structure

    VeriScan/
    │
    ├── backend/
    │   ├── app.py
    │   ├── detector.py
    │   ├── train.py
    │   ├── requirements.txt
    │   └── ...
    │
    ├── frontend/
    │   ├── src/
    │   ├── public/
    │   ├── package.json
    │   └── ...
    │
    ├── results/
    │
    ├── EXPERIMENTS.md
    ├── REPORT_OUTLINE.md
    ├── .gitignore
    └── README.md

### Main Directories

- `backend/` — Flask API, detection code, and training-related code
- `frontend/` — React application
- `results/` — project/model result artifacts
- `EXPERIMENTS.md` — experiment-related documentation
- `REPORT_OUTLINE.md` — project documentation

---

## Getting Started

### Prerequisites

Make sure you have:

- Python installed
- Node.js and npm installed
- Git installed

### 1. Clone the Repository

    git clone https://github.com/BhattShruti/VeriScan-deepfake-video-detection.git

    cd VeriScan-deepfake-video-detection

---

### 2. Set Up the Backend

Install the Python dependencies:

    pip install -r backend/requirements.txt

Start the Flask server:

    python backend/app.py

The backend runs on:

    http://localhost:5000

---

### 3. Set Up the Frontend

Open another terminal:

    cd frontend

Install the frontend dependencies:

    npm install

Start the development server:

    npm run dev

Open the local URL displayed by Vite.

---

## Using the Application

1. Start the Flask backend.
2. Start the React development server.
3. Open the application in your browser.
4. Select a video to analyze.
5. Upload the video.
6. The frontend sends the request to the Flask API.
7. The backend processes the video and runs the detection workflow.
8. The prediction is returned to the frontend.
9. The result is displayed in the application.

---

## Model and Experiments

The repository also contains experiment-related documentation and result artifacts.

The model development and experiments were carried out collaboratively as part of the project.

For details about the experiments and project work, see:

- [`EXPERIMENTS.md`](EXPERIMENTS.md)
- [`results/`](results/)

Model performance should be interpreted together with the dataset, preprocessing pipeline, train/test split, and evaluation methodology.

---

## Repository Notes

Large generated assets such as videos, model weights, training data, and logs should not be committed unnecessarily.

The repository includes a `.gitignore` to help keep generated and large local assets out of version control.

---

## Future Improvements

Possible areas for further development include:

- Improve inference speed for longer videos
- Add more automated tests
- Improve model evaluation across different datasets
- Improve confidence estimation
- Optimize the model for deployment
- Containerize the application
- Deploy the complete system
- Improve handling of large video uploads

---

## Team Project

VeriScan was developed as a collaborative B.Tech project.

The project combines:

**Machine Learning + Computer Vision + Flask Backend + React Frontend**

My primary focus was the **full-stack application layer and integration**, while the CNN-LSTM detection and training pipeline was developed collaboratively with the team.

---

## Repository

[View the source code](https://github.com/BhattShruti/VeriScan-deepfake-video-detection)


