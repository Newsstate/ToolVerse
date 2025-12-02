import { useState } from "react";
import Link from "next/link";

function parseTimeToMinutes(str) {
  if (!str || !str.includes(":")) return null;
  const [hStr, mStr] = str.split(":");
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (Number.isNaN(h) || Number.isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
    return null;
  }
  return h * 60 + m;
}

export default function SleepCalculatorPage() {
  const [age, setAge] = useState("");
  const [bedtime, setBedtime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(age);
    const bedMin = parseTimeToMinutes(bedtime);
    const wakeMin = parseTimeToMinutes(wakeTime);

    if (!a || bedMin === null || wakeMin === null) {
      setResult(null);
      return;
    }

    // If wake time is earlier than bedtime, assume sleep crosses midnight.
    let durationMin = wakeMin - bedMin;
    if (durationMin <= 0) {
      durationMin += 24 * 60;
    }

    const hours = durationMin / 60;

    // Simple recommended ranges
    let recMin = 7;
    let recMax = 9;
    if (a < 6) {
      recMin = 10;
      recMax = 13;
    } else if (a < 13) {
      recMin = 9;
      recMax = 12;
    } else if (a < 18) {
      recMin = 8;
      recMax = 10;
    } else if (a > 64) {
      recMin = 7;
      recMax = 8;
    }

    setResult({
      hours,
      recMin,
      recMax,
    });
  };

  const fmt2 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Health Tool</div>
          <h1 className="page-title">Sleep Calculator</h1>
          <p className="page-subtitle">
            Calculate how many hours you&apos;re actually sleeping between your bedtime and
            wake-up time — and compare with general recommendations.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Inputs */}
            <div>
              <div className="field">
                <label className="label">Age (years)</label>
                <input
                  className="input"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 25"
                />
              </div>

              <div className="field">
                <label className="label">Bedtime (24h format, HH:MM)</label>
                <input
                  className="input"
                  type="text"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  placeholder="e.g. 23:30"
                />
              </div>

              <div className="field">
                <label className="label">Wake-up Time (24h format, HH:MM)</label>
                <input
                  className="input"
                  type="text"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  placeholder="e.g. 07:00"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Sleep Duration
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Time Asleep</div>
                <div className="result-value">
                  {result ? `${fmt2(result.hours)} hours` : "—"}
                </div>
              </div>

              {result && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Recommended Range for Your Age</div>
                  <div className="result-value">
                    {result.recMin} – {result.recMax} hours
                  </div>
                </div>
              )}

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Quality matters as much as quantity — consistent bedtimes, less screen
                  time at night, and a dark, quiet room usually help a lot.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
