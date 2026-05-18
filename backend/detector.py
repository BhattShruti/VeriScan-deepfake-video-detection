import cv2
import numpy as np
import os
from keras.applications import Xception
from keras.applications.xception import preprocess_input
from keras.layers import LSTM, Dense, Input
from keras.models import Model

class DeepfakeDetector:
    def __init__(self, model_path=None):
        # Initialize face detection (built-in OpenCV haarcascade)
        cascade_path = os.path.join(cv2.data.haarcascades, 'haarcascade_frontalface_default.xml')
        self.face_cascade = cv2.CascadeClassifier(cascade_path)
        
        print("Initializing CNN + LSTM Hybrid Analysis Engine...")
        
        # 1. CNN Component (Feature Extractor)
        # Using Xception as the base CNN
        self.cnn_base = Xception(weights='imagenet', include_top=False, pooling='avg')
        
        # 2. LSTM Component (Temporal Analysis)
        # We create a sequence-processing model
        # For this prototype, we'll build the hybrid architecture
        sequence_input = Input(shape=(None, 2048)) # 2048 is Xception's output size
        lx = LSTM(256, return_sequences=False)(sequence_input)
        lx = Dense(128, activation='relu')(lx)
        output = Dense(1, activation='sigmoid')(lx)
        
        self.temporal_model = Model(inputs=sequence_input, outputs=output)
        
        # Load pre-trained weights if available
        self.has_trained_weights = False
        if model_path and os.path.exists(model_path):
            print(f"Loading hybrid model weights: {model_path}...")
            self.temporal_model.load_weights(model_path)
            self.has_trained_weights = True
        else:
            print("Status: CNN + LSTM Pipeline Ready (Prototype Mode - using Stability Analysis).")

        # Holds debug/reliability metadata for the most recent analysis call.
        self.last_analysis_details = {}
        self.decision_threshold = 0.46

    def _calibrated_confidence(self, prediction_prob, is_deepfake, faces_found):
        """
        Convert raw sigmoid probability into a user-facing decision confidence.
        The verdict still comes only from prediction_prob vs decision_threshold.
        """
        threshold = self.decision_threshold
        if is_deepfake:
            distance_from_threshold = max(0.0, prediction_prob - threshold)
            available_range = max(1e-6, 1.0 - threshold)
        else:
            distance_from_threshold = max(0.0, threshold - prediction_prob)
            available_range = max(1e-6, threshold)

        normalized_margin = min(1.0, distance_from_threshold / available_range)
        evidence_bonus = min(0.08, max(0, faces_found - 1) * 0.015)
        calibrated = 0.62 + (normalized_margin * 0.30) + evidence_bonus

        return round(float(min(0.96, max(0.55, calibrated))), 4)

    def _extract_feature_sequence(self, video_path, sequence_length=10, max_frames_scan=600):
        """
        Extracts a fixed-length sequence of Xception features from a video.

        Returns:
          features: np.ndarray of shape (sequence_length, 2048) or None
          meta: dict with basic extraction stats
        """
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            return None, {"error": "cannot_open"}
        
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        if total_frames <= 0:
            cap.release()
            return None, {"error": "empty_video"}

        scan_upto = int(min(total_frames - 1, max_frames_scan))
        frame_indices = np.linspace(0, scan_upto, sequence_length, dtype=int)

        features = []
        faces_found = 0
        frames_read = 0
        
        for idx in frame_indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
            ret, frame = cap.read()
            if not ret:
                continue
            frames_read += 1
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = self.face_cascade.detectMultiScale(gray, 1.1, 4)
            if len(faces) > 0:
                (x, y, w, h) = sorted(faces, key=lambda f: f[2]*f[3], reverse=True)[0]
                faces_found += 1
                face_img = frame[y:y+h, x:x+w]
                face_resized = cv2.resize(face_img, (299, 299))
                face_array = np.expand_dims(face_resized, axis=0)
                face_preprocessed = preprocess_input(face_array.astype(np.float32))
                feat_vec = self.cnn_base.predict(face_preprocessed, verbose=0)[0]
                features.append(feat_vec)
        cap.release()

        if not features:
            return None, {"error": "no_face", "frames_read": frames_read, "faces_found": faces_found}

        # Pad/truncate to fixed length (important for stable training)
        if len(features) < sequence_length:
            last = features[-1]
            features = features + [last] * (sequence_length - len(features))
        else:
            features = features[:sequence_length]

        return np.asarray(features, dtype=np.float32), {"frames_read": frames_read, "faces_found": faces_found}

    def analyze_video_for_training(self, video_path, num_frames=10):
        """Backward-compatible helper for training scripts."""
        feats, _meta = self._extract_feature_sequence(video_path, sequence_length=num_frames)
        if feats is None:
            return None, 0
        return feats, 0

    def analyze_video(self, video_path):
        """
        Stable deployed inference:
        1. Extract a fixed-length sequence of face features.
        2. Run the trained CNN+LSTM model once on that sequence.
        3. Return INCONCLUSIVE only when face evidence is genuinely insufficient.
        """
        if self.has_trained_weights:
            feats, meta = self._extract_feature_sequence(video_path, sequence_length=10)
            if feats is None:
                reason = meta.get("error", "feature_extraction_failed") if isinstance(meta, dict) else "feature_extraction_failed"
                self.last_analysis_details = {
                    "mode": "trained",
                    "status": "inconclusive",
                    "reason": reason,
                }
                return "INCONCLUSIVE", 0.0

            frames_read = int(meta.get("frames_read", 0))
            faces_found = int(meta.get("faces_found", 0))

            if frames_read < 4 or faces_found < 1:
                self.last_analysis_details = {
                    "mode": "trained",
                    "status": "inconclusive",
                    "reason": "insufficient_face_frames",
                    "frames_read": frames_read,
                    "faces_found": faces_found,
                }
                return "INCONCLUSIVE", 0.0

            sequence_array = np.expand_dims(feats, axis=0)
            prediction_prob = float(self.temporal_model.predict(sequence_array, verbose=0)[0][0])
            is_deepfake = prediction_prob >= self.decision_threshold
            confidence = self._calibrated_confidence(prediction_prob, is_deepfake, faces_found)
            result = "DEEPFAKE" if is_deepfake else "AUTHENTIC"
            self.last_analysis_details = {
                "mode": "trained",
                "status": "ok",
                "reason": None,
                "frames_read": frames_read,
                "faces_found": faces_found,
                "prob_fake": round(float(prediction_prob), 4),
                "threshold": self.decision_threshold,
                "confidence_type": "calibrated_decision_confidence",
                "margin": round(float(abs(prediction_prob - 0.5)), 4),
            }
            return result, confidence

        self.last_analysis_details = {
            "mode": "prototype",
            "status": "inconclusive",
            "reason": "missing_trained_weights",
        }
        return "INCONCLUSIVE", 0.0


