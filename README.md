# Video Object Detection with YOLOv8

This project allows users to upload a video and detect a specified object within it using YOLOv8. The backend is built with Flask and OpenCV, and the frontend uses HTML, CSS, and JavaScript to interact with the server.

## Overview

This project enables users to:
- Upload a video file via a web interface.
- Specify an object name (e.g., "Glasses", "Remote", "Keys") for detection.
- Process the video using a YOLOv8 model to determine whether the object is present.
- Receive a JSON response indicating the detection result.

## Features

- **Video Upload:** Upload videos directly from your browser.
- **Object Detection:** Use YOLOv8 for real-time object detection in videos.
- **JSON Response:** Get an easy-to-read result indicating if the object was found.
- **Cross-Origin Support:** CORS enabled to allow requests from different origins.

## Usage
Running the Server
Start the Flask server by running:
    python server.py
The server will run on http://localhost:5000.

Uploading a Video
Open the provided HTML file (e.g., index.html) in your browser.
Enter the name of the object you want to detect in the text input.
Choose a video file using the file input.
Click the Upload button.
The detection result (e.g., "tv detected in video!" or "tv not found in video.") will be displayed on the page.

