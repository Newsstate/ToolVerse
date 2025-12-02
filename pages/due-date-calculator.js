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

export default function DueDateCalculatorPage() {
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

    // Naegele’s rule with cycle-length adjustment:
    // Due date ≈ LMP + 280 days + (cycleLength - 28)
    const adjustment = cycle - 28;
    const dueDate = addDays(lmpDate, 280 + adjustment);

    setResult({
      dueDate,
    });
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Pregnancy Tool</div>
          <h1 className="page-title">Due Date Calculator</h1>
          <p className="page-subtitle">
            Estimate your baby&apos;s due date using the first day of your last period and
            your average cycle length.
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
                Calculate Due Date
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Estimated Due Date</div>
                <div className="result-value">
                  {result ? formatDate(result.dueDate) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This is an estimate based on a typical 40-week pregnancy and your cycle
                  length. Ultrasounds and your doctor&apos;s advice are more accurate for
                  medical decisions.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
