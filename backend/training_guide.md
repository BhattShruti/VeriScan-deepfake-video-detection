# VeriScan Training Guide (Honest + Defendable)

VeriScan uses a **hybrid CNN–LSTM** approach:

- **CNN (Xception, ImageNet pretrained)** extracts a 2048‑D feature vector from each detected face frame.
- **LSTM head** learns temporal inconsistencies across a fixed-length sequence of these features.

The backend runs in:
- `model_mode=trained` when `model_weights.h5` exists (real CNN+LSTM prediction)
- `model_mode=prototype` when weights are missing (heuristic fallback for demo only)

## 1) Install dependencies

From the repo root:
```bash
pip install -r backend/requirements.txt
```

## 2) Choose a dataset format

### Option A: Folder dataset (simple)

Create:
```
backend/data/
  real/
  fake/
```
Put real videos into `real/` and deepfake videos into `fake/`.

### Option B: Kaggle DFDC sample (train_sample_videos)

Point training to the folder containing:
```
metadata.json
*.mp4
```
The script reads labels from `metadata.json`.

## 3) Train (creates `model_weights.h5`)

Folder dataset:
```bash
python backend/train.py --data_dir backend/data --epochs 5 --save_path backend/model_weights.h5
```

DFDC sample:
```bash
python backend/train.py --dfdc_dir path\\to\\train_sample_videos --epochs 5 --save_path backend/model_weights.h5
```

Tips:
- Start with `--max_per_class 30` for a fast demo run.
- If training is slow, reduce `--sequence_length` (e.g., 6–8) and keep videos short.

## 4) Run the backend using trained weights

```bash
python backend/app.py
```

When you call `GET /predict`, the response includes `model_mode`. If it says `prototype`, the weights file was not found at `backend/model_weights.h5`.

