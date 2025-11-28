import { useState } from "react";
import Link from "next/link";

const currencies = ["INR", "USD", "EUR", "GBP", "AED"];

export default function EmiCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureType, setTenureType] = useState("years");
  const [currency, setCurrency] = useState("INR");
  const [emiResult, setEmiResult] = useState(null);

  const calcEmi = (e) => {
    e.preventDefault();
    const P = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const T = parseFloat(tenure);

    if (!P || !annualRate || !T) return;

    const months = tenureType === "years" ? T * 12 : T;
    const R = annualRate / 12 / 100;
    if (R === 0) {
      const emi = P / months;
      setEmiResult({
        emi,
        totalPayment: emi * months,
        totalInterest: emi * months - P,
        months
      });
      return;
    }

    const factor = Math.pow(1 + R, months);
    const emi = (P * R * factor) / (factor - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - P;

    setEmiResult({
      emi,
      totalPayment,
      totalInterest,
      months
    });
  };

  const formatMoney = (value) =>
    value.toLocaleString(undefined, {
      maximumFractionDigits: 2
    });

  const currencySymbol = (c) => {
    switch (c) {
      case "INR":
        return "₹";
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "AED":
        return "د.إ";
      default:
        return "";
    }
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Finance Tool</div>
          <h1 className="page-title">Loan EMI Calculator</h1>
          <p className="page-subtitle">
            Estimate your monthly EMI, total interest and total payment for any loan.
            Supports multiple currencies.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <form onSubmit={calcEmi} className="grid grid-2">
            <div>
              <div className="field">
                <label className="label">Loan amount</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 500000"
                />
              </div>

              <div className="field">
                <label className="label">Annual interest rate (%)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 8.5"
                />
              </div>

              <div className="field">
                <label className="label">Loan tenure</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="e.g. 5"
                    style={{ flex: 1 }}
                  />
                  <select
                    className="select"
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value)}
                    style={{ width: 120 }}
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label">Currency</label>
                <select
                  className="select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {currencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn">
                Calculate EMI
              </button>
              <p className="helper-text">
                EMI formula: P × R × (1+R)<sup>n</sup> / ((1+R)<sup>n</sup> − 1)
              </p>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Monthly EMI</div>
                <div className="result-value">
                  {emiResult
                    ? `${currencySymbol(currency)} ${formatMoney(emiResult.emi)}`
                    : "—"}
                </div>
              </div>

              <div
                className="grid"
                style={{ marginTop: 12, gap: 10, gridTemplateColumns: "1fr 1fr" }}
              >
                <div className="result-box">
                  <div className="result-title">Total Interest</div>
                  <div className="result-value" style={{ fontSize: "1rem" }}>
                    {emiResult
                      ? `${currencySymbol(currency)} ${formatMoney(
                          emiResult.totalInterest
                        )}`
                      : "—"}
                  </div>
                </div>
                <div className="result-box">
                  <div className="result-title">Total Payment</div>
                  <div className="result-value" style={{ fontSize: "1rem" }}>
                    {emiResult
                      ? `${currencySymbol(currency)} ${formatMoney(
                          emiResult.totalPayment
                        )}`
                      : "—"}
                  </div>
                </div>
              </div>

              <p className="helper-text" style={{ marginTop: 10 }}>
                This is an approximate estimate only. Always confirm final EMI with your
                bank or lender.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
