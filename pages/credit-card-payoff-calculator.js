import { useState } from "react";
import Link from "next/link";

export default function CreditCardPayoffCalculatorPage() {
  const [balance, setBalance] = useState("");
  const [apr, setApr] = useState("36");
  const [monthlyPayment, setMonthlyPayment] = useState("3000");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const B = parseFloat(balance);
    const A = parseFloat(apr);
    const P = parseFloat(monthlyPayment);

    if (!B || !A || !P) {
      setResult(null);
      return;
    }

    const r = A / 100 / 12; // monthly interest rate

    let monthsToPayoff;
    let totalPaid;
    let totalInterest;

    if (r === 0) {
      // No interest case: simple division
      monthsToPayoff = Math.ceil(B / P);
      totalPaid = monthsToPayoff * P;
      totalInterest = totalPaid - B;
    } else {
      const minPaymentToCoverInterest = B * r;
      if (P <= minPaymentToCoverInterest) {
        // Payment too low, debt never paid off
        setResult({
          impossible: true,
        });
        return;
      }

      // n = -ln(1 - r * B / P) / ln(1 + r)
      const numerator = -Math.log(1 - (r * B) / P);
      const denominator = Math.log(1 + r);
      monthsToPayoff = Math.ceil(numerator / denominator);

      totalPaid = monthsToPayoff * P;
      totalInterest = totalPaid - B;
    }

    setResult({
      impossible: false,
      monthsToPayoff,
      totalPaid,
      totalInterest,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Credit Card Tool</div>
          <h1 className="page-title">Credit Card Payoff Calculator</h1>
          <p className="page-subtitle">
            See how long it will take to pay off your credit card and how much interest
            you&apos;ll pay with a fixed monthly payment.
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
                <label className="label">Current Balance (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder="e.g. 75000"
                />
              </div>

              <div className="field">
                <label className="label">APR (Annual Interest Rate, %)</label>
                <input
                  className="input"
                  type="number"
                  value={apr}
                  onChange={(e) => setApr(e.target.value)}
                  placeholder="e.g. 36"
                />
              </div>

              <div className="field">
                <label className="label">Monthly Payment (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  placeholder="e.g. 4000"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Payoff Time
              </button>
            </div>

            {/* Results */}
            <div>
              {!result && (
                <div className="result-box">
                  <div className="result-title">Payoff Summary</div>
                  <div className="result-value">—</div>
                </div>
              )}

              {result && result.impossible && (
                <>
                  <div className="result-box">
                    <div className="result-title">Payoff Not Possible</div>
                    <div className="result-value">—</div>
                  </div>
                  <p className="helper-text" style={{ marginTop: 8 }}>
                    Your monthly payment is too low to even cover the interest. Increase
                    the payment amount to start reducing the balance.
                  </p>
                </>
              )}

              {result && !result.impossible && (
                <>
                  <div className="result-box">
                    <div className="result-title">Months to Payoff</div>
                    <div className="result-value">
                      {result.monthsToPayoff} months
                    </div>
                  </div>

                  <div className="result-box" style={{ marginTop: 10 }}>
                    <div className="result-title">Total Paid</div>
                    <div className="result-value">
                      ₹ {fmt(result.totalPaid)}
                    </div>
                  </div>

                  <div className="result-box" style={{ marginTop: 10 }}>
                    <div className="result-title">Total Interest Paid</div>
                    <div className="result-value">
                      ₹ {fmt(result.totalInterest)}
                    </div>
                  </div>

                  <p className="helper-text" style={{ marginTop: 8 }}>
                    This assumes a fixed interest rate and fixed monthly payment. Real
                    statements may vary slightly due to billing cycle and fees.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
