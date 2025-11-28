import { useState } from "react";
import Link from "next/link";

export default function CgpaPercentagePage() {
  const [cgpa, setCgpa] = useState("");
  const [scale, setScale] = useState("10"); // CGPA out of 10 by default
  const [percentage, setPercentage] = useState(null);

  const calculate = () => {
    const c = parseFloat(cgpa);
    const s = parseFloat(scale);

    if (Number.isNaN(c) || Number.isNaN(s) || c < 0 || c > s) {
      setPercentage(null);
      return;
    }

    // Standard rule: Percentage = (CGPA / MaxCGPA) * 100 OR 9.5 multiplier (common)
    // Here we apply the popular 9.5 multiplier when scale is 10,
    // else we use simple normalization.
    let pct;
    if (s === 10) {
      pct = c * 9.5;
    } else {
      pct = (c / s) * 100;
    }

    setPercentage(pct);
  };

  const fmt = (v) =>
    v.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Education Tool</div>
          <h1 className="page-title">CGPA to Percentage Converter</h1>
          <p className="page-subtitle">
            Convert your CGPA into percentage. For CGPA out of 10, the common formula
            CGPA × 9.5 is used. For other scales, a simple (CGPA / Max CGPA) × 100 is used.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Left: Inputs */}
            <div>
              <div className="field">
                <label className="label">Your CGPA</label>
                <input
                  className="input"
                  type="number"
                  step="0.01"
                  min="0"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  placeholder="e.g. 8.4"
                />
              </div>

              <div className="field">
                <label className="label">CGPA Scale</label>
                <select
                  className="select"
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                >
                  <option value="10">Out of 10</option>
                  <option value="9">Out of 9</option>
                  <option value="8">Out of 8</option>
                </select>
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Convert to Percentage
              </button>

              <p className="helper-text" style={{ marginTop: 8 }}>
                Always check your university&apos;s official conversion rule if they have
                a specific formula.
              </p>
            </div>

            {/* Right: Result */}
            <div>
              <div className="result-box">
                <div className="result-title">Percentage</div>
                <div className="result-value">
                  {percentage !== null ? `${fmt(percentage)} %` : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
