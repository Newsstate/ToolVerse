import { useState } from "react";
import Link from "next/link";

export default function InflationCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [inflationRate, setInflationRate] = useState("6");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const A = parseFloat(amount);
    const r = parseFloat(inflationRate);
    const t = parseFloat(years);

    if (!A || !r || !t) {
      setResult(null);
      return;
    }

    // Future cost with inflation: FV = A * (1 + r/100)^t
    const futureCost = A * Math.pow(1 + r / 100, t);

    setResult({
      current: A,
      futureCost
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Money Tool</div>
          <h1 className="page-title">Inflation Calculator</h1>
          <p className="page-subtitle">
            See how inflation increases the future cost of an expense or goal over time.
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
                <label className="label">Current Cost (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 500000 (education, house, etc.)"
                />
              </div>

              <div className="field">
                <label className="label">Expected Inflation Rate (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                  placeholder="e.g. 6"
                />
              </div>

              <div className="field">
                <label className="label">Time Period (years)</label>
                <input
                  className="input"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Future Cost
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Current Cost</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.current)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Future Cost (after inflation)</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.futureCost)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Inflation reduces your purchasing power. Plan investments so your money
                  grows faster than inflation.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
