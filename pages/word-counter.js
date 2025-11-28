import { useState } from "react";
import Link from "next/link";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const charsWithSpace = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Writing Tool</div>
          <h1 className="page-title">Word Counter</h1>
          <p className="page-subtitle">
            Count words, characters and sentences instantly while typing.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <textarea
            className="input"
            rows="7"
            placeholder="Start typing text here..."
            style={{ resize: "none" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="grid grid-2" style={{ marginTop: 12 }}>
            <div className="result-box">
              <div className="result-title">Words</div>
              <div className="result-value">{words}</div>
            </div>
            <div className="result-box">
              <div className="result-title">Sentences</div>
              <div className="result-value">{sentences}</div>
            </div>
            <div className="result-box">
              <div className="result-title">Characters (with spaces)</div>
              <div className="result-value">{charsWithSpace}</div>
            </div>
            <div className="result-box">
              <div className="result-title">Characters (no spaces)</div>
              <div className="result-value">{charsNoSpace}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
