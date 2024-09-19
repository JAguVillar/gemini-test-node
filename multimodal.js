const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyAna-Pb741FeSe5HfHkiLuvbZtxYHKAWOA");

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "esto es un ticket de consumicion en un restaurante, puedes decirme item por item, el precio de cada uno y cantidades?" +
    "estamos en una reunion de amigos, somos 4, yo, santiago, ignacio y matias, y necesitamos dividir gastos, yo consumí, el iced green tea y la miso soup, santiago consumió el tofu y el chirashi, ignacio la ensalada y matias el hot green tea. Me podrías detallar cuanto debería pagar cada uno de ellos? en español por favor";

  const imageParts = [fileToGenerativePart("cuenta.jpg", "image/jpg")];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
