import { useState } from "react";
import Link from "next/link";

export default function RefinanceCalculatorPage() {
  const [balance, setBalance] = useState("");
  const [currentRate, setCurrentRate] = useState("9.5");
  const [currentYears, setCurrentYears] = useState("10");
  const [newRate, setNewRate] = useState("8.5");
  const [newYears, setNewYears] = useState("10");
  const [fees, setFees] = useState("0");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const B = parseFloat(balance);
    const r1 = parseFloat(currentRate);
    const y1 = parseFloat(currentYears);
    const r2 = parseFloat(newRate);
    const y2 = parseFloat(newYears);
    const f = parseFloat(fees || "0");

    if (!B || !r1 || !y1 || !r2 || !y2) {
      setResult(null);
      return;
    }

    const computeEmi = (P, annualRate, years) => {
      const rm = annualRate / 12 / 100;
      const n = years * 12;
      if (!rm || !n) return null;
      const pow = Math.pow(1 + rm, n);
      const emi = (P * rm * pow) / (pow - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - P;
      return { emi, totalPayment, totalInterest, months: n };
    };

    const current = computeEmi(B, r1, y1);
    const refi = computeEmi(B, r2, y2);

    if (!current || !refi) {
      setResult(null);
      return;
    }

    const interestSavings = current.totalInterest - (refi.totalInterest + f);
    const monthlySavings = current.emi - refi.emi;

    setResult({
      current,
      refi,
      fees: f,
      interestSavings,
      monthlySavings
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Loan Tool</div>
          <h1 className="page-title">Refinance Calculator</h1>
          <p className="page-subtitle">
            Compare your existing loan vs a new refinance offer and see potential EMI and
            interest savings.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="field">
            <label className="label">Outstanding Loan Balance (₹)</label>
            <input
              className="input"
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="e.g. 1500000"
            />
          </div>

          <div className="grid grid-2" style={{ marginTop: 12 }}>
            <div>
              <h3 style={{ fontSize: "0.95rem", marginBottom: 8 }}>
                Current Loan
              </h3>
              <div className="field">
                <label className="label">Interest Rate (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="label">Remaining Tenure (years)</label>
                <input
                  className="input"
                  type="number"
                  value={currentYears}
                  onChange={(e) => setCurrentYears(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "0.95rem", marginBottom: 8 }}>
                New Refinance Loan
              </h3>
              <div className="field">
                <label className="label">New Interest Rate (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="label">New Tenure (years)</label>
                <input
                  className="input"
                  type="number"
                  value={newYears}
                  onChange={(e) => setNewYears(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="label">Refinance Costs / Fees (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  placeholder="e.g. 20000"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn"
            style={{ marginTop: 10 }}
            onClick={calculate}
          >
            Calculate Refinance Savings
          </button>

          {result && (
            <div style={{ marginTop: 16 }}>
              <div className="grid grid-2">
                <div className="result-box">
                  <div className="result-title">Current Loan EMI</div>
                  <div className="result-value">
                    ₹ {fmt(result.current.emi)}
                  </div>
                  <div className="helper-text">
                    Total Interest: ₹ {fmt(result.current.totalInterest)}
                  </div>
                </div>

                <div className="result-box">
                  <div className="result-title">New Loan EMI</div>
                  <div className="result-value">
                    ₹ {fmt(result.refi.emi)}
                  </div>
                  <div className="helper-text">
                    Total Interest (incl. fees): ₹{" "}
                    {fmt(result.refi.totalInterest + result.fees)}
                  </div>
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Monthly EMI Savings</div>
                <div className="result-value">
                  ₹ {fmt(result.monthlySavings)}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Interest Savings</div>
                <div className="result-value">
                  ₹ {fmt(result.interestSavings)}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
