export default async function handler(req, res) {
  try {
    const { prompt, system } = req.body;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: system
            ? { parts: [{ text: system }] }
            : undefined,
        }),
      }
    );

    const data = await geminiRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Gemini API Error", err);
    res.status(500).json({ error: "AI request failed" });
  }
}
