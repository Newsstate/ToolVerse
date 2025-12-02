import { useState } from "react";
import Link from "next/link";

export default function GratuityCalculatorPage() {
  const [salary, setSalary] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const s = parseFloat(salary);
    const y = parseFloat(years);
    const m = parseFloat(months);

    if (!s || y < 0 || m < 0) {
      setResult(null);
      return;
    }

    // Gratuity = (Last drawn salary * 15 * completed years) / 26
    const totalYears = y + (m >= 6 ? 1 : 0);
    const gratuityAmount = (s * 15 * totalYears) / 26;

    setResult({
      salary: s,
      totalYears,
      gratuityAmount,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Money Tool</div>
          <h1 className="page-title">Gratuity Calculator</h1>
          <p className="page-subtitle">
            Estimate your gratuity based on last drawn salary and years of service.
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
                <label className="label">
                  Last Drawn Monthly Salary (Basic + DA) (₹)
                </label>
                <input
                  className="input"
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. 50000"
                />
              </div>

              <div className="field">
                <label className="label">Years of Service (completed)</label>
                <input
                  className="input"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="e.g. 5"
                />
              </div>

              <div className="field">
                <label className="label">Additional Months of Service</label>
                <input
                  className="input"
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  placeholder="e.g. 7"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Gratuity
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Total Years Counted</div>
                <div className="result-value">
                  {result ? `${result.totalYears} years` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Estimated Gratuity Payable</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.gratuityAmount)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  For gratuity, service of 6 months or more is rounded up to a full year.
                  This is a simplified estimate and actual payout may differ as per company
                  policy and law.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
