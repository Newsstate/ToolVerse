// pages/api/ai-spell-check.js
import { openai, GRAMMAR_MODEL } from "../../lib/openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body || {};
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing text" });
  }

  try {
    const response = await openai.responses.create({
      model: GRAMMAR_MODEL,
      input: [
        {
          role: "system",
          content:
            "You are a spell-checking assistant. Fix only spelling and obvious typos. Do NOT change tone or meaning. Return ONLY the corrected text, no explanations or extra output.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const fixedText = response.output[0].content[0].text;

    // Frontend expects { fixedText, misspellings }
    return res.status(200).json({
      fixedText,
      misspellings: [], // simple version: just show corrected text
    });
  } catch (err) {
    console.error("Spell check error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
