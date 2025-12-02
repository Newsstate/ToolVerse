import { useState } from "react";
import Link from "next/link";

export default function VatCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [vatRate, setVatRate] = useState("18");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(vatRate);

    if (!a || !r) {
      setResult(null);
      return;
    }

    const vatAmount = (a * r) / 100;
    const total = a + vatAmount;

    setResult({
      base: a,
      vatAmount,
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
          <h1 className="page-title">VAT Calculator</h1>
          <p className="page-subtitle">
            Quickly add VAT to a price and see the tax amount plus total payable.
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
                <label className="label">Price Before VAT (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 1000"
                />
              </div>

              <div className="field">
                <label className="label">VAT Rate (%)</label>
                <input
                  className="input"
                  type="number"
                  value={vatRate}
                  onChange={(e) => setVatRate(e.target.value)}
                  placeholder="e.g. 18"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate VAT
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">VAT Amount</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.vatAmount)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Price (incl. VAT)</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.total)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This tool assumes VAT is applied on the entered base price. Always confirm
                  exact rates as per your country’s tax rules.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
