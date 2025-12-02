import { useState } from "react";
import Link from "next/link";

export default function PensionCalculatorPage() {
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [employerMatchRate, setEmployerMatchRate] = useState("0");
  const [annualReturnRate, setAnnualReturnRate] = useState("8");
  const [years, setYears] = useState("25");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const m = parseFloat(monthlyContribution);
    const match = parseFloat(employerMatchRate) || 0;
    const r = parseFloat(annualReturnRate);
    const y = parseFloat(years);

    if (!m || !r || !y) {
      setResult(null);
      return;
    }

    const employeeAnnual = m * 12;
    const employerAnnual = (employeeAnnual * match) / 100;
    const rDec = r / 100;
    const n = y;

    const fvFactor = rDec > 0 ? (Math.pow(1 + rDec, n) - 1) / rDec : n;

    const employeeCorpus = employeeAnnual * fvFactor;
    const employerCorpus = employerAnnual * fvFactor;
    const totalCorpus = employeeCorpus + employerCorpus;

    setResult({
      employeeAnnual,
      employerAnnual,
      employeeCorpus,
      employerCorpus,
      totalCorpus,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Retirement Tool</div>
          <h1 className="page-title">Pension Calculator</h1>
          <p className="page-subtitle">
            Estimate your retirement corpus from regular monthly contributions and employer
            pension matching.
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
                <label className="label">Your Monthly Contribution (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  placeholder="e.g. 5000"
                />
              </div>

              <div className="field">
                <label className="label">
                  Employer Match (% of your contribution)
                </label>
                <input
                  className="input"
                  type="number"
                  value={employerMatchRate}
                  onChange={(e) => setEmployerMatchRate(e.target.value)}
                  placeholder="e.g. 50"
                />
              </div>

              <div className="field">
                <label className="label">Expected Return (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={annualReturnRate}
                  onChange={(e) => setAnnualReturnRate(e.target.value)}
                  placeholder="e.g. 8"
                />
              </div>

              <div className="field">
                <label className="label">Investment Period (years)</label>
                <input
                  className="input"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="e.g. 25"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Pension Corpus
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Annual Employee Contribution</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.employeeAnnual)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Annual Employer Contribution</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.employerAnnual)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Projected Employee Corpus</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.employeeCorpus)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Projected Employer Corpus</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.employerCorpus)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Retirement Corpus</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.totalCorpus)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This assumes yearly contributions and compounding at the chosen rate.
                  Actual pension amounts will depend on actual returns and plan rules.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
