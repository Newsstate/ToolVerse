import { useState } from "react";
import Link from "next/link";

export default function GrammarCheckerPage() {
  const [text, setText] = useState("");
  const [issues, setIssues] = useState([]);
  const [fixedText, setFixedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runCheck = async () => {
    if (!text.trim()) {
      setError("Please paste some text to check.");
      setIssues([]);
      setFixedText("");
      return;
    }

    setLoading(true);
    setError("");
    setIssues([]);
    setFixedText("");

    try {
      const res = await fetch("/api/ai-grammar-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error("Grammar check failed. Please try again.");
      }

      const data = await res.json();
      setIssues(data.issues || []);
      setFixedText(data.fixedText || "");
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setText("");
    setIssues([]);
    setFixedText("");
    setError("");
    setLoading(false);
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">AI Writing Tool</div>
          <h1 className="page-title">AI Grammar Checker</h1>
          <p className="page-subtitle">
            Use AI to fix grammar, punctuation and clarity while keeping your tone natural.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Input */}
            <div>
              <div className="field">
                <label className="label">Text to Check</label>
                <textarea
                  className="input"
                  rows={12}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your email, paragraph, or caption here…"
                />
              </div>
              <button
                type="button"
                className="btn"
                onClick={runCheck}
                disabled={loading}
              >
                {loading ? "Checking…" : "Run AI Grammar Check"}
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

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">AI Suggestions</div>
                <div
                  className="result-value"
                  style={{ fontSize: "0.9rem", textAlign: "left" }}
                >
                  {loading && "Analyzing your text…"}
                  {!loading && issues.length === 0 && !error && !fixedText && "—"}
                  {!loading && issues.length === 0 && fixedText && (
                    <span>No major issues found. Minor improvements applied below.</span>
                  )}
                  {issues.length > 0 && (
                    <ul style={{ paddingLeft: 18, margin: 0 }}>
                      {issues.map((issue, idx) => (
                        <li key={idx} style={{ marginBottom: 4 }}>
                          {issue.message}
                          {issue.before && issue.after && (
                            <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                              <strong>Before:</strong> {issue.before}
                              <br />
                              <strong>After:</strong> {issue.after}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="field" style={{ marginTop: 12 }}>
                <label className="label">AI-Corrected Version</label>
                <textarea
                  className="input"
                  rows={8}
                  value={fixedText}
                  readOnly
                  placeholder="The improved version of your text will appear here…"
                />
              </div>

              <p className="helper-text" style={{ marginTop: 8 }}>
                AI helps fix grammar and fluency, but always review the final text before
                sending or publishing.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
