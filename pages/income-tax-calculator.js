import { useState } from "react";
import Link from "next/link";

function calculateTaxNewRegime(income) {
  // Example simple slab-based calculation (illustrative only)
  // 0 – 4,00,000           : 0%
  // 4,00,001 – 8,00,000    : 5%
  // 8,00,001 – 12,00,000   : 10%
  // 12,00,001 – 16,00,000  : 15%
  // 16,00,001 – 20,00,000  : 20%
  // 20,00,001 – 24,00,000  : 25%
  // 24,00,001+             : 30%

  let tax = 0;
  let remaining = income;

  // renamed from "useSlab" → "applySlab" to avoid hook rule error
  const applySlab = (limit, rate) => {
    if (remaining <= 0) return 0;

    let taxable = 0;
    if (limit === null) {
      taxable = remaining;
    } else {
      taxable = Math.min(remaining, limit);
    }

    remaining -= taxable;
    return taxable * rate;
  };

  // First 4L @ 0%
  const firstSlab = Math.min(remaining, 400000);
  remaining -= firstSlab;

  tax += applySlab(400000, 0.05); // 4–8L
  tax += applySlab(400000, 0.1);  // 8–12L
  tax += applySlab(400000, 0.15); // 12–16L
  tax += applySlab(400000, 0.2);  // 16–20L
  tax += applySlab(400000, 0.25); // 20–24L
  tax += applySlab(null, 0.3);    // 24L+

  return Math.max(0, tax);
}

export default function IncomeTaxCalculatorPage() {
  const [income, setIncome] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const inc = parseFloat(income);
    if (!inc || inc < 0) {
      setResult(null);
      return;
    }

    const tax = calculateTaxNewRegime(inc);
    const effectiveRate = (tax / inc) * 100;

    setResult({
      income: inc,
      tax,
      effectiveRate,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Money Tool</div>
          <h1 className="page-title">Income Tax Calculator</h1>
          <p className="page-subtitle">
            Quick estimate of your annual income tax using a simple slab-based calculation
            (illustrative only, not legal tax advice).
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
                <label className="label">Annual Taxable Income (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="e.g. 1200000"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Tax
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Estimated Annual Tax</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.tax)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Effective Tax Rate</div>
                <div className="result-value">
                  {result ? `${fmt(result.effectiveRate)}%` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This is a simplified illustration and does not include deductions, rebates,
                  cess or surcharge. For actual tax filing, always cross-check with the
                  latest government rules or a tax professional.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
