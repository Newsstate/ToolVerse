import { useState } from "react";
import Link from "next/link";

export default function IntrinsicValueCalculatorPage() {
  const [eps, setEps] = useState("");
  const [growthRate, setGrowthRate] = useState("8");
  const [discountRate, setDiscountRate] = useState("12");
  const [years, setYears] = useState("10");
  const [terminalPE, setTerminalPE] = useState("15");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const epsNow = parseFloat(eps);
    const g = parseFloat(growthRate);
    const r = parseFloat(discountRate);
    const n = parseFloat(years);
    const pe = parseFloat(terminalPE);

    if (!epsNow || !g || !r || !n || !pe) {
      setResult(null);
      return;
    }

    const gDec = g / 100;
    const rDec = r / 100;

    let pvEarnings = 0;
    for (let t = 1; t <= n; t++) {
      const epsT = epsNow * Math.pow(1 + gDec, t);
      const pv = epsT / Math.pow(1 + rDec, t);
      pvEarnings += pv;
    }

    const epsN = epsNow * Math.pow(1 + gDec, n);
    const terminalValue = epsN * pe;
    const pvTerminal = terminalValue / Math.pow(1 + rDec, n);

    const intrinsicValue = pvEarnings + pvTerminal;

    setResult({
      pvEarnings,
      pvTerminal,
      intrinsicValue,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Investing Tool</div>
          <h1 className="page-title">Intrinsic Value Calculator</h1>
          <p className="page-subtitle">
            Estimate intrinsic value per share using a simple discounted earnings model
            (growth + terminal P/E).
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
                <label className="label">Current EPS (₹ per share)</label>
                <input
                  className="input"
                  type="number"
                  value={eps}
                  onChange={(e) => setEps(e.target.value)}
                  placeholder="e.g. 50"
                />
              </div>

              <div className="field">
                <label className="label">Expected EPS Growth (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(e.target.value)}
                  placeholder="e.g. 8"
                />
              </div>

              <div className="field">
                <label className="label">Discount Rate (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                  placeholder="e.g. 12"
                />
              </div>

              <div className="field">
                <label className="label">Projection Period (years)</label>
                <input
                  className="input"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>

              <div className="field">
                <label className="label">Terminal P/E Multiple</label>
                <input
                  className="input"
                  type="number"
                  value={terminalPE}
                  onChange={(e) => setTerminalPE(e.target.value)}
                  placeholder="e.g. 15"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Intrinsic Value
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">PV of Projected Earnings</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.pvEarnings)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">PV of Terminal Value</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.pvTerminal)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Intrinsic Value per Share</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.intrinsicValue)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This is a simplified DCF-style estimate and highly sensitive to growth,
                  discount rate and terminal P/E assumptions. Use it as a rough guide, not
                  a recommendation.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
