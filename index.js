const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Enable CORS for all requests
app.use(cors());
app.use(express.json());

// Set up multer for file handling
const upload = multer({ dest: "uploads/" }); // Uploads folder for temporary storage

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyAna-Pb741FeSe5HfHkiLuvbZtxYHKAWOA");

// Helper function to convert file to base64 format
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: fs.readFileSync(path).toString("base64"),
      mimeType,
    },
  };
}

// Route to handle text and image prompts
app.post("/api/generate", upload.single("image"), async (req, res) => {
  try {
    const { prompt } = req.body;
    const imagePath = req.file.path;
    const mimeType = req.file.mimetype;

    // Prepare the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare the image as part of the multimodal input
    const imageParts = [fileToGenerativePart(imagePath, mimeType)];

    // Generate content using the prompt and the image
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = await response.text();

    // Send the generated text back to the client
    res.status(200).json({ text });

    // Clean up uploaded file after processing
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error("Error generating content:", error);
    res
      .status(500)
      .json({ message: "Error generating content", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
