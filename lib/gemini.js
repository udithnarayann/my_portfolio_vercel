export async function callGemini({ system, prompt }) {
  const apiKey = process.env.GEMINI_API_KEY;

  console.log("Gemini key present:", !!apiKey);

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing at runtime");
  }

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  console.log("Gemini URL contains key:", url.includes("key="));

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: system ? `${system}\n\n${prompt}` : prompt }]
      }
    ]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API Error:", data);
    throw new Error("Gemini request failed");
  }

  return data;
}
