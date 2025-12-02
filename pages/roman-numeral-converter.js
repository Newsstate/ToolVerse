import { useState } from "react";
import Link from "next/link";

const romanPairs = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

function toRoman(num) {
  if (num <= 0 || num >= 4000) return null;
  let n = num;
  let res = "";
  for (const [value, symbol] of romanPairs) {
    while (n >= value) {
      res += symbol;
      n -= value;
    }
  }
  return res;
}

function fromRoman(str) {
  if (!str) return null;
  const s = str.toUpperCase().trim();
  let i = 0;
  let total = 0;

  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  while (i < s.length) {
    const cur = map[s[i]];
    const next = map[s[i + 1]] ?? 0;
    if (!cur) return null;
    if (next > cur) {
      total += next - cur;
      i += 2;
    } else {
      total += cur;
      i += 1;
    }
  }

  return total;
}

export default function RomanNumeralConverterPage() {
  const [decimal, setDecimal] = useState("");
  const [roman, setRoman] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const convertFromDecimal = () => {
    setError("");
    const n = parseInt(decimal, 10);
    if (!Number.isInteger(n)) {
      setResult(null);
      setError("Enter an integer between 1 and 3999.");
      return;
    }
    const r = toRoman(n);
    if (!r) {
      setResult(null);
      setError("Supported range is 1 to 3999.");
      return;
    }
    setRoman(r);
    setResult((prev) => ({
      ...(prev || {}),
      decToRoman: r,
    }));
  };

  const convertFromRoman = () => {
    setError("");
    const r = roman.trim();
    if (!r) {
      setResult(null);
      return;
    }
    const n = fromRoman(r);
    if (!n || n <= 0 || n >= 4000) {
      setResult(null);
      setError(
        "Not a recognizable Roman numeral in the standard range (I–MMMCMXCIX)."
      );
      return;
    }
    setDecimal(String(n));
    setResult((prev) => ({
      ...(prev || {}),
      romanToDec: n,
    }));
  };

  const fmt = (n) =>
    typeof n === "number"
      ? n.toLocaleString(undefined, { maximumFractionDigits: 0 })
      : n;

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Number System Tool</div>
          <h1 className="page-title">Roman Numeral Converter</h1>
          <p className="page-subtitle">
            Convert between regular numbers (1–3999) and Roman numerals like XIV, MCMLXXX,
            etc.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>
        <div className="card">
          <div className="grid grid-2">
            <div>
              <div className="field">
                <label className="label">Decimal to Roman</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="number"
                    min="1"
                    max="3999"
                    value={decimal}
                    onChange={(e) => setDecimal(e.target.value)}
                    placeholder="e.g. 2024"
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={convertFromDecimal}
                  >
                    → Roman
                  </button>
                </div>
              </div>

              <div className="field" style={{ marginTop: 10 }}>
                <label className="label">Roman to Decimal</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="text"
                    value={roman}
                    onChange={(e) => setRoman(e.target.value)}
                    placeholder="e.g. MMXXIV"
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={convertFromRoman}
                  >
                    → Dec
                  </button>
                </div>
              </div>

              {error && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8, color: "#e11d48" }}
                >
                  {error}
                </p>
              )}

              <p className="helper-text" style={{ marginTop: 8 }}>
                This uses the standard modern Roman numeral rules (subtractive notation).
              </p>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">
                  Decimal → Roman
                </div>
                <div className="result-value">
                  {result?.decToRoman ?? "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  Roman → Decimal
                </div>
                <div className="result-value">
                  {result?.romanToDec != null
                    ? fmt(result.romanToDec)
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
