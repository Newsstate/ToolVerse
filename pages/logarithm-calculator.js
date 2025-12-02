import { useState } from "react";
import Link from "next/link";

export default function LogarithmCalculatorPage() {
  const [value, setValue] = useState("");
  const [base, setBase] = useState("10");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const v = parseFloat(value);
    const b = parseFloat(base);

    if (!Number.isFinite(v) || !Number.isFinite(b) || v <= 0 || b <= 0 || b === 1) {
      setResult(null);
      return;
    }

    const lnV = Math.log(v);
    const lnB = Math.log(b);
    const logBaseB = lnV / lnB;
    const ln = lnV;
    const log10 = Math.log10(v);

    setResult({
      logBaseB,
      ln,
      log10,
      b,
    });
  };

  const fmt6 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Logarithm Calculator</h1>
          <p className="page-subtitle">
            Compute log base <em>b</em> of a number, plus natural log and base-10 log
            instantly.
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
                <label className="label">Value</label>
                <input
                  className="input"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="e.g. 1000"
                />
              </div>

              <div className="field">
                <label className="label">Base (b)</label>
                <input
                  className="input"
                  type="number"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  placeholder="e.g. 10, 2, e..."
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Logarithms
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">log₍b₎(value)</div>
                <div className="result-value">
                  {result ? fmt6(result.logBaseB) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Natural log ln(value)</div>
                <div className="result-value">
                  {result ? fmt6(result.ln) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">log₁₀(value)</div>
                <div className="result-value">
                  {result ? fmt6(result.log10) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Formula used:{" "}
                  <strong>log₍b₎(x) = ln(x) / ln(b)</strong>. Value and base must be
                  positive and base ≠ 1.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
