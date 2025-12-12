import { callGemini } from "../lib/gemini.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const systemPrompt = `
You are a helpful AI assistant for a developer portfolio website.
Be concise, professional, and friendly.
`;

    const result = await callGemini({
      system: systemPrompt,
      prompt: message
    });

    res.status(200).json({ reply: result.text });
  } catch (err) {
    console.error("Chat API Error:", err);
    res.status(500).json({ error: "Chat failed" });
  }
}
