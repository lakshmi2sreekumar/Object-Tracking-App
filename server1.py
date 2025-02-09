
from flask import send_from_directory
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
from ultralytics import YOLO
import os

app = Flask(__name__)  # Use __name_
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load YOLO Model
model = YOLO("yolov8s.pt")
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
@app.route("/upload", methods=["POST"])
def upload_file():
    if "video" not in request.files:
        return jsonify({"error": "No video uploaded"}), 400

    video = request.files["video"]
    object_name = request.form.get("object_name", "").strip()

    if not object_name:
        return jsonify({"error": "Object name is required"}), 400

    video_path = os.path.join(UPLOAD_FOLDER, "video.mp4")
    video.save(video_path)  # Save uploaded file

    # Run object detection
    result, image_path  = detect_object(video_path, object_name)
    print(f"Detection result: {result}")  # Debugging log
    return jsonify({
        "result": result,
        "image_path": image_path
        
        })

def detect_object(video_path, search_object):
    cap = cv2.VideoCapture(video_path)
   
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame)
        result = results[0]
        boxes = result.boxes

        for box in boxes:
            cls = int(box.cls[0].item())  # Get object class ID
            object_detected = model.names[cls]  # Get object name
           

            if object_detected.lower() == search_object.lower():
                x1, y1, x2, y2 = box.xyxy[0].int().tolist()
                color = (0, 255, 0)  # Green
                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                label = f"{object_detected}"
                cv2.putText(frame, label, (x1, max(y1 - 10, 10)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

                # Save the frame with the detected object
                image_path = os.path.join(UPLOAD_FOLDER, "detected_object.jpg")
                cv2.imwrite(image_path, frame)
                cap.release()
                return {"status": "success", "message": f"{search_object} detected in video!"}, image_path  
                

    cap.release()
    return {"status": "failure", "message": f"{search_object} not found in video."},None


if __name__ == "__main__":
    app.run(debug=True, port=5000)