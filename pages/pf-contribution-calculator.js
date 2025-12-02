import { useState } from "react";
import Link from "next/link";

export default function PfContributionCalculatorPage() {
  const [basic, setBasic] = useState("");
  const [employeeRate, setEmployeeRate] = useState("12");
  const [employerRate, setEmployerRate] = useState("12");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const b = parseFloat(basic);
    const er = parseFloat(employeeRate);
    const pr = parseFloat(employerRate);

    if (!b || er < 0 || pr < 0) {
      setResult(null);
      return;
    }

    const employeeContribution = (b * er) / 100;
    const employerContribution = (b * pr) / 100;
    const total = employeeContribution + employerContribution;

    setResult({
      employeeContribution,
      employerContribution,
      total,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Money Tool</div>
          <h1 className="page-title">PF Contribution Calculator</h1>
          <p className="page-subtitle">
            Check monthly employee and employer EPF contributions based on your basic salary.
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
                <label className="label">Monthly Basic Salary (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={basic}
                  onChange={(e) => setBasic(e.target.value)}
                  placeholder="e.g. 30000"
                />
              </div>

              <div className="field">
                <label className="label">Employee Contribution (% of basic)</label>
                <input
                  className="input"
                  type="number"
                  value={employeeRate}
                  onChange={(e) => setEmployeeRate(e.target.value)}
                  placeholder="e.g. 12"
                />
              </div>

              <div className="field">
                <label className="label">Employer Contribution (% of basic)</label>
                <input
                  className="input"
                  type="number"
                  value={employerRate}
                  onChange={(e) => setEmployerRate(e.target.value)}
                  placeholder="e.g. 12"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate PF
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Employee PF Contribution</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.employeeContribution)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Employer PF Contribution</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.employerContribution)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Monthly PF (Employee + Employer)</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.total)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This is a simple EPF estimate based on the entered percentages. Actual
                  contributions may vary due to statutory caps and scheme rules.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
