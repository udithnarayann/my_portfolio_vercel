// api/chat.js
export default async function handler(req, res) {
  console.log("Key Status:", process.env.GEMINI_API_KEY ? "Loaded" : "Missing");
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

  const systemInstruction = `
    You are an AI assistant representing AI Engineer Udith Narayan.
    Be concise, friendly, and helpful. 
    
    Here is the context about Udith (Skills, Projects, Experience):
    ${JSON.stringify(context || {})}

    Answer the user professionally and clearly based strictly on this context.
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
          contents: [{ parts: [{ text: message }] }]
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

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry — I couldn't think of a response.";

    return res.status(200).json({ reply });
  } catch (e) {
    console.error("Chat handler exception:", e);
    return res.status(500).json({ error: "Server error" });
  }
}


