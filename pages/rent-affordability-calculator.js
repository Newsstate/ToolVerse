import { useState } from "react";
import Link from "next/link";

export default function RentAffordabilityCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [otherDebts, setOtherDebts] = useState("0");
  const [housingPercent, setHousingPercent] = useState("30");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const income = parseFloat(monthlyIncome);
    const debts = parseFloat(otherDebts) || 0;
    const percent = parseFloat(housingPercent);

    if (!income || !percent) {
      setResult(null);
      return;
    }

    // Max housing budget by rule-of-thumb
    const grossLimit = (income * percent) / 100;

    // If user wants to be more conservative, we can subtract debts
    const afterDebtLimit = Math.max(0, grossLimit - debts);

    const usedPercentOfIncome =
      income > 0 ? (afterDebtLimit / income) * 100 : 0;

    setResult({
      grossLimit,
      afterDebtLimit,
      usedPercentOfIncome,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Housing Tool</div>
          <h1 className="page-title">Rent Affordability Calculator</h1>
          <p className="page-subtitle">
            Find a comfortable rent budget based on your monthly income, existing debts
            and preferred housing percentage.
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
                <label className="label">Gross Monthly Income (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="e.g. 80000"
                />
              </div>

              <div className="field">
                <label className="label">
                  Other Monthly Debt Payments (₹)
                  <span style={{ fontWeight: 400, fontSize: 12 }}>
                    {" "}
                    (EMIs, credit cards, etc.)
                  </span>
                </label>
                <input
                  className="input"
                  type="number"
                  value={otherDebts}
                  onChange={(e) => setOtherDebts(e.target.value)}
                  placeholder="e.g. 15000"
                />
              </div>

              <div className="field">
                <label className="label">
                  Max % of Income for Housing
                </label>
                <input
                  className="input"
                  type="number"
                  value={housingPercent}
                  onChange={(e) => setHousingPercent(e.target.value)}
                  placeholder="e.g. 30"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Affordable Rent
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  Gross Rent Limit ({housingPercent}% of income)
                </div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.grossLimit)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">
                  Recommended Max Rent (after debts)
                </div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.afterDebtLimit)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">
                  % of Income Used for Recommended Rent
                </div>
                <div className="result-value">
                  {result ? `${fmt(result.usedPercentOfIncome)}%` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Many planners suggest keeping rent around 25–30% of income. This tool
                  also factors in your other debts to keep your total outflow realistic.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
