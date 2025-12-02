import { useState } from "react";
import Link from "next/link";

export default function RoiCalculatorPage() {
  const [initial, setInitial] = useState("");
  const [returns, setReturns] = useState("");
  const [extraCost, setExtraCost] = useState("0");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const I = parseFloat(initial);
    const R = parseFloat(returns);
    const C = parseFloat(extraCost || "0");

    if (!I || !R) {
      setResult(null);
      return;
    }

    const totalCost = I + (C || 0);
    const profit = R - totalCost;
    const roiPercent = totalCost > 0 ? (profit / totalCost) * 100 : 0;

    setResult({
      totalCost,
      profit,
      roiPercent
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Investment Tool</div>
          <h1 className="page-title">ROI Calculator</h1>
          <p className="page-subtitle">
            Calculate Return on Investment (ROI) based on your cost, final returns and
            any additional expenses.
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
                <label className="label">Initial Investment (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={initial}
                  onChange={(e) => setInitial(e.target.value)}
                  placeholder="e.g. 50000"
                />
              </div>

              <div className="field">
                <label className="label">Final Value / Returns (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={returns}
                  onChange={(e) => setReturns(e.target.value)}
                  placeholder="e.g. 70000"
                />
              </div>

              <div className="field">
                <label className="label">Additional Costs (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={extraCost}
                  onChange={(e) => setExtraCost(e.target.value)}
                  placeholder="e.g. brokerage, fees"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate ROI
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Total Cost</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.totalCost)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Net Profit / Loss</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.profit)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">ROI</div>
                <div className="result-value">
                  {result ? `${fmt(result.roiPercent)} %` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  ROI (%) = (Profit ÷ Total Cost) × 100
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
