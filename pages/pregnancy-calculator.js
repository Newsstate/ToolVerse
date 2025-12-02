import { useState } from "react";
import Link from "next/link";

const DAY_MS = 24 * 60 * 60 * 1000;

function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PregnancyCalculatorPage() {
  const [lmp, setLmp] = useState(""); // last menstrual period (first day)
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!lmp) {
      setResult(null);
      return;
    }

    const lmpDate = new Date(lmp);
    if (isNaN(lmpDate.getTime())) {
      setResult(null);
      return;
    }

    const dueDate = new Date(lmpDate.getTime() + 280 * DAY_MS); // 40 weeks

    const today = new Date();
    const diffMs = today.getTime() - lmpDate.getTime();
    if (diffMs < 0) {
      setResult(null);
      return;
    }

    const weeks = Math.floor(diffMs / (7 * DAY_MS));
    const days = Math.floor((diffMs % (7 * DAY_MS)) / DAY_MS);

    // Weeks until due date
    const remainingMs = dueDate.getTime() - today.getTime();
    const remainingWeeks =
      remainingMs > 0 ? Math.floor(remainingMs / (7 * DAY_MS)) : 0;

    let trimester = "First trimester";
    if (weeks >= 13 && weeks < 27) trimester = "Second trimester";
    else if (weeks >= 27) trimester = "Third trimester";

    setResult({
      dueDate,
      weeks,
      days,
      trimester,
      remainingWeeks,
    });
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Pregnancy Tool</div>
          <h1 className="page-title">Pregnancy Due Date Calculator</h1>
          <p className="page-subtitle">
            Estimate your due date and current gestational age based on the first day of
            your last menstrual period (LMP).
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
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

              <button type="button" className="btn" onClick={calculate}>
                Calculate Due Date
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Estimated Due Date</div>
                <div className="result-value">
                  {result ? formatDate(result.dueDate) : "—"}
                </div>
              </div>

              {result && (
                <>
                  <div
                    className="result-box"
                    style={{ marginTop: 10 }}
                  >
                    <div className="result-title">
                      Current Gestational Age
                    </div>
                    <div className="result-value">
                      {result.weeks} weeks {result.days} days
                    </div>
                  </div>

                  <div
                    className="result-box"
                    style={{ marginTop: 10 }}
                  >
                    <div className="result-title">Trimester</div>
                    <div className="result-value">
                      {result.trimester}
                    </div>
                  </div>

                  <div
                    className="result-box"
                    style={{ marginTop: 10 }}
                  >
                    <div className="result-title">
                      Weeks Until Due Date (approx.)
                    </div>
                    <div className="result-value">
                      {result.remainingWeeks} weeks
                    </div>
                  </div>

                  <p
                    className="helper-text"
                    style={{ marginTop: 8 }}
                  >
                    This is an estimate based on a typical 40-week
                    pregnancy. Always rely on your doctor or
                    ultrasound reports for medical decisions.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
