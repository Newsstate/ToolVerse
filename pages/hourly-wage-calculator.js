import { useState } from "react";
import Link from "next/link";

export default function HourlyWageCalculatorPage() {
  const [totalPay, setTotalPay] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const pay = parseFloat(totalPay);
    const hours = parseFloat(hoursWorked);

    if (!pay || !hours) {
      setResult(null);
      return;
    }

    const hourly = pay / hours;

    setResult({
      hourly,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Money Tool</div>
          <h1 className="page-title">Hourly Wage Calculator</h1>
          <p className="page-subtitle">
            Enter your total pay and hours worked to find your effective hourly wage.
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
                <label className="label">Total Pay for Period (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={totalPay}
                  onChange={(e) => setTotalPay(e.target.value)}
                  placeholder="e.g. 15000"
                />
              </div>

              <div className="field">
                <label className="label">Total Hours Worked</label>
                <input
                  className="input"
                  type="number"
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                  placeholder="e.g. 80"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Hourly Wage
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Hourly Wage</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.hourly)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This gives you your average hourly wage for the entered period. Use it to
                  compare job offers, freelance projects or overtime pay.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
