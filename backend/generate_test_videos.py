"""
Generates two sample test videos for VeriScan testing:
1. A real-looking video with a simple face (for AUTHENTIC testing)
2. A distorted/noisy face video (for DEEPFAKE simulation)

These are synthetic videos using OpenCV - no downloads required!
Run: python generate_test_videos.py
"""
import cv2
import numpy as np
import os

OUTPUT_DIR = "test_videos"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_real_face_video(filename="real_sample.mp4", duration=3, fps=24):
    """Generate a clean, consistent face video (should be detected as AUTHENTIC)"""
    width, height = 640, 480
    total_frames = duration * fps
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(os.path.join(OUTPUT_DIR, filename), fourcc, fps, (width, height))
    
    for i in range(total_frames):
        # Create a frame with a solid background
        frame = np.zeros((height, width, 3), dtype=np.uint8)
        frame[:] = (40, 40, 50)  # Dark background
        
        # Draw a realistic-looking oval face shape
        center_x, center_y = width // 2, height // 2
        # Add subtle natural movement (like breathing)
        offset_y = int(2 * np.sin(i * 0.1))
        
        # Face oval
        cv2.ellipse(frame, (center_x, center_y + offset_y), (100, 130), 0, 0, 360, (200, 180, 160), -1)
        
        # Eyes
        cv2.ellipse(frame, (center_x - 35, center_y - 25 + offset_y), (18, 10), 0, 0, 360, (255, 255, 255), -1)
        cv2.ellipse(frame, (center_x + 35, center_y - 25 + offset_y), (18, 10), 0, 0, 360, (255, 255, 255), -1)
        cv2.circle(frame, (center_x - 35, center_y - 25 + offset_y), 7, (50, 30, 20), -1)
        cv2.circle(frame, (center_x + 35, center_y - 25 + offset_y), 7, (50, 30, 20), -1)
        
        # Nose
        pts = np.array([[center_x, center_y - 5 + offset_y], 
                        [center_x - 10, center_y + 15 + offset_y], 
                        [center_x + 10, center_y + 15 + offset_y]], np.int32)
        cv2.polylines(frame, [pts], True, (180, 160, 140), 2)
        
        # Mouth (slight smile)
        cv2.ellipse(frame, (center_x, center_y + 45 + offset_y), (30, 10), 0, 0, 180, (150, 80, 80), 2)
        
        # Eyebrows
        cv2.line(frame, (center_x - 55, center_y - 45 + offset_y), (center_x - 15, center_y - 40 + offset_y), (100, 80, 60), 3)
        cv2.line(frame, (center_x + 15, center_y - 40 + offset_y), (center_x + 55, center_y - 45 + offset_y), (100, 80, 60), 3)
        
        # Add consistent skin texture (natural noise)
        noise = np.random.normal(0, 3, frame.shape).astype(np.int16)
        frame = np.clip(frame.astype(np.int16) + noise, 0, 255).astype(np.uint8)
        
        out.write(frame)
    
    out.release()
    print(f"Created: {OUTPUT_DIR}/{filename} ({duration}s, {total_frames} frames)")


def generate_deepfake_video(filename="deepfake_sample.mp4", duration=3, fps=24):
    """Generate a face video with deepfake-like artifacts (should be detected as DEEPFAKE)"""
    width, height = 640, 480
    total_frames = duration * fps
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(os.path.join(OUTPUT_DIR, filename), fourcc, fps, (width, height))
    
    for i in range(total_frames):
        frame = np.zeros((height, width, 3), dtype=np.uint8)
        frame[:] = (40, 40, 50)
        
        center_x, center_y = width // 2, height // 2
        
        # Deepfake artifacts: inconsistent movement, flickering, warping
        jitter_x = int(np.random.normal(0, 3))  # Unnatural jitter
        jitter_y = int(np.random.normal(0, 3))
        
        # Face with inconsistent skin tone (common deepfake artifact)
        skin_color_r = 160 + int(20 * np.sin(i * 0.5))  # Flickering skin color
        skin_color_g = 140 + int(15 * np.sin(i * 0.7))
        skin_color_b = 120 + int(10 * np.sin(i * 0.3))
        
        cv2.ellipse(frame, (center_x + jitter_x, center_y + jitter_y), 
                    (100 + int(5 * np.sin(i * 0.2)), 130), 0, 0, 360, 
                    (skin_color_b, skin_color_g, skin_color_r), -1)
        
        # Eyes with slight misalignment (deepfake tell)
        left_eye_offset = int(2 * np.sin(i * 0.8))
        cv2.ellipse(frame, (center_x - 35 + jitter_x, center_y - 25 + jitter_y + left_eye_offset), (18, 10), 0, 0, 360, (255, 255, 255), -1)
        cv2.ellipse(frame, (center_x + 35 + jitter_x, center_y - 25 + jitter_y), (18, 10), 0, 0, 360, (255, 255, 255), -1)
        cv2.circle(frame, (center_x - 35 + jitter_x, center_y - 25 + jitter_y + left_eye_offset), 7, (50, 30, 20), -1)
        cv2.circle(frame, (center_x + 35 + jitter_x, center_y - 25 + jitter_y), 7, (50, 30, 20), -1)
        
        # Blending boundary artifact (visible edge around face - classic deepfake tell)
        cv2.ellipse(frame, (center_x + jitter_x, center_y + jitter_y), 
                    (105, 135), 0, 0, 360, (60, 60, 80), 2)
        
        # Mouth
        cv2.ellipse(frame, (center_x + jitter_x, center_y + 45 + jitter_y), (30, 10), 0, 0, 180, (150, 80, 80), 2)
        
        # Add heavy noise (common in low-quality deepfakes)
        noise = np.random.normal(0, 12, frame.shape).astype(np.int16)
        frame = np.clip(frame.astype(np.int16) + noise, 0, 255).astype(np.uint8)
        
        # Add occasional blur artifacts (deepfake blending)
        if i % 5 == 0:
            face_region = frame[center_y-130:center_y+130, center_x-100:center_x+100]
            if face_region.shape[0] > 0 and face_region.shape[1] > 0:
                face_region = cv2.GaussianBlur(face_region, (7, 7), 0)
                frame[center_y-130:center_y+130, center_x-100:center_x+100] = face_region
        
        out.write(frame)
    
    out.release()
    print(f"Created: {OUTPUT_DIR}/{filename} ({duration}s, {total_frames} frames)")


if __name__ == "__main__":
    print("=" * 50)
    print("VeriScan Test Video Generator")
    print("=" * 50)
    print()
    
    generate_real_face_video()
    generate_deepfake_video()
    
    print()
    print("=" * 50)
    print("DONE! Test videos are in the 'test_videos' folder.")
    print()
    print("How to test:")
    print("  1. Via UI:      Upload these videos in the frontend")
    print("  2. Via terminal: python test_api.py test_videos/real_sample.mp4")
    print("  3. Via terminal: python test_api.py test_videos/deepfake_sample.mp4")
    print("=" * 50)
