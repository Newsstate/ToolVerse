import { useState } from "react";
import Link from "next/link";

export default function HalfLifeCalculatorPage() {
  const [initialAmount, setInitialAmount] = useState("");
  const [halfLife, setHalfLife] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const N0 = parseFloat(initialAmount);
    const T = parseFloat(halfLife);
    const t = parseFloat(time);

    if (
      !Number.isFinite(N0) ||
      !Number.isFinite(T) ||
      !Number.isFinite(t) ||
      N0 < 0 ||
      T <= 0 ||
      t < 0
    ) {
      setResult(null);
      return;
    }

    const nHalfLives = t / T;
    const remaining = N0 * Math.pow(0.5, nHalfLives);
    const fraction = remaining / N0;

    setResult({
      remaining,
      fraction,
      nHalfLives,
    });
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const fmtPct = (n) =>
    (n * 100).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    }) + "%";

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Physics Tool</div>
          <h1 className="page-title">Half-life Calculator</h1>
          <p className="page-subtitle">
            Calculate how much of a substance remains after a given time, based on its half-life.
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
                <label className="label">Initial Amount</label>
                <input
                  className="input"
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  placeholder="e.g. 100 (grams, mg, etc.)"
                />
              </div>

              <div className="field">
                <label className="label">Half-life</label>
                <input
                  className="input"
                  type="number"
                  value={halfLife}
                  onChange={(e) => setHalfLife(e.target.value)}
                  placeholder="e.g. 5 (hours, days...)"
                />
              </div>

              <div className="field">
                <label className="label">Elapsed Time</label>
                <input
                  className="input"
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 12"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Remaining Amount
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Remaining Amount</div>
                <div className="result-value">
                  {result ? fmt4(result.remaining) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Percent Remaining</div>
                <div className="result-value">
                  {result ? fmtPct(result.fraction) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Number of Half-lives</div>
                <div className="result-value">
                  {result ? fmt4(result.nHalfLives) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Uses N(t) = N₀ × (1/2)<sup>t / T₁/₂</sup>. Units cancel as long as time
                  and half-life use the same unit.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
