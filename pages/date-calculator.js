import { useState } from "react";
import Link from "next/link";

function parseDate(dateStr) {
  if (!dateStr) return null;
  const dt = new Date(dateStr + "T00:00:00");
  if (isNaN(dt.getTime())) return null;
  return dt;
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  return `${d}-${m}-${y}`;
}

export default function DateCalculatorPage() {
  const today = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
    today.getDate()
  )}`;

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const from = parseDate(startDate);
    const to = parseDate(endDate);

    if (!from || !to) {
      setResult(null);
      return;
    }

    const fromMid = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const toMid = new Date(to.getFullYear(), to.getMonth(), to.getDate());

    const diffMs = toMid.getTime() - fromMid.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    const days = Math.abs(diffDays);
    const inclusiveDays = days + 1;

    let direction = "";
    if (diffDays > 0) direction = "End date is after start date";
    else if (diffDays < 0) direction = "End date is before start date";
    else direction = "Both dates are the same";

    setResult({
      start: startDate,
      end: endDate,
      days,
      inclusiveDays,
      direction
    });
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Date Tool</div>
          <h1 className="page-title">Days Between Dates Calculator</h1>
          <p className="page-subtitle">
            Quickly find how many days are between two dates. Useful for leave counting,
            project timelines, subscriptions, or events.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            <div>
              <div className="field">
                <label className="label">Start date</label>
                <input
                  className="input"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">End date</label>
                <input
                  className="input"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate Days
              </button>
              <p className="helper-text">
                Time of day is ignored — only calendar dates are used for this
                calculation.
              </p>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Difference</div>
                <div className="result-value" style={{ fontSize: "1.05rem" }}>
                  {result
                    ? `${result.days} day${result.days === 1 ? "" : "s"} between`
                    : "—"}
                </div>
              </div>

              {result && (
                <>
                  <div className="result-box" style={{ marginTop: 10 }}>
                    <div className="result-title">Inclusive difference</div>
                    <div className="result-value" style={{ fontSize: "1rem" }}>
                      {result.inclusiveDays} day
                      {result.inclusiveDays === 1 ? "" : "s"} (including both start and
                      end dates)
                    </div>
                  </div>

                  <p className="helper-text" style={{ marginTop: 10 }}>
                    From{" "}
                    <strong>{formatDisplayDate(result.start)}</strong> to{" "}
                    <strong>{formatDisplayDate(result.end)}</strong>.
                    <br />
                    {result.direction}.
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
