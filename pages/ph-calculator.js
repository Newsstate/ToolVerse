import { useState } from "react";
import Link from "next/link";

function log10(x) {
  return Math.log(x) / Math.LN10;
}

export default function PHCalculatorPage() {
  const [mode, setMode] = useState("h");
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const v = parseFloat(value);

    if (!Number.isFinite(v)) {
      setResult(null);
      return;
    }

    let pH = null;
    let pOH = null;
    let H = null;
    let OH = null;

    if (mode === "h") {
      if (v <= 0) {
        setResult(null);
        return;
      }
      H = v;
      pH = -log10(H);
      pOH = 14 - pH;
      OH = Math.pow(10, -pOH);
    } else if (mode === "oh") {
      if (v <= 0) {
        setResult(null);
        return;
      }
      OH = v;
      pOH = -log10(OH);
      pH = 14 - pOH;
      H = Math.pow(10, -pH);
    } else if (mode === "ph") {
      pH = v;
      pOH = 14 - pH;
      H = Math.pow(10, -pH);
      OH = Math.pow(10, -pOH);
    } else if (mode === "poh") {
      pOH = v;
      pH = 14 - pOH;
      H = Math.pow(10, -pH);
      OH = Math.pow(10, -pOH);
    }

    setResult({
      pH,
      pOH,
      H,
      OH,
    });
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Chemistry Tool</div>
          <h1 className="page-title">pH Calculator</h1>
          <p className="page-subtitle">
            Calculate pH, pOH, [H⁺] and [OH⁻] for aqueous solutions at 25°C using the relation pH + pOH = 14.
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
                <label className="label">Input Type</label>
                <select
                  className="input"
                  value={mode}
                  onChange={(e) => {
                    setMode(e.target.value);
                    setResult(null);
                  }}
                >
                  <option value="h">[H⁺] (mol/L)</option>
                  <option value="oh">[OH⁻] (mol/L)</option>
                  <option value="ph">pH</option>
                  <option value="poh">pOH</option>
                </select>
              </div>

              <div className="field">
                <label className="label">
                  {mode === "h" && "[H⁺] (mol/L)"}
                  {mode === "oh" && "[OH⁻] (mol/L)"}
                  {mode === "ph" && "pH"}
                  {mode === "poh" && "pOH"}
                </label>
                <input
                  className="input"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={
                    mode === "h" || mode === "oh"
                      ? "e.g. 1e-3"
                      : "e.g. 7"
                  }
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate pH
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">pH</div>
                <div className="result-value">
                  {result ? fmt4(result.pH) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">pOH</div>
                <div className="result-value">
                  {result ? fmt4(result.pOH) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">[H⁺] (mol/L)</div>
                <div className="result-value">
                  {result ? fmt4(result.H) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">[OH⁻] (mol/L)</div>
                <div className="result-value">
                  {result ? fmt4(result.OH) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  At 25°C, water has pH 7 (neutral). pH &lt; 7 is acidic, pH &gt; 7 is
                  basic. This tool assumes pH + pOH = 14 (Kw = 1×10⁻¹⁴).
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
