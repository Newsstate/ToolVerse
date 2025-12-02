import { useState } from "react";
import Link from "next/link";

export default function CagrCalculatorPage() {
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [years, setYears] = useState("3");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const BV = parseFloat(startValue);
    const EV = parseFloat(endValue);
    const t = parseFloat(years);

    if (!BV || !EV || !t || BV <= 0 || t <= 0) {
      setResult(null);
      return;
    }

    // CAGR = (EV/BV)^(1/t) - 1
    const cagr = (Math.pow(EV / BV, 1 / t) - 1) * 100;
    const totalReturn = ((EV - BV) / BV) * 100;

    setResult({
      cagr,
      totalReturn
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Investment Tool</div>
          <h1 className="page-title">CAGR Calculator</h1>
          <p className="page-subtitle">
            Find the Compound Annual Growth Rate (CAGR) for an investment between two
            values over a given time period.
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
                <label className="label">Starting Value (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={startValue}
                  onChange={(e) => setStartValue(e.target.value)}
                  placeholder="e.g. 100000"
                />
              </div>

              <div className="field">
                <label className="label">Ending Value (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={endValue}
                  onChange={(e) => setEndValue(e.target.value)}
                  placeholder="e.g. 180000"
                />
              </div>

              <div className="field">
                <label className="label">Time Period (years)</label>
                <input
                  className="input"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="e.g. 3"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate CAGR
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">CAGR</div>
                <div className="result-value">
                  {result ? `${fmt(result.cagr)} % p.a.` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Return</div>
                <div className="result-value">
                  {result ? `${fmt(result.totalReturn)} %` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  CAGR shows the &quot;smoothed&quot; annual return, assuming the
                  investment grew at a steady rate every year.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
