import { useState } from "react";
import Link from "next/link";

export default function MutualFundCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const P = parseFloat(amount);
    const r = parseFloat(rate);
    const t = parseFloat(years);

    if (!P || !r || !t) {
      setResult(null);
      return;
    }

    // Lump sum MF growth: A = P * (1 + r/100)^t
    const amountFuture = P * Math.pow(1 + r / 100, t);
    const gain = amountFuture - P;

    setResult({
      invested: P,
      amountFuture,
      gain
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Investment Tool</div>
          <h1 className="page-title">Mutual Fund Return Calculator</h1>
          <p className="page-subtitle">
            Estimate the future value of a one-time lump sum mutual fund investment
            using expected annual returns.
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
                <label className="label">Investment Amount (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 100000"
                />
              </div>

              <div className="field">
                <label className="label">Expected Return (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 12"
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
                Calculate Returns
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Amount Invested</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.invested)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Future Value</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.amountFuture)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Gain</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.gain)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This is a simplified illustration. Actual mutual fund returns vary
                  with market performance.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
