import { useState } from "react";
import Link from "next/link";

export default function SpellCheckerPage() {
  const [text, setText] = useState("");
  const [misspellings, setMisspellings] = useState([]);
  const [fixedText, setFixedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runCheck = async () => {
    if (!text.trim()) {
      setError("Please paste some text to check.");
      setMisspellings([]);
      setFixedText("");
      return;
    }

    setLoading(true);
    setError("");
    setMisspellings([]);
    setFixedText("");

    try {
      const res = await fetch("/api/ai-spell-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error("Spell check failed. Please try again.");
      }

      const data = await res.json();
      setMisspellings(data.misspellings || []);
      setFixedText(data.fixedText || "");
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setText("");
    setMisspellings([]);
    setFixedText("");
    setError("");
    setLoading(false);
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">AI Writing Tool</div>
          <h1 className="page-title">AI Spell Checker</h1>
          <p className="page-subtitle">
            Let AI spot misspellings and offer suggestions while preserving your style.
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
                  placeholder="Paste your copy, caption or email here…"
                />
              </div>
              <button
                type="button"
                className="btn"
                onClick={runCheck}
                disabled={loading}
              >
                {loading ? "Checking…" : "Run AI Spell Check"}
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
                <div className="result-title">Potential Misspellings</div>
                <div
                  className="result-value"
                  style={{ fontSize: "0.9rem", textAlign: "left" }}
                >
                  {loading && "Scanning for spelling errors…"}
                  {!loading && misspellings.length === 0 && !error && !fixedText && "—"}
                  {!loading && misspellings.length === 0 && fixedText && (
                    <span>No major spelling issues found. Minor fixes applied below.</span>
                  )}
                  {misspellings.length > 0 && (
                    <ul style={{ paddingLeft: 18, margin: 0 }}>
                      {misspellings.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: 4 }}>
                          <strong>{item.word}</strong>
                          {item.suggestion && (
                            <>
                              {" "}
                              → <span>{item.suggestion}</span>
                            </>
                          )}
                          {item.reason && (
                            <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                              {item.reason}
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
                  placeholder="The spell-checked version of your text will appear here…"
                />
              </div>

              <p className="helper-text" style={{ marginTop: 8 }}>
                AI suggestions may change brand names or slang. Always double-check
                important names, prices and details.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
