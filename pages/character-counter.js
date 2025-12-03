import { useState, useMemo } from "react";
import Link from "next/link";

function analyzeChars(text, limit) {
  const length = text.length;
  const remaining = limit ? limit - length : null;
  const bytes = new TextEncoder().encode(text).length;
  return { length, remaining, bytes };
}

export default function CharacterCounterPage() {
  const [text, setText] = useState("");
  const [limit, setLimit] = useState("280");

  const numericLimit = useMemo(() => {
    const n = parseInt(limit, 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [limit]);

  const stats = useMemo(
    () => analyzeChars(text, numericLimit),
    [text, numericLimit]
  );

  const clearAll = () => {
    setText("");
  };

  const status =
    numericLimit == null
      ? null
      : stats.remaining >= 0
      ? `Within limit by ${stats.remaining} characters`
      : `Over limit by ${Math.abs(stats.remaining)} characters`;

  const statusColor =
    numericLimit == null
      ? undefined
      : stats.remaining >= 0
      ? "#28a745"
      : "#d9534f";

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Writing Tool</div>
          <h1 className="page-title">Character Counter</h1>
          <p className="page-subtitle">
            Track characters, see byte length and stay within limits for tweets, SMS, ads and more.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Text input */}
            <div>
              <div className="field">
                <label className="label">Character Limit (optional)</label>
                <input
                  className="input"
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  placeholder="e.g. 280 for X / Twitter"
                />
              </div>

              <div className="field">
                <label className="label">Your Text</label>
                <textarea
                  className="input"
                  rows={14}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your caption, SMS or copy here…"
                />
              </div>

              <button type="button" className="btn" onClick={clearAll}>
                Clear Text
              </button>
            </div>

            {/* Stats */}
            <div>
              <div className="result-box">
                <div className="result-title">Characters (including spaces)</div>
                <div className="result-value">
                  {stats.length.toLocaleString()}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Bytes (UTF-8)</div>
                <div className="result-value">
                  {stats.bytes.toLocaleString()}
                </div>
              </div>

              {numericLimit != null && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Limit Status</div>
                  <div
                    className="result-value"
                    style={{ fontSize: "0.95rem", color: statusColor }}
                  >
                    {status}
                  </div>
                </div>
              )}

              <p className="helper-text" style={{ marginTop: 8 }}>
                Some platforms (like SMS or ads) count bytes differently for special
                characters. Use this as a quick approximation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
