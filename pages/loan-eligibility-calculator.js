import { useState } from "react";
import Link from "next/link";

export default function LoanEligibilityCalculatorPage() {
  const [income, setIncome] = useState("");
  const [existingEmi, setExistingEmi] = useState("0");
  const [foir, setFoir] = useState("40"); // % of income allowed for all EMIs
  const [rate, setRate] = useState("10");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const monthlyIncome = parseFloat(income);
    const otherEmi = parseFloat(existingEmi || "0");
    const maxFoir = parseFloat(foir);
    const annualRate = parseFloat(rate);
    const tenureYears = parseFloat(years);

    if (!monthlyIncome || !maxFoir || !annualRate || !tenureYears) {
      setResult(null);
      return;
    }

    const allowedForAllEmis = (monthlyIncome * maxFoir) / 100;
    const maxNewEmi = Math.max(allowedForAllEmis - otherEmi, 0);

    const r = annualRate / 12 / 100;
    const n = tenureYears * 12;

    if (!r || !n || !maxNewEmi) {
      setResult({
        maxNewEmi: 0,
        eligibleAmount: 0
      });
      return;
    }

    // Reverse EMI formula: P = EMI * [(1+r)^n - 1] / [r (1+r)^n]
    const pow = Math.pow(1 + r, n);
    const P = (maxNewEmi * (pow - 1)) / (r * pow);

    setResult({
      maxNewEmi,
      eligibleAmount: P
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Loan Tool</div>
          <h1 className="page-title">Loan Eligibility Calculator</h1>
          <p className="page-subtitle">
            Estimate the maximum loan amount based on your income, existing EMIs and a
            FOIR (fixed obligations to income ratio).
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
                <label className="label">Net Monthly Income (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="e.g. 80000"
                />
              </div>

              <div className="field">
                <label className="label">Existing EMIs (₹ / month)</label>
                <input
                  className="input"
                  type="number"
                  value={existingEmi}
                  onChange={(e) => setExistingEmi(e.target.value)}
                  placeholder="e.g. 15000"
                />
              </div>

              <div className="field">
                <label className="label">FOIR (% of income for all EMIs)</label>
                <input
                  className="input"
                  type="number"
                  value={foir}
                  onChange={(e) => setFoir(e.target.value)}
                  placeholder="e.g. 40"
                />
              </div>

              <div className="field">
                <label className="label">Assumed Loan Rate (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>

              <div className="field">
                <label className="label">Tenure (years)</label>
                <input
                  className="input"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate Eligibility
              </button>
              <p className="helper-text" style={{ marginTop: 8 }}>
                This is an approximate calculation. Actual eligibility depends on bank
                policies and your credit profile.
              </p>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Max New EMI Affordable</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.maxNewEmi)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Approx. Eligible Loan Amount</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.eligibleAmount)}` : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
