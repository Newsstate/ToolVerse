import { useState } from "react";
import Link from "next/link";

export default function SalesTaxCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [taxRate, setTaxRate] = useState("10");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(taxRate);

    if (!a || !r) {
      setResult(null);
      return;
    }

    const taxAmount = (a * r) / 100;
    const total = a + taxAmount;

    setResult({
      base: a,
      taxAmount,
      total,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Money Tool</div>
          <h1 className="page-title">Sales Tax Calculator</h1>
          <p className="page-subtitle">
            Calculate sales tax on a purchase and find the total cost including tax.
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
                <label className="label">Price Before Tax (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 2500"
                />
              </div>

              <div className="field">
                <label className="label">Sales Tax Rate (%)</label>
                <input
                  className="input"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Sales Tax
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Sales Tax Amount</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.taxAmount)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Price (incl. tax)</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.total)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Use this for any region-based sales tax. Just plug in the correct tax
                  percentage for your state or country.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
