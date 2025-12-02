import { useState } from "react";
import Link from "next/link";

function textToCodePoints(str) {
  const result = [];
  for (const ch of str) {
    const code = ch.codePointAt(0);
    if (code != null) {
      result.push({
        char: ch,
        code,
      });
    }
  }
  return result;
}

function formatCodePointHex(cp) {
  return "U+" + cp.toString(16).toUpperCase().padStart(4, "0");
}

function parseCodePointToken(token) {
  let t = token.trim();
  if (!t) return null;

  // Strip U+ or 0x prefix if present
  if (/^U\+/i.test(t)) {
    t = t.slice(2);
    return parseInt(t, 16);
  }
  if (/^0x/i.test(t)) {
    t = t.slice(2);
    return parseInt(t, 16);
  }

  // Decide hex vs decimal: if contains A-F, treat as hex
  if (/[A-Fa-f]/.test(t)) {
    return parseInt(t, 16);
  }

  // Otherwise decimal
  return parseInt(t, 10);
}

function codePointsToText(input) {
  const tokens = input
    .split(/[\s,]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  if (tokens.length === 0) return "";

  const chars = [];
  for (const token of tokens) {
    const cp = parseCodePointToken(token);
    if (!Number.isFinite(cp) || cp < 0 || cp > 0x10ffff) {
      throw new Error(`Invalid code point: "${token}"`);
    }
    chars.push(String.fromCodePoint(cp));
  }
  return chars.join("");
}

export default function UnicodeConverterPage() {
  const [mode, setMode] = useState("text-to-code");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setError("");
      if (mode === "text-to-code") {
        const cps = textToCodePoints(input);
        const lines = cps.map((item) => {
          const hex = formatCodePointHex(item.code);
          const dec = item.code;
          const charDesc =
            item.char === " " ? "(space)" : item.char === "\n" ? "(newline)" : item.char;
          return `${hex}  (dec ${dec})  ${charDesc}`;
        });
        setOutput(lines.join("\n"));
      } else {
        const text = codePointsToText(input);
        setOutput(text);
      }
    } catch (e) {
      setOutput("");
      setError(e.message || "Conversion error.");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const isTextToCode = mode === "text-to-code";

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Developer Tool</div>
          <h1 className="page-title">Unicode Converter</h1>
          <p className="page-subtitle">
            Convert text to Unicode code points and back again (U+XXXX, hex or decimal).
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="field" style={{ marginBottom: 16 }}>
            <label className="label">Mode</label>
            <select
              className="input"
              value={mode}
              onChange={(e) => {
                setMode(e.target.value);
                setInput("");
                setOutput("");
                setError("");
              }}
            >
              <option value="text-to-code">Text → Unicode Code Points</option>
              <option value="code-to-text">Code Points → Text</option>
            </select>
          </div>

          <div className="grid grid-2">
            {/* Input side */}
            <div>
              <div className="field">
                <label className="label">
                  {isTextToCode ? "Text Input" : "Code Points Input"}
                </label>
                <textarea
                  className="input"
                  rows={10}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isTextToCode
                      ? 'e.g. Hello 😊'
                      : 'e.g. U+0048 U+0065 U+006C U+006C U+006F U+1F60A'
                  }
                />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button type="button" className="btn" onClick={convert}>
                  Convert
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

            {/* Output side */}
            <div>
              <div className="field">
                <label className="label">
                  {isTextToCode ? "Code Points Output" : "Text Output"}
                </label>
                <textarea
                  className="input"
                  rows={10}
                  value={output}
                  readOnly
                  placeholder="Result will appear here…"
                />
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                In code-points mode you can use formats like <code>U+0041</code>,{" "}
                <code>0041</code> (hex) or <code>65</code> (decimal), separated by spaces or commas.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
