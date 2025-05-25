



import { GoogleGenAI } from "@google/genai";
import { Prompt } from "../model/promt.model.js"; // Correct file name spelling

// Initialize GoogleGenerativeAI client with API key from environment variables
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API,
});

// Controller function to handle prompt requests
export const sendPrompt = async (req, res) => {
  const { contents } = req.body;
  const userId = req.userId; // Assuming userId is passed through middleware or token

  // Validate input
  if (!contents || contents.trim() === "") {
    return res.status(400).json({ error: "Prompt content is required." });
  }
  if (!userId) {
    return res.status(401).json({ error: "User ID is missing." });
  }

  try {
    // Save user prompt in the database
    const userPrompt = await Prompt.create({
      userId,
      role: "user",
      content: contents, // Correct field name
    });

    // Generate AI response
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
    });

    // Extract generated text
    const generatedText = response?.text || "No response generated.";

    // Save the AI's response in the database
    await Prompt.create({
      userId,
      role: "assistant",
      content: generatedText, // Correct field name
    });

    // Send response back to the user
    return res.status(200).json({ reply: generatedText });
  } catch (error) {
    console.error("Error in sendPrompt:", error.message || error);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
};

