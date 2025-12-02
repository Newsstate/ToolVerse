import { useState } from "react";
import Link from "next/link";

function isValidHex(str) {
  return /^[0-9a-fA-F]+$/.test(str);
}

export default function HexCalculatorPage() {
  const [decimal, setDecimal] = useState("");
  const [hex, setHex] = useState("");
  const [result, setResult] = useState(null);

  const convertFromDecimal = () => {
    const n = parseInt(decimal, 10);
    if (!Number.isInteger(n) || n < 0) {
      setResult(null);
      return;
    }
    const h = n.toString(16).toUpperCase();
    setHex(h);
    setResult((prev) => ({
      ...(prev || {}),
      decToHex: h,
    }));
  };

  const convertFromHex = () => {
    const s = hex.trim();
    if (!isValidHex(s)) {
      setResult(null);
      return;
    }
    const n = parseInt(s, 16);
    setDecimal(String(n));
    setResult((prev) => ({
      ...(prev || {}),
      hexToDec: n,
    }));
  };

  const fmt = (n) =>
    typeof n === "number"
      ? n.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })
      : n;

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Number System Tool</div>
          <h1 className="page-title">Hex Calculator</h1>
          <p className="page-subtitle">
            Convert between decimal and hexadecimal (base 16) for coding, color values
            and low-level work.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>
        <div className="card">
          <div className="grid grid-2">
            {/* Inputs */}
            <div>
              <div className="field">
                <label className="label">Decimal to Hex</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    value={decimal}
                    onChange={(e) => setDecimal(e.target.value)}
                    placeholder="e.g. 255"
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={convertFromDecimal}
                  >
                    → Hex
                  </button>
                </div>
              </div>

              <div className="field" style={{ marginTop: 10 }}>
                <label className="label">Hex to Decimal</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="text"
                    value={hex}
                    onChange={(e) => setHex(e.target.value)}
                    placeholder="e.g. FF"
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={convertFromHex}
                  >
                    → Dec
                  </button>
                </div>
              </div>

              <p className="helper-text" style={{ marginTop: 8 }}>
                Hex digits: 0–9 and A–F. This tool only supports non-negative integers.
              </p>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  Decimal → Hex
                </div>
                <div className="result-value">
                  {result?.decToHex ?? "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  Hex → Decimal
                </div>
                <div className="result-value">
                  {result?.hexToDec != null
                    ? fmt(result.hexToDec)
                    : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
