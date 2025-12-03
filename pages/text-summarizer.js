import { useState } from "react";
import Link from "next/link";

export default function TextSummarizerPage() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("medium"); // short / medium / long
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please paste some text to summarize.");
      setSummary("");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const res = await fetch("/api/ai-summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode }),
      });

      if (!res.ok) {
        throw new Error("Summarization failed. Please try again.");
      }

      const data = await res.json();
      setSummary(data.summary || "");
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setText("");
    setSummary("");
    setError("");
    setLoading(false);
  };

  const modeLabel =
    mode === "short" ? "Short" : mode === "long" ? "Detailed" : "Medium";

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">AI Reading Tool</div>
          <h1 className="page-title">AI Text Summarizer</h1>
          <p className="page-subtitle">
            Let AI condense long articles, emails or docs into short, readable summaries.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="field" style={{ marginBottom: 16 }}>
            <label className="label">Summary Length</label>
            <select
              className="input"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="short">Short (very brief)</option>
              <option value="medium">Medium</option>
              <option value="long">Detailed (more context)</option>
            </select>
          </div>

          <div className="grid grid-2">
            {/* Input */}
            <div>
              <div className="field">
                <label className="label">Original Text</label>
                <textarea
                  className="input"
                  rows={12}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste an article, blog, report or long message here…"
                />
              </div>
              <button
                type="button"
                className="btn"
                onClick={handleSummarize}
                disabled={loading}
              >
                {loading ? "Summarizing…" : `Generate ${modeLabel} Summary`}
              </button>
              <button
                type="button"
                className="btn"
                style={{
                  marginLeft: 8,
                  background: "transparent",
                  color: "inherit",
                  border: "1px solid var(--border-subtle, #ddd)",
                }}
                onClick={clearAll}
                disabled={loading}
              >
                Clear
              </button>
              {error && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8, color: "#d9534f" }}
                >
                  {error}
                </p>
              )}
            </div>

            {/* Summary */}
            <div>
              <div className="field">
                <label className="label">AI Summary</label>
                <textarea
                  className="input"
                  rows={12}
                  value={summary}
                  readOnly
                  placeholder="Your AI-generated summary will appear here…"
                />
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                Use summaries to skim long content quickly, then dive into the original
                text for full details if needed.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
