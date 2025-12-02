import { useState } from "react";
import Link from "next/link";

export default function ExponentCalculatorPage() {
  const [base, setBase] = useState("2");
  const [exponent, setExponent] = useState("3");
  const [x, setX] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const b = parseFloat(base);
    const e = parseFloat(exponent);

    let power = null;
    if (Number.isFinite(b) && Number.isFinite(e)) {
      power = Math.pow(b, e);
    }

    const xVal = parseFloat(x);
    let expE = null;
    let exp10 = null;
    if (Number.isFinite(xVal)) {
      expE = Math.exp(xVal);
      exp10 = Math.pow(10, xVal);
    }

    setResult({
      power,
      expE,
      exp10,
    });
  };

  const fmt6 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Exponent Calculator</h1>
          <p className="page-subtitle">
            Quickly compute b^e, eˣ and 10ˣ for growth, decay and scientific notation
            problems.
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
                <label className="label">Base (b)</label>
                <input
                  className="input"
                  type="number"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  placeholder="e.g. 2"
                />
              </div>

              <div className="field">
                <label className="label">Exponent (e)</label>
                <input
                  className="input"
                  type="number"
                  value={exponent}
                  onChange={(e) => setExponent(e.target.value)}
                  placeholder="e.g. 8"
                />
              </div>

              <div className="field">
                <label className="label">x for eˣ and 10ˣ (optional)</label>
                <input
                  className="input"
                  type="number"
                  value={x}
                  onChange={(e) => setX(e.target.value)}
                  placeholder="e.g. 3"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Exponents
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">b^e</div>
                <div className="result-value">
                  {result && result.power != null ? fmt6(result.power) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">eˣ</div>
                <div className="result-value">
                  {result && result.expE != null ? fmt6(result.expE) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">10ˣ</div>
                <div className="result-value">
                  {result && result.exp10 != null ? fmt6(result.exp10) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Exponential functions are used for compound growth/decay, interest,
                  radioactivity, population models and scientific notation.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
