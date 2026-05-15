import argparse
import json
import os
from datetime import datetime

import numpy as np
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
    roc_curve,
)

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
    real_dir = os.path.join(data_dir, "real")
    fake_dir = os.path.join(data_dir, "fake")
    return (_list_videos(real_dir), _list_videos(fake_dir))


def _load_dfdc_dataset(dfdc_dir):
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


def _ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def evaluate():
    parser = argparse.ArgumentParser(description="Evaluate VeriScan trained weights on a dataset folder.")
    parser.add_argument("--weights", default="model_weights.h5", help="Path to trained weights file.")
    parser.add_argument("--data_dir", default=None, help="Dataset root containing real/ and fake/ subfolders.")
    parser.add_argument("--dfdc_dir", default=None, help="Optional DFDC sample folder containing metadata.json and videos.")
    parser.add_argument("--sequence_length", type=int, default=10)
    parser.add_argument("--max_per_class", type=int, default=None)
    parser.add_argument("--out_dir", default="results", help="Where to write metrics.json and optional plots.")
    parser.add_argument("--plot", action="store_true", help="Write ROC plot PNG (requires matplotlib).")
    args = parser.parse_args()

    if not os.path.isfile(args.weights):
        raise SystemExit(f"Weights not found: {args.weights}. Train first (backend/train.py).")

    if not args.data_dir and not args.dfdc_dir:
        raise SystemExit("Provide --data_dir or --dfdc_dir.")

    if args.dfdc_dir:
        real_videos, fake_videos = _load_dfdc_dataset(args.dfdc_dir)
        dataset_name = os.path.basename(os.path.abspath(args.dfdc_dir))
    else:
        real_videos, fake_videos = _load_folder_dataset(args.data_dir)
        dataset_name = os.path.basename(os.path.abspath(args.data_dir))

    if args.max_per_class is not None:
        real_videos = real_videos[: args.max_per_class]
        fake_videos = fake_videos[: args.max_per_class]

    y_true = np.array([0] * len(real_videos) + [1] * len(fake_videos), dtype=np.int32)
    video_paths = real_videos + fake_videos

    detector = DeepfakeDetector(args.weights)
    if not detector.has_trained_weights:
        raise SystemExit("Failed to load weights; detector is still in prototype mode.")

    probs = []
    used_paths = []
    used_y = []

    for vp, yt in zip(video_paths, y_true):
        feats, meta = detector._extract_feature_sequence(vp, sequence_length=args.sequence_length)
        if feats is None:
            continue
        p = float(detector.temporal_model.predict(np.expand_dims(feats, axis=0), verbose=0)[0][0])
        probs.append(p)
        used_paths.append(vp)
        used_y.append(int(yt))

    if not probs:
        raise SystemExit("No samples were usable (no detectable faces).")

    probs = np.asarray(probs, dtype=np.float32)
    used_y = np.asarray(used_y, dtype=np.int32)
    y_pred = (probs > 0.5).astype(np.int32)

    metrics = {
        "timestamp": datetime.now().isoformat(timespec="seconds"),
        "dataset": dataset_name,
        "n_total_videos_listed": int(len(video_paths)),
        "n_usable_videos": int(len(used_y)),
        "sequence_length": int(args.sequence_length),
        "threshold": 0.5,
        "accuracy": float(accuracy_score(used_y, y_pred)),
        "precision": float(precision_score(used_y, y_pred, zero_division=0)),
        "recall": float(recall_score(used_y, y_pred, zero_division=0)),
        "f1": float(f1_score(used_y, y_pred, zero_division=0)),
        "roc_auc": float(roc_auc_score(used_y, probs)) if len(np.unique(used_y)) == 2 else None,
        "confusion_matrix": confusion_matrix(used_y, y_pred).tolist(),
        "classification_report": classification_report(used_y, y_pred, digits=4, zero_division=0),
    }

    _ensure_dir(args.out_dir)
    out_json = os.path.join(args.out_dir, f"metrics_{dataset_name}.json")
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(metrics, f, indent=2)

    out_list = os.path.join(args.out_dir, f"used_videos_{dataset_name}.txt")
    with open(out_list, "w", encoding="utf-8") as f:
        for vp, yt, p in zip(used_paths, used_y.tolist(), probs.tolist()):
            f.write(f"{yt}\t{p:.6f}\t{vp}\n")

    if args.plot:
        import matplotlib.pyplot as plt

        if len(np.unique(used_y)) == 2:
            fpr, tpr, _thr = roc_curve(used_y, probs)
            plt.figure(figsize=(5, 5))
            plt.plot(fpr, tpr, label=f"ROC (AUC={metrics['roc_auc']:.3f})")
            plt.plot([0, 1], [0, 1], linestyle="--", color="gray")
            plt.xlabel("False Positive Rate")
            plt.ylabel("True Positive Rate")
            plt.title(f"VeriScan ROC - {dataset_name}")
            plt.legend(loc="lower right")
            out_png = os.path.join(args.out_dir, f"roc_{dataset_name}.png")
            plt.tight_layout()
            plt.savefig(out_png, dpi=150)
            plt.close()

    print(f"Wrote: {out_json}")
    print(metrics["classification_report"])


if __name__ == "__main__":
    evaluate()

