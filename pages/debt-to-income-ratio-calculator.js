import { useState } from "react";
import Link from "next/link";

export default function DebtToIncomeRatioCalculatorPage() {
  const [monthlyDebt, setMonthlyDebt] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const d = parseFloat(monthlyDebt);
    const i = parseFloat(monthlyIncome);

    if (!d || !i) {
      setResult(null);
      return;
    }

    const ratio = (d / i) * 100;

    let category = "High";
    if (ratio < 20) category = "Low";
    else if (ratio < 36) category = "Manageable";
    else if (ratio < 43) category = "Borderline";

    setResult({
      ratio,
      category,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Debt Tool</div>
          <h1 className="page-title">Debt-to-Income Ratio Calculator</h1>
          <p className="page-subtitle">
            Check your monthly debt-to-income (DTI) ratio — a key indicator lenders use to
            judge affordability.
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
                <label className="label">Total Monthly Debt Payments (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={monthlyDebt}
                  onChange={(e) => setMonthlyDebt(e.target.value)}
                  placeholder="e.g. 20000 (EMIs, cards, loans)"
                />
              </div>

              <div className="field">
                <label className="label">Gross Monthly Income (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="e.g. 80000"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate DTI Ratio
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Debt-to-Income Ratio</div>
                <div className="result-value">
                  {result ? `${fmt(result.ratio)}%` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Category</div>
                <div className="result-value">
                  {result ? result.category : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Many lenders prefer DTI below ~36% for comfort. This is just a guideline
                  — actual approval criteria vary by lender and product.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
