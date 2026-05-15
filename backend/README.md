# VeriScan Backend Execution Guide

This backend is designed to handle video analysis for deepfake detection, supporting the VeriScan frontend. It uses **Python** with the **Flask** framework for API management and **OpenCV** for video processing.

## Step-by-Step Implementation Details

### 1. Flask Infrastructure (`app.py`)
The backend is built using Flask, a lightweight WSGI web application framework.
- **CORS Handling**: Using `flask-cors`, we allow the React frontend (running on a different port) to securely communicate with the backend.
- **Routing**: Two primary routes are defined:
  - `POST /upload`: Handles `multipart/form-data`. It validates the file extension and saves the video to the `uploads/` directory using `werkzeug.utils.secure_filename` to prevent path traversal attacks.
  - `GET /predict`: Triggers the analysis of the most recently uploaded video.

### 2. Deepfake Detection Logic (`detector.py`)
The detection logic is encapsulated in the `DeepfakeDetector` class.
- **Frame Extraction**: Using `cv2.VideoCapture`, we extract representative frames from different timestamps of the video. This avoids processing every single frame, significantly improving performance.
- **Face Detection**: We utilize OpenCV's pre-trained **Haar Cascade** classifier (`haarcascade_frontalface_default.xml`) to locate faces within the frames. 
- **CNN Feature Extraction**: For each face crop, we extract a 2048‑D embedding using **Xception (ImageNet pretrained)**.
- **Hybrid CNN+LSTM (when trained)**: If `model_weights.h5` exists, the backend uses the **LSTM head** to predict `AUTHENTIC` vs `DEEPFAKE` from a fixed-length feature sequence.
- **Prototype fallback (when not trained)**: If no weights are present, the backend returns a result using a simple stability heuristic. The API response includes `model_mode=prototype` so you can honestly distinguish demo vs trained mode.

### 3. Environment Setup
The backend requires a few Python libraries, listed in `requirements.txt`:
- `flask`: The web server.
- `flask-cors`: For cross-origin requests.
- `opencv-python`: For video reading and face detection.
- `numpy`: For numerical analysis of image data.
- `tensorflow`: For Xception + LSTM model inference/training.

## Training (to enable `model_mode=trained`)

This project trains only the **temporal LSTM head** (Xception is used as a fixed feature extractor).

### Option A: Folder dataset (recommended if you already have videos)

Expected structure:
```
backend/data/
  real/   (real videos)
  fake/   (deepfake videos)
```
Run:
```bash
python backend/train.py --data_dir backend/data --epochs 5 --save_path backend/model_weights.h5
```

### Option B: DFDC sample videos (Kaggle)

Point `--dfdc_dir` to the folder containing `metadata.json` and the videos:
```bash
python backend/train.py --dfdc_dir path\\to\\train_sample_videos --epochs 5 --save_path backend/model_weights.h5
```

## How to Run the Backend

1. **Install Dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   ```

2. **Start the Server**:
   ```bash
   python backend/app.py
   ```
   The server will start at `http://localhost:5000`.

3. **Verify Connection**:
   Ensure the frontend is configured to target `http://localhost:5000` (which it is by default in `Upload.jsx`).
