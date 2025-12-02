import { useState } from "react";
import Link from "next/link";

export default function OvertimeCalculatorPage() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [regularHours, setRegularHours] = useState("40");
  const [overtimeHours, setOvertimeHours] = useState("5");
  const [multiplier, setMultiplier] = useState("1.5");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const rate = parseFloat(hourlyRate);
    const regHrs = parseFloat(regularHours) || 0;
    const otHrs = parseFloat(overtimeHours) || 0;
    const mul = parseFloat(multiplier);

    if (!rate || mul <= 0 || (regHrs <= 0 && otHrs <= 0)) {
      setResult(null);
      return;
    }

    const regularPay = regHrs * rate;
    const overtimePay = otHrs * rate * mul;
    const totalPay = regularPay + overtimePay;
    const totalHours = regHrs + otHrs;

    setResult({
      regularPay,
      overtimePay,
      totalPay,
      totalHours,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Money Tool</div>
          <h1 className="page-title">Overtime Calculator</h1>
          <p className="page-subtitle">
            Estimate your total pay for a period including regular hours and overtime pay.
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
                <label className="label">Hourly Rate (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="e.g. 300"
                />
              </div>

              <div className="field">
                <label className="label">Regular Hours</label>
                <input
                  className="input"
                  type="number"
                  value={regularHours}
                  onChange={(e) => setRegularHours(e.target.value)}
                  placeholder="e.g. 40"
                />
              </div>

              <div className="field">
                <label className="label">Overtime Hours</label>
                <input
                  className="input"
                  type="number"
                  value={overtimeHours}
                  onChange={(e) => setOvertimeHours(e.target.value)}
                  placeholder="e.g. 5"
                />
              </div>

              <div className="field">
                <label className="label">Overtime Multiplier</label>
                <input
                  className="input"
                  type="number"
                  value={multiplier}
                  onChange={(e) => setMultiplier(e.target.value)}
                  placeholder="e.g. 1.5"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Overtime Pay
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Regular Pay</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.regularPay)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Overtime Pay</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.overtimePay)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Pay</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.totalPay)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This assumes all overtime hours are paid at the chosen multiplier. Check
                  your company&apos;s overtime policy for exact rules.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
