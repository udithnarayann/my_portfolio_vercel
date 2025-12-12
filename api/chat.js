export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemPrompt = `
You are a helpful AI assistant for a developer portfolio website.
Be concise, professional, and friendly.
Answer questions about projects, skills, and experience.
`;

    const response = await fetch(
      `${process.env.VERCEL_URL || ""}/api/gemini`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: systemPrompt,
          prompt: message
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Chat Gemini Error:", data);
      return res.status(500).json({ error: "AI response failed" });
    }

    // Extract model text safely
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    res.status(200).json({ reply: text });
  } catch (err) {
    console.error("Chat API Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
