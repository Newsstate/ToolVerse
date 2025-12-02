import { useState } from "react";
import Link from "next/link";

function binaryStringToText(input) {
  if (!input.trim()) return "";

  // Normalise: split by whitespace OR if continuous, chunk into 8 bits
  let chunks = input
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean);

  if (chunks.length === 1 && /^[01]+$/.test(chunks[0]) && chunks[0].length % 8 === 0) {
    const s = chunks[0];
    const arr = [];
    for (let i = 0; i < s.length; i += 8) {
      arr.push(s.slice(i, i + 8));
    }
    chunks = arr;
  }

  const chars = chunks.map((bin) => {
    if (!/^[01]+$/.test(bin) || bin.length > 32) {
      throw new Error(`Invalid binary chunk: "${bin}"`);
    }
    const code = parseInt(bin, 2);
    if (!Number.isFinite(code)) {
      throw new Error(`Invalid binary chunk: "${bin}"`);
    }
    return String.fromCharCode(code);
  });

  return chars.join("");
}

export default function BinaryToTextConverterPage() {
  const [binaryInput, setBinaryInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setError("");
      const text = binaryStringToText(binaryInput);
      setTextOutput(text);
    } catch (e) {
      setTextOutput("");
      setError(e.message || "Invalid binary input.");
    }
  };

  const clearAll = () => {
    setBinaryInput("");
    setTextOutput("");
    setError("");
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Developer Tool</div>
          <h1 className="page-title">Binary to Text Converter</h1>
          <p className="page-subtitle">
            Convert binary bytes (e.g. 01001000 01101001) into plain text characters.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Binary input */}
            <div>
              <div className="field">
                <label className="label">Binary Input</label>
                <textarea
                  className="input"
                  rows={10}
                  value={binaryInput}
                  onChange={(e) => setBinaryInput(e.target.value)}
                  placeholder='e.g. 01001000 01101001 (which is "Hi")'
                />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button type="button" className="btn" onClick={convert}>
                  Convert to Text
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{
                    background: "transparent",
                    color: "inherit",
                    border: "1px solid var(--border-subtle, #ddd)",
                  }}
                  onClick={clearAll}
                >
                  Clear
                </button>
              </div>
              {error && (
                <p className="helper-text" style={{ marginTop: 8, color: "#d9534f" }}>
                  {error}
                </p>
              )}
            </div>

            {/* Text output */}
            <div>
              <div className="field">
                <label className="label">Text Output</label>
                <textarea
                  className="input"
                  rows={10}
                  value={textOutput}
                  readOnly
                  placeholder="Decoded text will appear here…"
                />
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                You can enter space-separated bytes, comma-separated values, or one long
                binary string whose length is a multiple of 8.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
