import { useState } from "react";
import Link from "next/link";

export default function AmortizationCalculatorPage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("10");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const tenureYears = parseFloat(years);

    if (!P || !annualRate || !tenureYears) {
      setResult(null);
      return;
    }

    const r = annualRate / 12 / 100;
    const n = tenureYears * 12;
    const pow = Math.pow(1 + r, n);
    const emi = (P * r * pow) / (pow - 1);

    let balance = P;
    const schedule = [];
    for (let i = 1; i <= n && i <= 12; i++) {
      const interest = balance * r;
      const principalPaid = emi - interest;
      balance = balance - principalPaid;
      schedule.push({
        month: i,
        interest,
        principal: principalPaid,
        balance: balance > 0 ? balance : 0
      });
    }

    setResult({
      emi,
      months: n,
      schedule
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Loan Tool</div>
          <h1 className="page-title">Amortization Calculator</h1>
          <p className="page-subtitle">
            Calculate EMI and see how your loan balance reduces over time (first 12
            months schedule).
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Inputs */}
            <div>
              <div className="field">
                <label className="label">Loan Amount (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="e.g. 500000"
                />
              </div>

              <div className="field">
                <label className="label">Interest Rate (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>

              <div className="field">
                <label className="label">Tenure (years)</label>
                <input
                  className="input"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="e.g. 5"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Generate Amortization
              </button>

              {result && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Monthly EMI</div>
                  <div className="result-value">₹ {fmt(result.emi)}</div>
                  <p className="helper-text">
                    Tenure: {result.months} months
                  </p>
                </div>
              )}
            </div>

            {/* Schedule */}
            <div>
              {result ? (
                <>
                  <p className="helper-text" style={{ marginBottom: 8 }}>
                    First 12 months repayment schedule:
                  </p>
                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.8rem"
                      }}
                    >
                      <thead>
                        <tr>
                          <th style={{ borderBottom: "1px solid #ddd", padding: 6, textAlign: "left" }}>Month</th>
                          <th style={{ borderBottom: "1px solid #ddd", padding: 6, textAlign: "right" }}>Interest</th>
                          <th style={{ borderBottom: "1px solid #ddd", padding: 6, textAlign: "right" }}>Principal</th>
                          <th style={{ borderBottom: "1px solid #ddd", padding: 6, textAlign: "right" }}>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.schedule.map((row) => (
                          <tr key={row.month}>
                            <td style={{ padding: 6 }}>{row.month}</td>
                            <td style={{ padding: 6, textAlign: "right" }}>
                              ₹ {fmt(row.interest)}
                            </td>
                            <td style={{ padding: 6, textAlign: "right" }}>
                              ₹ {fmt(row.principal)}
                            </td>
                            <td style={{ padding: 6, textAlign: "right" }}>
                              ₹ {fmt(row.balance)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <p className="helper-text">
                  Enter loan details and click &quot;Generate Amortization&quot; to see
                  a schedule.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
