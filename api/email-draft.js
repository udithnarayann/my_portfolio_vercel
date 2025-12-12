// api/email-draft.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY not set" });
  }

  const { notes } = req.body || {};
  if (!notes) {
    return res.status(400).json({ error: "Missing 'notes' in body" });
  }

  const systemInstruction = `
    You are a professional email drafting assistant.
    Rewrite the user's rough notes into a concise, professional email for a recruiter or hiring manager.
    Keep it polite, confident, and focused. Do NOT invent details.
  `;

  try {
    // UPDATED MODEL: gemini-2.5-flash-lite
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ parts: [{ text: `Notes:\n${notes}` }] }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", JSON.stringify(data, null, 2));
      return res.status(response.status).json({ 
        error: data.error?.message || "AI Request Failed" 
      });
    }

    const email =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate the email.";

    return res.status(200).json({ email });
  } catch (e) {
    console.error("Email handler exception:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

