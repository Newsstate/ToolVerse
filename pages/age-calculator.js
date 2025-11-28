import { useState } from "react";
import Link from "next/link";

function diffDates(fromDate, toDate) {
  let years = toDate.getFullYear() - fromDate.getFullYear();
  let months = toDate.getMonth() - fromDate.getMonth();
  let days = toDate.getDate() - fromDate.getDate();

  if (days < 0) {
    const prevMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}

export default function AgeCalculatorPage() {
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!dob) return;
    const from = new Date(dob);
    const to = asOf ? new Date(asOf) : new Date();
    if (isNaN(from.getTime()) || isNaN(to.getTime()) || to < from) return;

    const diff = diffDates(from, to);
    setResult(diff);
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Date Tool</div>
          <h1 className="page-title">Age Calculator</h1>
          <p className="page-subtitle">
            Calculate exact age in years, months and days from your date of birth. You
            can also set a custom “as of” date.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <form onSubmit={handleCalculate} className="grid grid-2">
            <div>
              <div className="field">
                <label className="label">Date of birth</label>
                <input
                  className="input"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">
                  As of date <span style={{ fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  className="input"
                  type="date"
                  value={asOf}
                  onChange={(e) => setAsOf(e.target.value)}
                />
                <p className="helper-text">
                  Leave empty to calculate age as of today.
                </p>
              </div>

              <button className="btn" type="submit">
                Calculate Age
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Exact Age</div>
                <div className="result-value" style={{ fontSize: "1.05rem" }}>
                  {result
                    ? `${result.years} years, ${result.months} months, ${result.days} days`
                    : "—"}
                </div>
              </div>
              <p className="helper-text" style={{ marginTop: 10 }}>
                This tool uses calendar dates (not average month lengths) for a more
                natural, human-readable age.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
