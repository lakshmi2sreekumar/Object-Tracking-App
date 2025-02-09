document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    let formData = new FormData(this);
    let statusText = document.getElementById("status");
    let resultDiv = document.getElementById("result");

    statusText.textContent = "Uploading...";

    try {
        let response = await fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData
        });

        let data = await response.json();
        // Update the result display
        if (data.result.status === 'success') {
            resultDiv.innerHTML = `
                <p style="color: green;">${data.result.message}</p>
                <img src="http://127.0.0.1:5000/${data.image_path}" alt="Detected Object" style="max-width: 100%; height: auto;">
            `;
        } else {
            resultDiv.innerHTML = `<p style="color: red;">${data.result.message}</p>`;
        }
        statusText.textContent = "Upload complete.";
        
        
    } catch (error) {
        console.error("Error:", error);
        statusText.textContent = "Error uploading file.";
    }
});
