export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY not set" });
  }

  const { message, context } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: "Missing 'message' in body" });
  }

  const systemPrompt = `
You are an AI assistant representing AI Engineer Udith Narayan.
Be concise, friendly, and helpful. Use this context when relevant:

${context || "(No context provided)"}

Answer the user professionally and clearly.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: systemPrompt }] },
            { parts: [{ text: message }] }
          ]
        })
      }
    );

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry — I couldn't think of a response.";

    return res.status(200).json({ reply });
  } catch (e) {
    console.error("Chat handler error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
