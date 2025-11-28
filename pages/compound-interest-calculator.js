import { useState } from "react";
import Link from "next/link";

const frequencies = [
  { id: "yearly", label: "Yearly (1×)", n: 1 },
  { id: "half-yearly", label: "Half-yearly (2×)", n: 2 },
  { id: "quarterly", label: "Quarterly (4×)", n: 4 },
  { id: "monthly", label: "Monthly (12×)", n: 12 }
];

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [freqId, setFreqId] = useState("quarterly");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(years);
    const freq = frequencies.find((f) => f.id === freqId) || frequencies[2];
    const n = freq.n;

    if (!P || !r || !t) {
      setResult(null);
      return;
    }

    const ratePer = r / 100;
    const amount = P * Math.pow(1 + ratePer / n, n * t);
    const interest = amount - P;

    setResult({
      amount,
      interest,
      years: t,
      nLabel: freq.label
    });
  };

  const fmt = (val) =>
    val.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Finance Tool</div>
          <h1 className="page-title">Compound Interest / FD Calculator</h1>
          <p className="page-subtitle">
            Calculate maturity value and interest earned on a lump sum investment with
            different compounding frequencies.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            <div>
              <div className="field">
                <label className="label">Principal amount (₹)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="e.g. 100000"
                />
              </div>

              <div className="field">
                <label className="label">Annual interest rate (%)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 7.5"
                />
              </div>

              <div className="field">
                <label className="label">Tenure (years)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="e.g. 5"
                />
              </div>

              <div className="field">
                <label className="label">Compounding frequency</label>
                <select
                  className="select"
                  value={freqId}
                  onChange={(e) => setFreqId(e.target.value)}
                >
                  {frequencies.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Maturity Amount
              </button>
              <p className="helper-text">
                Formula: A = P × (1 + r/n)
                <sup>n·t</sup>, where r is annual rate and n is compounding frequency.
              </p>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Maturity Amount</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.amount)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Interest Earned</div>
                <div className="result-value" style={{ fontSize: "1rem" }}>
                  {result ? `₹ ${fmt(result.interest)}` : "—"}
                </div>
              </div>

              <p className="helper-text" style={{ marginTop: 10 }}>
                This gives a good approximation for Fixed Deposit maturity. Actual bank
                values may differ slightly due to rounding and payout rules.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
