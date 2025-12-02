import { useState } from "react";
import Link from "next/link";

export default function SalaryToHourlyCalculatorPage() {
  const [annualSalary, setAnnualSalary] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const s = parseFloat(annualSalary);
    const h = parseFloat(hoursPerWeek);
    const w = parseFloat(weeksPerYear);

    if (!s || !h || !w) {
      setResult(null);
      return;
    }

    const yearlyHours = h * w;
    const hourlyRate = s / yearlyHours;
    const monthly = s / 12;

    setResult({
      hourlyRate,
      monthly,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Money Tool</div>
          <h1 className="page-title">Salary to Hourly Calculator</h1>
          <p className="page-subtitle">
            Convert your annual salary into an approximate hourly and monthly rate.
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
                <label className="label">Annual Salary (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(e.target.value)}
                  placeholder="e.g. 1200000"
                />
              </div>

              <div className="field">
                <label className="label">Hours per Week</label>
                <input
                  className="input"
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  placeholder="e.g. 40"
                />
              </div>

              <div className="field">
                <label className="label">Working Weeks per Year</label>
                <input
                  className="input"
                  type="number"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(e.target.value)}
                  placeholder="e.g. 52"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Convert to Hourly
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Hourly Rate</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.hourlyRate)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Monthly Equivalent</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.monthly)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This assumes a consistent schedule based on the hours and weeks you
                  entered. Real-world pay may differ with overtime, bonuses or unpaid leave.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
