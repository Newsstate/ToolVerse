import { useState } from "react";
import Link from "next/link";

export default function StockAverageCalculatorPage() {
  const [existingQty, setExistingQty] = useState("");
  const [existingPrice, setExistingPrice] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const eq = parseFloat(existingQty) || 0;
    const ep = parseFloat(existingPrice) || 0;
    const nq = parseFloat(newQty) || 0;
    const np = parseFloat(newPrice) || 0;

    if (eq <= 0 && nq <= 0) {
      setResult(null);
      return;
    }

    const existingCost = eq * ep;
    const newCost = nq * np;
    const totalQty = eq + nq;
    const totalCost = existingCost + newCost;
    const avgPrice = totalQty > 0 ? totalCost / totalQty : 0;

    setResult({
      existingCost,
      newCost,
      totalQty,
      totalCost,
      avgPrice,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Investing Tool</div>
          <h1 className="page-title">Stock Average Calculator</h1>
          <p className="page-subtitle">
            Find your new average buy price after adding more shares at a different price.
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
                <label className="label">Existing Quantity</label>
                <input
                  className="input"
                  type="number"
                  value={existingQty}
                  onChange={(e) => setExistingQty(e.target.value)}
                  placeholder="e.g. 100"
                />
              </div>

              <div className="field">
                <label className="label">Existing Average Price (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={existingPrice}
                  onChange={(e) => setExistingPrice(e.target.value)}
                  placeholder="e.g. 200"
                />
              </div>

              <div className="field">
                <label className="label">New Quantity to Buy</label>
                <input
                  className="input"
                  type="number"
                  value={newQty}
                  onChange={(e) => setNewQty(e.target.value)}
                  placeholder="e.g. 50"
                />
              </div>

              <div className="field">
                <label className="label">New Purchase Price (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="e.g. 180"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Average Price
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Total Quantity</div>
                <div className="result-value">
                  {result ? `${result.totalQty} shares` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Cost</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.totalCost)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">New Average Price per Share</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.avgPrice)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Use this whenever you average up or down on a stock to quickly see your
                  updated average buy price.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
