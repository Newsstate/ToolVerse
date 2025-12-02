import { useState } from "react";
import Link from "next/link";

export default function PaycheckCalculatorPage() {
  const [gross, setGross] = useState("");
  const [taxRate, setTaxRate] = useState("15");
  const [otherDeductions, setOtherDeductions] = useState("0");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const g = parseFloat(gross);
    const t = parseFloat(taxRate);
    const d = parseFloat(otherDeductions) || 0;

    if (!g || t < 0) {
      setResult(null);
      return;
    }

    const taxAmount = (g * t) / 100;
    const totalDeductions = taxAmount + d;
    const netPay = g - totalDeductions;

    setResult({
      gross: g,
      taxAmount,
      otherDeductions: d,
      totalDeductions,
      netPay,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Money Tool</div>
          <h1 className="page-title">Paycheck Calculator</h1>
          <p className="page-subtitle">
            Estimate your take-home pay after tax and deductions for a pay period.
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
                <label className="label">Gross Pay for Period (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={gross}
                  onChange={(e) => setGross(e.target.value)}
                  placeholder="e.g. 80000"
                />
              </div>

              <div className="field">
                <label className="label">Tax & Statutory Deductions (% of gross)</label>
                <input
                  className="input"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  placeholder="e.g. 15"
                />
              </div>

              <div className="field">
                <label className="label">Other Deductions (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={otherDeductions}
                  onChange={(e) => setOtherDeductions(e.target.value)}
                  placeholder="e.g. 2000"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Net Pay
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Total Deductions</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.totalDeductions)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Net Pay (Take-home)</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.netPay)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This is a simplified estimate. Actual in-hand salary can differ based on
                  your company’s structure, benefits and local tax rules.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
