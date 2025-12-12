// api/chat.js
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

  // 1. Define the System Instruction (Behavior & Context)
  const systemInstruction = `
    You are an AI assistant representing AI Engineer Udith Narayan.
    Be concise, friendly, and helpful. 
    
    Here is the context about Udith (Skills, Projects, Experience):
    ${JSON.stringify(context || {})}

    Answer the user professionally and clearly based strictly on this context.
  `;

  try {
    // 2. Use the correct model: gemini-2.5-flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // 3. Move system prompt to its own dedicated field
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    const data = await response.json();

    // 4. Detailed Error Logging
    if (!response.ok) {
      console.error("Gemini 2.5 API Error:", JSON.stringify(data, null, 2));
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
