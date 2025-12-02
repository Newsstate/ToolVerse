import { useState } from "react";
import Link from "next/link";

function normalizeHex(input) {
  let hex = input.trim();
  if (!hex) return null;

  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }
  hex = hex.replace(/[^0-9a-fA-F]/g, "");

  if (hex.length === 3) {
    // Expand short form: #abc -> #aabbcc
    hex = hex
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }

  if (hex.length !== 6) return null;
  return hex.toUpperCase();
}

function hexToRgb(hexInput) {
  const hex = normalizeHex(hexInput);
  if (!hex) {
    throw new Error("Please enter a valid 3- or 6-digit hex colour.");
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  if (
    [r, g, b].some((v) => Number.isNaN(v) || v < 0 || v > 255)
  ) {
    throw new Error("Invalid hex colour value.");
  }

  return { r, g, b, hex: `#${hex}` };
}

export default function HexToRgbConverterPage() {
  const [hexInput, setHexInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setError("");
      const res = hexToRgb(hexInput);
      setResult(res);
    } catch (e) {
      setResult(null);
      setError(e.message || "Invalid hex input.");
    }
  };

  const clearAll = () => {
    setHexInput("");
    setResult(null);
    setError("");
  };

  const rgbString =
    result && `rgb(${result.r}, ${result.g}, ${result.b})`;

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Developer / Design Tool</div>
          <h1 className="page-title">Hex to RGB Converter</h1>
          <p className="page-subtitle">
            Convert a hex colour (e.g. #FF00FF or #0F0) to its RGB components with a live preview.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Hex input */}
            <div>
              <div className="field">
                <label className="label">Hex Colour</label>
                <input
                  className="input"
                  type="text"
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value)}
                  placeholder='e.g. #FF00FF or #0F0'
                />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button type="button" className="btn" onClick={convert}>
                  Convert to RGB
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

            {/* RGB output */}
            <div>
              <div className="result-box">
                <div className="result-title">RGB Values</div>
                <div className="result-value" style={{ fontSize: "0.95rem" }}>
                  {result ? (
                    <>
                      <div>R: {result.r}</div>
                      <div>G: {result.g}</div>
                      <div>B: {result.b}</div>
                    </>
                  ) : (
                    "—"
                  )}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">CSS rgb() String</div>
                <div className="result-value">
                  {rgbString || "—"}
                </div>
              </div>

              {result && (
                <div
                  style={{
                    marginTop: 12,
                    padding: 8,
                    borderRadius: 8,
                    border: "1px solid var(--border-subtle, #ddd)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 6,
                      border: "1px solid rgba(0,0,0,0.1)",
                      background: result.hex,
                    }}
                  />
                  <div style={{ fontSize: "0.9rem" }}>
                    <div>Preview</div>
                    <div style={{ opacity: 0.7 }}>{result.hex}</div>
                  </div>
                </div>
              )}

              <p className="helper-text" style={{ marginTop: 8 }}>
                Short hex like #0F0 is expanded to full form (#00FF00) before converting.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
