import { callGemini } from "../lib/gemini.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { purpose, details, tone } = req.body;

    if (!purpose || !details) {
      return res.status(400).json({
        error: "Purpose and details are required"
      });
    }

    const systemPrompt = `
You are an expert professional email writer.
Write clear, well-structured, polite emails.
Do not include emojis.
`;

    const prompt = `
Purpose: ${purpose}
Tone: ${tone || "professional"}
Details:
${details}

Write the email.
`;

    const result = await callGemini({
      system: systemPrompt,
      prompt
    });

    res.status(200).json({ email: result.text });
  } catch (err) {
    console.error("Email Draft API Error:", err);
    res.status(500).json({ error: "Email generation failed" });
  }
}
