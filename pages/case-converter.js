import { useState } from "react";
import Link from "next/link";

function toSentenceCase(text) {
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (m) => m.toUpperCase());
}

function toTitleCase(text) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => {
      if (!word) return "";
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function swapCase(text) {
  return text
    .split("")
    .map((ch) =>
      ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase()
    )
    .join("");
}

export default function CaseConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = (mode) => {
    if (!input) {
      setOutput("");
      return;
    }

    let result = input;
    if (mode === "upper") result = input.toUpperCase();
    if (mode === "lower") result = input.toLowerCase();
    if (mode === "sentence") result = toSentenceCase(input);
    if (mode === "title") result = toTitleCase(input);
    if (mode === "swap") result = swapCase(input);
    setOutput(result);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Writing Tool</div>
          <h1 className="page-title">Case Converter</h1>
          <p className="page-subtitle">
            Instantly change text to UPPERCASE, lowercase, Sentence case or Title Case.
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
                <label className="label">Input Text</label>
                <textarea
                  className="input"
                  rows={10}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste any text here…"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleConvert("upper")}
                >
                  UPPERCASE
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleConvert("lower")}
                >
                  lowercase
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleConvert("sentence")}
                >
                  Sentence case
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleConvert("title")}
                >
                  Title Case
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleConvert("swap")}
                >
                  sWAP cASE
                </button>
              </div>

              <button type="button" className="btn" onClick={clearAll}>
                Clear
              </button>
            </div>

            {/* Output */}
            <div>
              <div className="field">
                <label className="label">Converted Text</label>
                <textarea
                  className="input"
                  rows={10}
                  value={output}
                  readOnly
                  placeholder="Converted result will appear here…"
                />
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                Title and sentence case are heuristic and may not be perfect for names,
                acronyms or special formatting.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
