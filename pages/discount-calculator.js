import { useState } from "react";
import Link from "next/link";

export default function DiscountCalculatorPage() {
  const [price, setPrice] = useState("");
  const [discountRate, setDiscountRate] = useState("10");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discountRate);

    if (!p || d < 0) {
      setResult(null);
      return;
    }

    const discountAmount = (p * d) / 100;
    const finalPrice = p - discountAmount;

    setResult({
      price: p,
      discountAmount,
      finalPrice,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Shopping Tool</div>
          <h1 className="page-title">Discount Calculator</h1>
          <p className="page-subtitle">
            Quickly find the discount amount and final price after applying a percentage off.
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
                <label className="label">Original Price (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 1999"
                />
              </div>

              <div className="field">
                <label className="label">Discount Rate (%)</label>
                <input
                  className="input"
                  type="number"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                  placeholder="e.g. 15"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Discount
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">You Save</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.discountAmount)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Final Price After Discount</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.finalPrice)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Handy for sale tags like &quot;Flat 20% off&quot;—just plug in the
                  original price and discount percentage.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
