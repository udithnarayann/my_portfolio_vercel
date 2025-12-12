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

    const data = await callGemini({
      system: systemPrompt,
      prompt
    });

    const email =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Failed to generate email.";

    res.status(200).json({ email });
  } catch (err) {
    console.error("Email Draft API Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
