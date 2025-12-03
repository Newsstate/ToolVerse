// pages/api/ai-summarize.js
import { openai, SUMMARY_MODEL } from "../../lib/openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, mode } = req.body || {};
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing text" });
  }

  const lengthPreset =
    mode === "short"
      ? "a very short summary (1–3 sentences)"
      : mode === "long"
      ? "a detailed but concise summary (5–8 sentences)"
      : "a medium-length summary (3–5 sentences)";

  try {
    const response = await openai.responses.create({
      model: SUMMARY_MODEL,
      input: [
        {
          role: "system",
          content: `You are a summarizer. Write ${lengthPreset} in simple, clear English. Do not add new facts or opinions. Return ONLY the summary text, no explanations.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const summary = response.output[0].content[0].text;

    return res.status(200).json({ summary });
  } catch (err) {
    console.error("Summarize error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
