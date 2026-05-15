import os
import glob
from detector import DeepfakeDetector
import json

def test_videos(folder_path, num_videos=5):
    # Initialize the detector
    weights_path = "model_weights.h5"
    if not os.path.exists(weights_path):
        weights_path = os.path.join(os.path.dirname(__file__), "model_weights.h5")

    detector = DeepfakeDetector(model_path=weights_path)
    
    # Get a list of videos
    videos = glob.glob(os.path.join(folder_path, "*.mp4"))
    videos = videos[:num_videos] # Only test a few to save time
    
    for video in videos:
        print(f"\n--- Testing Video: {os.path.basename(video)} ---")
        result, confidence = detector.analyze_video(video)
        print(f"Result: {result} (Confidence: {confidence})")
        print("Details:", json.dumps(detector.last_analysis_details, indent=2))

if __name__ == "__main__":
    test_dir = r"C:\Users\91954\Desktop\Veri_scan\backend\training_videos\deepfake-detection-challenge\test_videos"
    test_videos(test_dir, num_videos=3)
