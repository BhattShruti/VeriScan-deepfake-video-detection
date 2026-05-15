"""
Quick test script for VeriScan backend API.
Usage: python test_api.py <path_to_video>
Example: python test_api.py test_videos/real_video.mp4
"""
import requests
import sys
import os

BASE_URL = "http://localhost:5000"

def test_upload_and_predict(video_path):
    if not os.path.exists(video_path):
        print(f"ERROR: File not found: {video_path}")
        return

    print(f"\n{'='*50}")
    print(f"Testing VeriScan with: {video_path}")
    print(f"{'='*50}\n")

    # Step 1: Upload
    print("[1/2] Uploading video...")
    with open(video_path, 'rb') as f:
        response = requests.post(f"{BASE_URL}/upload", files={"video": f})
    
    if response.status_code != 200:
        print(f"Upload FAILED: {response.json()}")
        return
    
    print(f"Upload SUCCESS: {response.json()['message']}")

    # Step 2: Predict
    print("[2/2] Running Xception deepfake analysis...")
    response = requests.get(f"{BASE_URL}/predict")
    
    if response.status_code != 200:
        print(f"Prediction FAILED: {response.json()}")
        return
    
    data = response.json()
    print(f"\n{'='*50}")
    print(f"RESULT:     {data['prediction']}")
    print(f"CONFIDENCE: {data['confidence'] * 100:.2f}%")
    if 'model_mode' in data:
        print(f"MODEL MODE: {data['model_mode']}")
    if data.get("analysis_status"):
        print(f"STATUS:     {data['analysis_status']}")
    if data.get("analysis_reason"):
        print(f"REASON:     {data['analysis_reason']}")
    if data.get("note"):
        print(f"NOTE:       {data['note']}")
    print(f"{'='*50}\n")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_api.py <path_to_video>")
        print("Example: python test_api.py test_videos/my_video.mp4")
    else:
        test_upload_and_predict(sys.argv[1])
