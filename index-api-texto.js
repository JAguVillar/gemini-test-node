// prompt texto
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const PORT = 3000;

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyAna-Pb741FeSe5HfHkiLuvbZtxYHKAWOA");

// Route to interact with Google Generative AI
app.post("/api/generate", async (req, res) => {
  try {
    // Extract the prompt from the request body (if the client sends one)
    const { prompt } = req.body;

    // Set up the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Default prompt if none provided by client
    const userPrompt =
      prompt || "Me puedes hablar del contexto de nuestra conversacion?";

    // Generate content using the provided prompt
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = await response.text();

    // Send the generated text back to the client
    res.status(200).json({ text });
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
