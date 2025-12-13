import { GoogleGenAI } from "@google/genai";

export async function callGemini({ system, prompt }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing");
  }

  const ai = new GoogleGenAI({
    apiKey
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: system ? `${system}\n\n${prompt}` : prompt
          }
        ]
      }
    ]
  });

  function cleanText(text) {
    return text
      .replace(/\*\*/g, "")     // remove **
      .replace(/\*/g, "")       // remove *
      .replace(/#+\s?/g, "")    // remove markdown headers
      .trim();
  }
  
  return {
    text: cleanText(response.text)
  };

}
