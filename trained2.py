import cv2
from ultralytics import YOLO

# Load YOLOv8 model
model = YOLO("yolov8s.pt")
from flask import request
import cv2

video_file = request.files["video"]
video_path = "uploads/user_video.mp4"
video_file.save(video_path)

cap = cv2.VideoCapture(video_path)  # Load dynamically uploaded video

# Open recorded video file
#cap = cv2.VideoCapture("video.mp4")  # Change to your video file

# Specify the object to search for
search_object = "tv"  # Change this to any object name (e.g., "car", "dog")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break  # Exit if video ends

    results = model(frame)  # Run YOLO detection
    result = results[0]
    boxes = result.boxes

    found = False  # Flag to track if object is found

    for box in boxes:
        x1, y1, x2, y2 = box.xyxy[0].int().tolist()
        conf = box.conf[0].item()
        cls = int(box.cls[0].item())

        # Get the detected object name
        object_name = model.names[cls]

        # Check if it matches the search object
        if object_name == search_object:
            found = True
            label = f"{object_name} {conf:.2f}"
            color = (0, 255, 0)  # Green
            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
            cv2.putText(frame, label, (x1, max(y1 - 10, 10)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

    # Show the frame
    cv2.imshow("YOLOv8 Object Search", frame)

    # Pause if object is found
    if found:
        print(f"{search_object} detected! Press any key to continue...")
        cv2.waitKey(0)  # Pause until user presses a key

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break  # Press 'q' to exit

cap.release()
cv2.destroyAllWindows()

