import { useState } from "react";
import Link from "next/link";

export default function HomeLoanCalculatorPage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("8.5");
  const [years, setYears] = useState("20");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const tenureYears = parseFloat(years);

    if (!P || !annualRate || !tenureYears) {
      setResult(null);
      return;
    }

    const r = annualRate / 12 / 100;
    const n = tenureYears * 12;

    const pow = Math.pow(1 + r, n);
    const emi = (P * r * pow) / (pow - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({
      emi,
      totalPayment,
      totalInterest,
      months: n
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Loan Tool</div>
          <h1 className="page-title">Home Loan EMI Calculator</h1>
          <p className="page-subtitle">
            Estimate EMI, total interest and total payment for long-tenure home loans.
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
                <label className="label">Home Loan Amount (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="e.g. 3500000"
                />
              </div>

              <div className="field">
                <label className="label">Interest Rate (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 8.5"
                />
              </div>

              <div className="field">
                <label className="label">Tenure (years)</label>
                <input
                  className="input"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="e.g. 20"
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate Home Loan EMI
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Monthly EMI</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.emi)}` : "—"}
                </div>
              </div>
              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Interest</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.totalInterest)}` : "—"}
                </div>
              </div>
              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Payment</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.totalPayment)}` : "—"}
                </div>
              </div>
              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Tenure: {result.months} months
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
