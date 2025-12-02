import { useState } from "react";
import Link from "next/link";

export default function MortgageCalculatorPage() {
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("0");
  const [rate, setRate] = useState("7.5");
  const [years, setYears] = useState("20");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const propertyPrice = parseFloat(price);
    const dp = parseFloat(downPayment || "0");
    const annualRate = parseFloat(rate);
    const tenureYears = parseFloat(years);

    if (!propertyPrice || annualRate <= 0 || tenureYears <= 0) {
      setResult(null);
      return;
    }

    const principal = Math.max(propertyPrice - dp, 0);
    const r = annualRate / 12 / 100;
    const n = tenureYears * 12;

    if (!principal || !r || !n) {
      setResult(null);
      return;
    }

    const pow = Math.pow(1 + r, n);
    const emi = (principal * r * pow) / (pow - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;

    setResult({
      principal,
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
          <h1 className="page-title">Mortgage / Home Loan Calculator</h1>
          <p className="page-subtitle">
            Estimate EMI and total cost of your home loan based on property value and
            down payment.
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
                <label className="label">Property Price (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 5000000"
                />
              </div>

              <div className="field">
                <label className="label">Down Payment (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  placeholder="e.g. 1000000"
                />
              </div>

              <div className="field">
                <label className="label">Interest Rate (% p.a.)</label>
                <input
                  className="input"
                  type="number"
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
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="e.g. 20"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Mortgage EMI
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Loan Amount</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.principal)}` : "—"}
                </div>
              </div>
              <div className="result-box" style={{ marginTop: 10 }}>
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
