import { useState } from "react";
import Link from "next/link";

export default function LoanComparisonCalculatorPage() {
  const [amount, setAmount] = useState("500000");

  const [rate1, setRate1] = useState("10");
  const [years1, setYears1] = useState("5");

  const [rate2, setRate2] = useState("11");
  const [years2, setYears2] = useState("5");

  const [result, setResult] = useState(null);

  const calculate = () => {
    const P = parseFloat(amount);
    const annualRate1 = parseFloat(rate1);
    const tenureYears1 = parseFloat(years1);
    const annualRate2 = parseFloat(rate2);
    const tenureYears2 = parseFloat(years2);

    if (!P || !annualRate1 || !tenureYears1 || !annualRate2 || !tenureYears2) {
      setResult(null);
      return;
    }

    const compute = (rate, years) => {
      const r = rate / 12 / 100;
      const n = years * 12;
      const pow = Math.pow(1 + r, n);
      const emi = (P * r * pow) / (pow - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - P;
      return { emi, totalPayment, totalInterest, months: n };
    };

    const loan1 = compute(annualRate1, tenureYears1);
    const loan2 = compute(annualRate2, tenureYears2);

    setResult({ loan1, loan2 });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Loan Tool</div>
          <h1 className="page-title">Loan Comparison Calculator</h1>
          <p className="page-subtitle">
            Compare two loan offers side by side on EMI, total interest and total
            repayment.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="field">
            <label className="label">Loan Amount (₹) for both offers</label>
            <input
              className="input"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 500000"
            />
          </div>

          <div className="grid grid-2" style={{ marginTop: 12 }}>
            <div>
              <h3 style={{ fontSize: "0.95rem", marginBottom: 8 }}>
                Loan Offer A
              </h3>
              <div className="field">
                <label className="label">Interest Rate (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={rate1}
                  onChange={(e) => setRate1(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="label">Tenure (years)</label>
                <input
                  className="input"
                  type="number"
                  value={years1}
                  onChange={(e) => setYears1(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "0.95rem", marginBottom: 8 }}>
                Loan Offer B
              </h3>
              <div className="field">
                <label className="label">Interest Rate (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={rate2}
                  onChange={(e) => setRate2(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="label">Tenure (years)</label>
                <input
                  className="input"
                  type="number"
                  value={years2}
                  onChange={(e) => setYears2(e.target.value)}
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
            Compare Loans
          </button>

          {result && (
            <div className="grid grid-2" style={{ marginTop: 16 }}>
              <div className="result-box">
                <div className="result-title">Loan Offer A</div>
                <div className="helper-text">
                  EMI: ₹ {fmt(result.loan1.emi)}
                </div>
                <div className="helper-text">
                  Total Interest: ₹ {fmt(result.loan1.totalInterest)}
                </div>
                <div className="helper-text">
                  Total Payment: ₹ {fmt(result.loan1.totalPayment)}
                </div>
              </div>

              <div className="result-box">
                <div className="result-title">Loan Offer B</div>
                <div className="helper-text">
                  EMI: ₹ {fmt(result.loan2.emi)}
                </div>
                <div className="helper-text">
                  Total Interest: ₹ {fmt(result.loan2.totalInterest)}
                </div>
                <div className="helper-text">
                  Total Payment: ₹ {fmt(result.loan2.totalPayment)}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
