// api/chat.js
export default async function handler(req, res) {
  // 1. Method Check
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 2. Load & Sanitize Key
  let apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    // Remove all quotes, spaces, and newlines
    apiKey = apiKey.replace(/["'\s]/g, "").trim();
  }

  // 3. Fail fast if key is missing
  if (!apiKey) {
    console.error("Critical: GEMINI_API_KEY is missing from Vercel Environment.");
    return res.status(500).json({ error: "Server Error: API Key Configuration Missing" });
  }

  const { message, context } = req.body || {};
  
  const systemInstruction = `
    You are an AI assistant representing AI Engineer Udith Narayan.
    Be concise, friendly, and helpful. 
    Context: ${JSON.stringify(context || {})}
  `;

  try {
    // 4. Send Request (Key in HEADER, not URL)
    // We revert to 'gemini-1.5-flash' temporarily to ensure stability. 
    // If this works, we can try 2.5 later.
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey // <--- Key goes here now
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ parts: [{ text: message || "Hello" }] }]
        })
      }
    );

    const data = await response.json();

    // 5. Handle Google Errors
    if (!response.ok) {
      console.error("Google API Error:", JSON.stringify(data, null, 2));
      return res.status(response.status).json({ 
        error: data.error?.message || "AI Error" 
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    return res.status(200).json({ reply });

  } catch (e) {
    console.error("Handler Exception:", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
