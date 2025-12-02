import { useState } from "react";
import Link from "next/link";

export default function BondYieldCalculatorPage() {
  const [faceValue, setFaceValue] = useState("1000");
  const [couponRate, setCouponRate] = useState("8");
  const [price, setPrice] = useState("950");
  const [yearsToMaturity, setYearsToMaturity] = useState("10");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const F = parseFloat(faceValue);
    const cRate = parseFloat(couponRate);
    const P = parseFloat(price);
    const n = parseFloat(yearsToMaturity);

    if (!F || !cRate || !P || !n) {
      setResult(null);
      return;
    }

    const annualCoupon = (F * cRate) / 100;

    // Current Yield = Coupon / Price
    const currentYield = (annualCoupon / P) * 100;

    // Approximate Yield to Maturity:
    // YTM ≈ (Annual Coupon + (Face - Price) / n) / ((Face + Price) / 2)
    const approxYtm =
      ((annualCoupon + (F - P) / n) / ((F + P) / 2)) * 100;

    setResult({
      annualCoupon,
      currentYield,
      approxYtm,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Investing Tool</div>
          <h1 className="page-title">Bond Yield Calculator</h1>
          <p className="page-subtitle">
            Estimate a bond&apos;s current yield and approximate yield to maturity (YTM)
            based on price, coupon and time left.
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
                <label className="label">Face Value (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={faceValue}
                  onChange={(e) => setFaceValue(e.target.value)}
                  placeholder="e.g. 1000"
                />
              </div>

              <div className="field">
                <label className="label">Coupon Rate (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={couponRate}
                  onChange={(e) => setCouponRate(e.target.value)}
                  placeholder="e.g. 8"
                />
              </div>

              <div className="field">
                <label className="label">Current Market Price (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 950"
                />
              </div>

              <div className="field">
                <label className="label">Years to Maturity</label>
                <input
                  className="input"
                  type="number"
                  value={yearsToMaturity}
                  onChange={(e) => setYearsToMaturity(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Bond Yields
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Annual Coupon Amount</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.annualCoupon)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Current Yield</div>
                <div className="result-value">
                  {result ? `${fmt(result.currentYield)}%` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Approx. Yield to Maturity (YTM)</div>
                <div className="result-value">
                  {result ? `${fmt(result.approxYtm)}%` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  YTM here is an approximation using a standard formula. Exact YTM uses a
                  more complex iterative calculation and may differ slightly.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
