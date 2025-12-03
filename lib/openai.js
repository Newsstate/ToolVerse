// lib/openai.js
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in .env.local");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Optional model env variables
export const GRAMMAR_MODEL =
  process.env.OPENAI_MODEL_GPT || "gpt-4.1-mini";

export const SUMMARY_MODEL =
  process.env.OPENAI_MODEL_SUMMARY || "gpt-4.1-mini";
