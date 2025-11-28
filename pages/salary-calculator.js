import { useState } from "react";
import Link from "next/link";

export default function SalaryCalculatorPage() {
  const [gross, setGross] = useState("");
  const [pfRate, setPfRate] = useState(12);
  const [pt, setPT] = useState(200);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const G = parseFloat(gross);
    if (!G) {
      setResult(null);
      return;
    }

    const pf = (G * (pfRate || 0)) / 100;
    const ptVal = parseFloat(pt || 0);
    const deductions = pf + ptVal;
    const net = G - deductions;

    setResult({
      gross: G,
      deductions,
      net,
      yearlyNet: net * 12
    });
  };

  const fmt = (v) =>
    v.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Income Tool</div>
          <h1 className="page-title">Salary / Take-Home Pay Calculator</h1>
          <p className="page-subtitle">
            Estimate your monthly and annual take-home salary after PF and professional tax.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Left: inputs */}
            <div>
              <div className="field">
                <label className="label">Monthly Gross Salary (₹)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={gross}
                  onChange={(e) => setGross(e.target.value)}
                  placeholder="e.g. 50000"
                />
              </div>

              <div className="field">
                <label className="label">PF (%)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={pfRate}
                  onChange={(e) => setPfRate(e.target.value)}
                  placeholder="e.g. 12"
                />
              </div>

              <div className="field">
                <label className="label">Professional Tax (₹ / month)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={pt}
                  onChange={(e) => setPT(e.target.value)}
                  placeholder="e.g. 200"
                />
              </div>

              <button
                className="btn"
                type="button"
                onClick={calculate}
              >
                Calculate Take-Home Salary
              </button>
              <p className="helper-text">
                This is a simple estimate and does not include income tax (TDS) or other
                company-specific deductions.
              </p>
            </div>

            {/* Right: results */}
            <div>
              <div className="result-box">
                <div className="result-title">Net Monthly Salary</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.net)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Net Annual Salary</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.yearlyNet)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Monthly Deductions</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.deductions)}` : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
