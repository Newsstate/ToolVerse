// pages/api/ai-grammar-check.js
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
            "You are a grammar and style assistant. Fix grammar, punctuation and clarity while keeping the user's original tone. Return ONLY the corrected text, with no explanation, no extra comments.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    // Responses API -> text is here:
    const fixedText = response.output[0].content[0].text;

    // Frontend expects { fixedText, issues }
    return res.status(200).json({
      fixedText,
      issues: [], // we’re not listing issues in this simplified version
    });
  } catch (err) {
    console.error("Grammar check error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
