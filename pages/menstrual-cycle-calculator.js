import { useState } from "react";
import Link from "next/link";

const DAY_MS = 24 * 60 * 60 * 1000;

function addDays(date, days) {
  return new Date(date.getTime() + days * DAY_MS);
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function MenstrualCycleCalculatorPage() {
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!lmp) {
      setResult(null);
      return;
    }

    const lmpDate = new Date(lmp);
    const cycle = parseInt(cycleLength || "0", 10);

    if (isNaN(lmpDate.getTime()) || !cycle || cycle < 20 || cycle > 45) {
      setResult(null);
      return;
    }

    const today = new Date();

    // Move forward in cycle steps until we find the next upcoming period
    let next = new Date(lmpDate);
    while (next.getTime() + DAY_MS < today.getTime()) {
      next = addDays(next, cycle);
    }

    const periods = [next];
    periods.push(addDays(next, cycle));
    periods.push(addDays(next, cycle * 2));

    setResult({
      nextPeriod: periods[0],
      nextThree: periods,
      cycle,
    });
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Cycle Tool</div>
          <h1 className="page-title">Menstrual Cycle Calculator</h1>
          <p className="page-subtitle">
            Predict your upcoming period dates based on the first day of your last period
            and your average cycle length.
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
                <label className="label">
                  First Day of Last Period (LMP)
                </label>
                <input
                  className="input"
                  type="date"
                  value={lmp}
                  onChange={(e) => setLmp(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Average Cycle Length (days)</label>
                <input
                  className="input"
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  placeholder="e.g. 28"
                  min="20"
                  max="45"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Next Period
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Next Expected Period</div>
                <div className="result-value">
                  {result ? formatDate(result.nextPeriod) : "—"}
                </div>
              </div>

              {result && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Next 3 Predicted Periods</div>
                  <div className="result-value" style={{ fontSize: "0.9rem" }}>
                    {result.nextThree.map((d, i) => (
                      <div key={i}>{formatDate(d)}</div>
                    ))}
                  </div>
                </div>
              )}

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Cycles can shift with stress, illness, travel and hormones. Use this as
                  a guide, not a strict guarantee. If periods are very irregular, consider
                  talking to a doctor.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
