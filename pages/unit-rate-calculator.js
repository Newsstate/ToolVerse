import { useState } from "react";
import Link from "next/link";

export default function UnitRateCalculatorPage() {
  const [totalValue, setTotalValue] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [label, setLabel] = useState("per unit");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const v = parseFloat(totalValue);
    const u = parseFloat(totalUnits);

    if (!Number.isFinite(v) || !Number.isFinite(u) || u === 0) {
      setResult(null);
      return;
    }

    const perOne = v / u;
    const perHundred = v / u * 100;

    setResult({
      perOne,
      perHundred,
    });
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const fmt2 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Unit Rate Calculator</h1>
          <p className="page-subtitle">
            Find the rate per 1 unit (e.g., ₹ per kg, km per hour, pages per day) from any total and quantity.
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
                <label className="label">Total Value</label>
                <input
                  className="input"
                  type="number"
                  value={totalValue}
                  onChange={(e) => setTotalValue(e.target.value)}
                  placeholder="e.g. 500 (₹, km, tasks, etc.)"
                />
              </div>

              <div className="field">
                <label className="label">Total Units</label>
                <input
                  className="input"
                  type="number"
                  value={totalUnits}
                  onChange={(e) => setTotalUnits(e.target.value)}
                  placeholder="e.g. 5 (kg, hours, days...)"
                />
              </div>

              <div className="field">
                <label className="label">Label (optional)</label>
                <input
                  className="input"
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="per kg, per hour, per item..."
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Unit Rate
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Unit Rate</div>
                <div className="result-value">
                  {result ? `${fmt4(result.perOne)} ${label || "per unit"}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Per 100 Units</div>
                <div className="result-value">
                  {result ? `${fmt2(result.perHundred)} per 100 units` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Use this to compare prices (₹ per kg), speeds (km per hour), productivity (items per day), and more.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
