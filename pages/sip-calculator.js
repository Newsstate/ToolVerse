import { useState } from "react";
import Link from "next/link";

export default function SipCalculatorPage() {
  const [monthlyInvest, setMonthlyInvest] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const P = parseFloat(monthlyInvest);
    const r = parseFloat(rate);
    const t = parseFloat(years);

    if (!P || !r || !t) {
      setResult(null);
      return;
    }

    const n = t * 12; // months
    const i = r / 12 / 100; // monthly rate

    // SIP maturity formula: FV = P * [((1+i)^n - 1) / i] * (1 + i)
    const factor = Math.pow(1 + i, n);
    const futureValue = P * ((factor - 1) / i) * (1 + i);
    const totalInvested = P * n;
    const gain = futureValue - totalInvested;

    setResult({
      futureValue,
      totalInvested,
      gain,
      months: n
    });
  };

  const fmt = (val) =>
    val.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Finance Tool</div>
          <h1 className="page-title">SIP Calculator</h1>
          <p className="page-subtitle">
            Estimate the future value of your monthly SIP investments based on expected
            return rate and investment duration.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            <div>
              <div className="field">
                <label className="label">Monthly investment (₹)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={monthlyInvest}
                  onChange={(e) => setMonthlyInvest(e.target.value)}
                  placeholder="e.g. 5000"
                />
              </div>

              <div className="field">
                <label className="label">Expected annual return (%)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 12"
                />
              </div>

              <div className="field">
                <label className="label">Investment period (years)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate SIP Returns
              </button>
              <p className="helper-text">
                Uses standard SIP future value formula with monthly compounding. Actual
                market returns may vary.
              </p>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Maturity Amount</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.futureValue)}` : "—"}
                </div>
              </div>

              <div
                className="grid"
                style={{ marginTop: 12, gap: 10, gridTemplateColumns: "1fr 1fr" }}
              >
                <div className="result-box">
                  <div className="result-title">Total Invested</div>
                  <div className="result-value" style={{ fontSize: "1rem" }}>
                    {result ? `₹ ${fmt(result.totalInvested)}` : "—"}
                  </div>
                </div>
                <div className="result-box">
                  <div className="result-title">Estimated Gain</div>
                  <div className="result-value" style={{ fontSize: "1rem" }}>
                    {result ? `₹ ${fmt(result.gain)}` : "—"}
                  </div>
                </div>
              </div>

              <p className="helper-text" style={{ marginTop: 10 }}>
                This is an illustration based on constant return assumption. It does not
                guarantee future performance.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
