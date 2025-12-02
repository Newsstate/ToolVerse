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

export default function OvulationCalculatorPage() {
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

    // Ovulation ~ cycleLength - 14 days after LMP
    const ovulationOffset = cycle - 14;
    const ovulationDate = new Date(
      lmpDate.getTime() + ovulationOffset * DAY_MS
    );

    const fertileStart = new Date(
      ovulationDate.getTime() - 4 * DAY_MS
    );
    const fertileEnd = new Date(
      ovulationDate.getTime() + 1 * DAY_MS
    );

    setResult({
      ovulationDate,
      fertileStart,
      fertileEnd,
    });
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Fertility Tool</div>
          <h1 className="page-title">Ovulation & Fertile Window Calculator</h1>
          <p className="page-subtitle">
            Estimate your likely ovulation day and fertile window using the first day of
            your last period and your average cycle length.
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
                Calculate Ovulation
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Estimated Ovulation Day</div>
                <div className="result-value">
                  {result ? formatDate(result.ovulationDate) : "—"}
                </div>
              </div>

              {result && (
                <>
                  <div
                    className="result-box"
                    style={{ marginTop: 10 }}
                  >
                    <div className="result-title">
                      Fertile Window (approx.)
                    </div>
                    <div className="result-value">
                      {formatDate(result.fertileStart)} –{" "}
                      {formatDate(result.fertileEnd)}
                    </div>
                  </div>

                  <p
                    className="helper-text"
                    style={{ marginTop: 8 }}
                  >
                    Ovulation and fertility can vary each cycle,
                    especially with stress, illness or irregular
                    periods. Use this as a guide only — talk to a
                    doctor for personalised advice.
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
