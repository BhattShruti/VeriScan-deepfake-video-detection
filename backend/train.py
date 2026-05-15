"""
VeriScan Training Engine
------------------------
This script trains the LSTM component of the Hybrid model using
extracted features from Real and Fake video datasets.

Datasets: FaceForensics++ / Celeb-DF
Architecture: CNN (Xception) + LSTM
"""
import argparse
import json
import os
import numpy as np
import tensorflow as tf
from detector import DeepfakeDetector

VIDEO_EXTS = (".mp4", ".avi", ".mov", ".mkv", ".webm")

def _list_videos(folder):
    if not folder or not os.path.isdir(folder):
        return []
    return [
        os.path.join(folder, f)
        for f in os.listdir(folder)
        if f.lower().endswith(VIDEO_EXTS)
    ]

def _load_folder_dataset(data_dir):
    """
    Expected structure:
      data_dir/
        real/ (videos)
        fake/ (videos)
    """
    real_dir = os.path.join(data_dir, "real")
    fake_dir = os.path.join(data_dir, "fake")
    return (_list_videos(real_dir), _list_videos(fake_dir))

def _load_dfdc_dataset(dfdc_dir):
    """
    Supports Kaggle DFDC sample structure:
      dfdc_dir/
        metadata.json
        *.mp4
    """
    meta_path = os.path.join(dfdc_dir, "metadata.json")
    if not os.path.isfile(meta_path):
        raise FileNotFoundError(f"metadata.json not found in {dfdc_dir}")

    with open(meta_path, "r", encoding="utf-8") as f:
        meta = json.load(f)

    real, fake = [], []
    for filename, info in meta.items():
        label = str(info.get("label", "")).upper()
        video_path = os.path.join(dfdc_dir, filename)
        if not os.path.isfile(video_path):
            continue
        if label == "FAKE":
            fake.append(video_path)
        elif label == "REAL":
            real.append(video_path)

    return real, fake

def _extract_features(detector, video_paths, sequence_length, max_videos=None):
    X, y = [], []
    kept = 0

    for video_path, label in video_paths:
        if max_videos is not None and kept >= max_videos:
            break

        feats, meta = detector._extract_feature_sequence(video_path, sequence_length=sequence_length)
        if feats is None:
            continue

        X.append(feats)
        y.append(label)
        kept += 1

    if not X:
        return np.zeros((0, sequence_length, 2048), dtype=np.float32), np.zeros((0,), dtype=np.int32)

    return np.asarray(X, dtype=np.float32), np.asarray(y, dtype=np.int32)

def _train_val_split(X, y, val_split=0.2, seed=42):
    n = len(X)
    if n == 0:
        return (X, y, X, y)

    rng = np.random.default_rng(seed)
    idx = np.arange(n)
    rng.shuffle(idx)
    X = X[idx]
    y = y[idx]

    val_n = int(round(n * val_split))
    val_n = max(1, min(val_n, n - 1)) if n >= 2 else 0
    X_val, y_val = X[:val_n], y[:val_n]
    X_train, y_train = X[val_n:], y[val_n:]
    return (X_train, y_train, X_val, y_val)

def train_model():
    parser = argparse.ArgumentParser(description="Train VeriScan hybrid Xception(CNN)+LSTM deepfake detector.")
    parser.add_argument("--data_dir", default="data", help="Folder dataset root containing real/ and fake/ subfolders.")
    parser.add_argument("--dfdc_dir", default=None, help="Optional DFDC sample folder containing metadata.json and videos.")
    parser.add_argument("--sequence_length", type=int, default=10)
    parser.add_argument("--epochs", type=int, default=5)
    parser.add_argument("--batch_size", type=int, default=4)
    parser.add_argument("--val_split", type=float, default=0.2)
    parser.add_argument("--save_path", default="model_weights.h5")
    parser.add_argument("--max_per_class", type=int, default=None, help="Optional cap per class for quick experiments.")
    parser.add_argument("--cache_npz", default=None, help="Optional path to save/load extracted features.")
    args = parser.parse_args()

    # 1) Collect video paths
    if args.dfdc_dir:
        real_videos, fake_videos = _load_dfdc_dataset(args.dfdc_dir)
    else:
        if not os.path.isdir(args.data_dir):
            print(f"Error: Dataset directory '{args.data_dir}' not found.")
            print("Either create 'data/real' and 'data/fake' OR pass --dfdc_dir.")
            return
        real_videos, fake_videos = _load_folder_dataset(args.data_dir)

    print(f"Found videos: REAL={len(real_videos)}, FAKE={len(fake_videos)}")

    # 2) Feature extraction (or load cache)
    if args.cache_npz and os.path.isfile(args.cache_npz):
        print(f"Loading cached features: {args.cache_npz}")
        data = np.load(args.cache_npz)
        X = data["X"].astype(np.float32)
        y = data["y"].astype(np.int32)
    else:
        detector = DeepfakeDetector()

        # Build labeled list: 0=REAL, 1=FAKE
        labeled = [(p, 0) for p in real_videos] + [(p, 1) for p in fake_videos]
        # Keep balanced order: alternate by class where possible
        labeled = [(p, 0) for p in real_videos] + [(p, 1) for p in fake_videos]

        # Extract with per-class caps (optional)
        X_real, y_real = _extract_features(
            detector, [(p, 0) for p in real_videos], args.sequence_length, max_videos=args.max_per_class
        )
        X_fake, y_fake = _extract_features(
            detector, [(p, 1) for p in fake_videos], args.sequence_length, max_videos=args.max_per_class
        )
        X = np.concatenate([X_real, X_fake], axis=0) if len(X_real) or len(X_fake) else np.zeros((0, args.sequence_length, 2048), dtype=np.float32)
        y = np.concatenate([y_real, y_fake], axis=0) if len(y_real) or len(y_fake) else np.zeros((0,), dtype=np.int32)

        if args.cache_npz:
            os.makedirs(os.path.dirname(os.path.abspath(args.cache_npz)), exist_ok=True)
            np.savez_compressed(args.cache_npz, X=X, y=y)
            print(f"Saved cached features: {args.cache_npz}")

    if len(X) < 2:
        print("Error: Not enough training samples extracted. Ensure your videos contain detectable faces.")
        return

    print(f"Extracted samples: {len(X)} (sequence_length={args.sequence_length})")

    # 3) Train/val split
    X_train, y_train, X_val, y_val = _train_val_split(X, y, val_split=args.val_split)
    print(f"Split: train={len(X_train)}, val={len(X_val)}")

    # 4) Train LSTM head
    detector = DeepfakeDetector()
    model = detector.temporal_model
    model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])

    callbacks = [
        tf.keras.callbacks.EarlyStopping(monitor="val_loss", patience=2, restore_best_weights=True),
    ]

    model.fit(
        X_train,
        y_train,
        validation_data=(X_val, y_val),
        epochs=args.epochs,
        batch_size=args.batch_size,
        callbacks=callbacks,
        verbose=1,
    )

    model.save_weights(args.save_path)
    print(f"\nSUCCESS: Saved trained weights to {args.save_path}")
    print("Run the backend and it will switch to model_mode=trained automatically.")

if __name__ == "__main__":
    train_model()
