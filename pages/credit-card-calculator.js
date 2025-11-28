import { useState } from "react";
import Link from "next/link";

export default function CreditCardCalculatorPage() {
  const [balance, setBalance] = useState("");
  const [apr, setApr] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const B0 = parseFloat(balance);
    const r = parseFloat(apr);
    const pay = parseFloat(monthlyPayment);

    setError("");
    setResult(null);

    if (!B0 || !r || !pay) {
      setError("Please enter balance, APR and monthly payment.");
      return;
    }

    const monthlyRate = r / 12 / 100;
    if (pay <= B0 * monthlyRate) {
      setError(
        "Monthly payment is too low to cover interest. Increase payment amount."
      );
      return;
    }

    let months = 0;
    let balanceLeft = B0;
    let totalInterest = 0;

    // Simple amortization loop with cap to avoid infinite loops
    while (balanceLeft > 0 && months < 600) {
      const interest = balanceLeft * monthlyRate;
      const principal = pay - interest;
      balanceLeft = balanceLeft + interest - pay;
      totalInterest += interest;
      months += 1;

      if (balanceLeft < 0) balanceLeft = 0;
    }

    setResult({
      months,
      totalInterest,
      totalPaid: B0 + totalInterest
    });
  };

  const fmt = (val) =>
    val.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const monthsToYears = (m) => {
    const years = Math.floor(m / 12);
    const rem = m % 12;
    if (years === 0) return `${m} month${m === 1 ? "" : "s"}`;
    if (rem === 0) return `${years} year${years === 1 ? "" : "s"}`;
    return `${years}y ${rem}m`;
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Finance Tool</div>
          <h1 className="page-title">Credit Card Interest Calculator</h1>
          <p className="page-subtitle">
            Estimate how long it will take to pay off your credit card and how much
            interest you’ll pay, based on balance, APR and fixed monthly payment.
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
                <label className="label">Current balance (₹)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder="e.g. 50000"
                />
              </div>

              <div className="field">
                <label className="label">Annual percentage rate (APR %)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={apr}
                  onChange={(e) => setApr(e.target.value)}
                  placeholder="e.g. 36"
                />
              </div>

              <div className="field">
                <label className="label">Planned monthly payment (₹)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  placeholder="e.g. 4000"
                />
              </div>

              {error && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#b91c1c",
                    marginBottom: 8
                  }}
                >
                  {error}
                </p>
              )}

              <button type="button" className="btn" onClick={calculate}>
                Calculate Payoff Time
              </button>
              <p className="helper-text">
                This is an estimate only. Actual card charges, fees and rate changes are
                not included.
              </p>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Time to pay off</div>
                <div className="result-value" style={{ fontSize: "1.05rem" }}>
                  {result ? monthsToYears(result.months) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Interest Paid</div>
                <div className="result-value" style={{ fontSize: "1rem" }}>
                  {result ? `₹ ${fmt(result.totalInterest)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Paid (Principal + Interest)</div>
                <div className="result-value" style={{ fontSize: "1rem" }}>
                  {result ? `₹ ${fmt(result.totalPaid)}` : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
