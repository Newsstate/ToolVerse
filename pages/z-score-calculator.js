import { useState } from "react";
import Link from "next/link";

export default function ZScoreCalculatorPage() {
  const [value, setValue] = useState("");
  const [mean, setMean] = useState("");
  const [stdDev, setStdDev] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const x = parseFloat(value);
    const m = parseFloat(mean);
    const s = parseFloat(stdDev);

    if (!Number.isFinite(x) || !Number.isFinite(m) || !Number.isFinite(s) || s === 0) {
      setResult(null);
      return;
    }

    const z = (x - m) / s;
    setResult({ z });
  };

  const fmt3 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 3 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Statistics Tool</div>
          <h1 className="page-title">Z-Score Calculator</h1>
          <p className="page-subtitle">
            Convert a raw score to a z-score to see how many standard deviations it is
            above or below the mean.
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
                <label className="label">Value (x)</label>
                <input
                  className="input"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="e.g. 75"
                />
              </div>

              <div className="field">
                <label className="label">Mean (μ)</label>
                <input
                  className="input"
                  type="number"
                  value={mean}
                  onChange={(e) => setMean(e.target.value)}
                  placeholder="e.g. 60"
                />
              </div>

              <div className="field">
                <label className="label">Standard Deviation (σ)</label>
                <input
                  className="input"
                  type="number"
                  value={stdDev}
                  onChange={(e) => setStdDev(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Z-Score
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Z-Score</div>
                <div className="result-value">
                  {result ? fmt3(result.z) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Positive z-scores are above the mean, negative z-scores are below. A
                  value around ±2 is already quite far from average in a normal
                  distribution.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
