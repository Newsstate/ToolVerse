import { useState } from "react";
import Link from "next/link";

export default function PercentCalculatorPage() {
  const [base, setBase] = useState("");
  const [percent, setPercent] = useState("");
  const [value, setValue] = useState("");

  const [part, setPart] = useState("");
  const [whole, setWhole] = useState("");
  const [percentOf, setPercentOf] = useState("");

  const [oldVal, setOldVal] = useState("");
  const [newVal, setNewVal] = useState("");
  const [changeResult, setChangeResult] = useState("");

  const calcValueFromPercent = (e) => {
    e.preventDefault();
    const b = parseFloat(base);
    const p = parseFloat(percent);
    if (!b || isNaN(p)) return;
    setValue(((b * p) / 100).toFixed(2));
  };

  const calcPercentOfWhole = (e) => {
    e.preventDefault();
    const pa = parseFloat(part);
    const wh = parseFloat(whole);
    if (!pa || !wh) return;
    setPercentOf(((pa / wh) * 100).toFixed(2));
  };

  const calcPercentChange = (e) => {
    e.preventDefault();
    const o = parseFloat(oldVal);
    const n = parseFloat(newVal);
    if (!o && o !== 0) return;
    if (o === 0) {
      setChangeResult("N/A (cannot divide by zero)");
      return;
    }
    const change = ((n - o) / Math.abs(o)) * 100;
    setChangeResult(change.toFixed(2));
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Percent Calculator</h1>
          <p className="page-subtitle">
            Quickly find percentages, reverse percentages, and percentage change — all in
            one simple tool.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="grid grid-2">
          <div className="card">
            <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 6 }}>
              1. What is X% of Y?
            </h2>
            <form onSubmit={calcValueFromPercent}>
              <div className="field">
                <label className="label">Percentage (X)</label>
                <input
                  className="input"
                  type="number"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  placeholder="e.g. 18"
                />
              </div>
              <div className="field">
                <label className="label">Base value (Y)</label>
                <input
                  className="input"
                  type="number"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  placeholder="e.g. 1299"
                />
              </div>
              <button className="btn" type="submit">
                Calculate
              </button>
            </form>
            <div className="result-box" style={{ marginTop: 10 }}>
              <div className="result-title">Result</div>
              <div className="result-value">{value || "—"}</div>
            </div>
          </div>

          <div className="card">
            <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 6 }}>
              2. X is what % of Y?
            </h2>
            <form onSubmit={calcPercentOfWhole}>
              <div className="field">
                <label className="label">Part (X)</label>
                <input
                  className="input"
                  type="number"
                  value={part}
                  onChange={(e) => setPart(e.target.value)}
                  placeholder="e.g. 250"
                />
              </div>
              <div className="field">
                <label className="label">Whole (Y)</label>
                <input
                  className="input"
                  type="number"
                  value={whole}
                  onChange={(e) => setWhole(e.target.value)}
                  placeholder="e.g. 999"
                />
              </div>
              <button className="btn" type="submit">
                Calculate
              </button>
            </form>
            <div className="result-box" style={{ marginTop: 10 }}>
              <div className="result-title">Result</div>
              <div className="result-value">
                {percentOf ? `${percentOf} %` : "—"}
              </div>
            </div>
          </div>

          <div className="card">
            <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 6 }}>
              3. Percentage change
            </h2>
            <form onSubmit={calcPercentChange}>
              <div className="field">
                <label className="label">Old value</label>
                <input
                  className="input"
                  type="number"
                  value={oldVal}
                  onChange={(e) => setOldVal(e.target.value)}
                  placeholder="e.g. 1000"
                />
              </div>
              <div className="field">
                <label className="label">New value</label>
                <input
                  className="input"
                  type="number"
                  value={newVal}
                  onChange={(e) => setNewVal(e.target.value)}
                  placeholder="e.g. 1200"
                />
              </div>
              <button className="btn" type="submit">
                Calculate
              </button>
            </form>
            <div className="result-box" style={{ marginTop: 10 }}>
              <div className="result-title">Result</div>
              <div className="result-value">
                {changeResult
                  ? `${changeResult}${changeResult.startsWith("N/A") ? "" : " %"}`
                  : "—"}
              </div>
            </div>
            <p className="helper-text">
              Positive = increase, negative = decrease.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
