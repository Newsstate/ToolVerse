import { useState } from "react";
import Link from "next/link";

export default function SimpleInterestCalculatorPage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("8");
  const [time, setTime] = useState("3");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (!P || !r || !t) {
      setResult(null);
      return;
    }

    const interest = (P * r * t) / 100;
    const amount = P + interest;

    setResult({ interest, amount });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Interest Tool</div>
          <h1 className="page-title">Simple Interest Calculator</h1>
          <p className="page-subtitle">
            Calculate interest and maturity amount using the simple interest formula.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Inputs */}
            <div>
              <div className="field">
                <label className="label">Principal Amount (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="e.g. 50000"
                />
              </div>

              <div className="field">
                <label className="label">Interest Rate (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 8"
                />
              </div>

              <div className="field">
                <label className="label">Time Period (years)</label>
                <input
                  className="input"
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 3"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Simple Interest
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Total Interest</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.interest)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Maturity Amount</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.amount)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Formula: SI = (P × R × T) / 100
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
