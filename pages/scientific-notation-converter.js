import { useState } from "react";
import Link from "next/link";

export default function ScientificNotationConverterPage() {
  const [normal, setNormal] = useState("");
  const [mantissa, setMantissa] = useState("");
  const [exponent, setExponent] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const convertToScientific = () => {
    setError("");
    const x = parseFloat(normal);
    if (!Number.isFinite(x)) {
      setResult(null);
      setError("Enter a valid number to convert.");
      return;
    }
    if (x === 0) {
      setMantissa("0");
      setExponent("0");
      setResult({
        sci: "0 × 10^0",
        normal: 0,
      });
      return;
    }

    const sign = x < 0 ? -1 : 1;
    const abs = Math.abs(x);
    const exp = Math.floor(Math.log10(abs));
    const man = sign * (abs / Math.pow(10, exp));

    setMantissa(String(man));
    setExponent(String(exp));
    setResult({
      sci: `${man} × 10^${exp}`,
      normal: x,
    });
  };

  const convertToNormal = () => {
    setError("");
    const m = parseFloat(mantissa);
    const e = parseInt(exponent, 10);
    if (!Number.isFinite(m) || !Number.isInteger(e)) {
      setResult(null);
      setError("Enter a valid mantissa and integer exponent.");
      return;
    }
    const value = m * Math.pow(10, e);
    setNormal(String(value));
    setResult({
      sci: `${m} × 10^${e}`,
      normal: value,
    });
  };

  const fmt = (n) =>
    typeof n === "number"
      ? n.toLocaleString(undefined, {
          maximumFractionDigits: 10,
        })
      : n;

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Number Format Tool</div>
          <h1 className="page-title">Scientific Notation Converter</h1>
          <p className="page-subtitle">
            Switch between standard numbers and scientific notation a × 10^b for very
            large or very small values.
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
                <label className="label">
                  Normal Number → Scientific Notation
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="number"
                    value={normal}
                    onChange={(e) => setNormal(e.target.value)}
                    placeholder="e.g. 1230000 or 0.00045"
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={convertToScientific}
                  >
                    → a × 10^b
                  </button>
                </div>
              </div>

              <div className="field" style={{ marginTop: 14 }}>
                <label className="label">
                  Scientific Notation → Normal
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr auto 1fr",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  <input
                    className="input"
                    type="number"
                    value={mantissa}
                    onChange={(e) => setMantissa(e.target.value)}
                    placeholder="mantissa a"
                  />
                  <span>×</span>
                  <span>10</span>
                  <span>^</span>
                  <input
                    className="input"
                    type="number"
                    value={exponent}
                    onChange={(e) => setExponent(e.target.value)}
                    placeholder="exponent b"
                  />
                </div>
                <button
                  type="button"
                  className="btn"
                  style={{ marginTop: 8 }}
                  onClick={convertToNormal}
                >
                  → Normal
                </button>
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
                Scientific notation is usually written with 1 ≤ |a| &lt; 10, but this
                tool will convert any valid mantissa and exponent.
              </p>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  Scientific Notation (a × 10^b)
                </div>
                <div className="result-value">
                  {result?.sci ?? "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">Normal Number</div>
                <div className="result-value">
                  {result?.normal != null
                    ? fmt(result.normal)
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
