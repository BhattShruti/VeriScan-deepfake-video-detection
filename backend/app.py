from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from detector import DeepfakeDetector

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Resolve all runtime paths from the backend folder so behavior does not depend
# on where the server command was launched from.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
MODEL_WEIGHTS_PATH = os.path.join(BASE_DIR, "model_weights.h5")
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv', 'webm'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Global variable to store the last uploaded file path for the /predict endpoint
# In a production app, you would pass the session ID or file ID.
last_uploaded_file = None
detector = DeepfakeDetector(MODEL_WEIGHTS_PATH)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_video():
    global last_uploaded_file
    
    if 'video' not in request.files:
        return jsonify({"message": "No video part in the request"}), 400
    
    file = request.files['video']
    
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        last_uploaded_file = filepath
        
        return jsonify({
            "message": "File uploaded successfully",
            "filename": filename
        }), 200
    
    return jsonify({"message": "File type not allowed"}), 400

@app.route('/predict', methods=['GET'])
def predict():
    global last_uploaded_file
    
    if not last_uploaded_file or not os.path.exists(last_uploaded_file):
        return jsonify({"message": "No video uploaded for analysis"}), 400
    
    try:
        # Perform deepfake detection
        result, confidence = detector.analyze_video(last_uploaded_file)
        details = getattr(detector, "last_analysis_details", {}) or {}
        
        return jsonify({
            "prediction": result,
            "confidence": confidence,
            "model_mode": "trained" if detector.has_trained_weights else "prototype",
            "model_path": MODEL_WEIGHTS_PATH,
            "analysis_status": details.get("status", "ok"),
            "analysis_reason": details.get("reason"),
            "status": "success"
        }), 200
    except Exception as e:
        return jsonify({"message": f"Error during analysis: {str(e)}"}), 500

if __name__ == '__main__':
    print("VeriScan Backend Server starting on http://localhost:5000")
    app.run(debug=True, port=5000)
