import { GoogleGenerativeAI } from "@google/generative-ai";

export async function callGemini({ system, prompt }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing at runtime");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const result = await model.generateContent(
    system ? `${system}\n\n${prompt}` : prompt
  );

  return {
    text: result.response.text()
  };
}
