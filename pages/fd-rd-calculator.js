import { useState } from "react";
import Link from "next/link";

export default function FdRdCalculatorPage() {
  const [type, setType] = useState("FD"); // "FD" or "RD"
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const P = parseFloat(amount);
    const r = parseFloat(rate);
    const t = parseFloat(years);

    if (!P || !r || !t) {
      setResult(null);
      return;
    }

    const annualRate = r / 100;

    if (type === "FD") {
      // FD: lump sum with yearly compounding
      const maturity = P * Math.pow(1 + annualRate, t);
      const interest = maturity - P;

      setResult({
        invested: P,
        maturity,
        interest
      });
      return;
    }

    // RD: monthly deposit with monthly compounding
    const monthlyRate = annualRate / 12;
    const n = t * 12; // total months

    // FV = P * [((1 + i)^n - 1) / i]
    const factor = Math.pow(1 + monthlyRate, n);
    const maturity = P * ((factor - 1) / monthlyRate);
    const invested = P * n;
    const interest = maturity - invested;

    setResult({
      invested,
      maturity,
      interest
    });
  };

  const fmt = (v) =>
    v.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Finance Tool</div>
          <h1 className="page-title">FD / RD Interest Calculator</h1>
          <p className="page-subtitle">
            Calculate total investment, maturity value and interest earned for a Fixed
            Deposit or a Recurring Deposit.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Left side: Inputs */}
            <div>
              <div className="field">
                <label className="label">Mode</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    className="btn-outline"
                    style={{
                      flex: 1,
                      background: type === "FD" ? "#eef2ff" : "transparent",
                      borderColor:
                        type === "FD" ? "#4f46e5" : "rgba(148,163,184,0.7)",
                      color: type === "FD" ? "#4f46e5" : "#2563eb"
                    }}
                    onClick={() => setType("FD")}
                  >
                    FD (Lump Sum)
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    style={{
                      flex: 1,
                      background: type === "RD" ? "#eef2ff" : "transparent",
                      borderColor:
                        type === "RD" ? "#4f46e5" : "rgba(148,163,184,0.7)",
                      color: type === "RD" ? "#4f46e5" : "#2563eb"
                    }}
                    onClick={() => setType("RD")}
                  >
                    RD (Monthly)
                  </button>
                </div>
              </div>

              <div className="field">
                <label className="label">
                  {type === "FD" ? "Deposit Amount (₹)" : "Monthly Deposit (₹)"}
                </label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={type === "FD" ? "e.g. 100000" : "e.g. 2000"}
                />
              </div>

              <div className="field">
                <label className="label">Interest Rate (% per year)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 7.5"
                />
              </div>

              <div className="field">
                <label className="label">Tenure (years)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="e.g. 5"
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate Maturity
              </button>
              <p className="helper-text">
                FD uses yearly compounding; RD uses monthly deposits with monthly
                compounding. Bank values may differ slightly due to rounding rules.
              </p>
            </div>

            {/* Right side: Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Total Investment</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.invested)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Maturity Value</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.maturity)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Interest Earned</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.interest)}` : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
