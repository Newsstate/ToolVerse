import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function CountdownPage() {
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("1");
  const [seconds, setSeconds] = useState("0");
  const [remaining, setRemaining] = useState(60); // in seconds
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Convert inputs to total seconds
  const recalcFromInputs = () => {
    const h = parseInt(hours || "0", 10) || 0;
    const m = parseInt(minutes || "0", 10) || 0;
    const s = parseInt(seconds || "0", 10) || 0;
    const total = h * 3600 + m * 60 + s;
    setRemaining(total > 0 ? total : 0);
  };

  useEffect(() => {
    // When running changes
    if (running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  const start = () => {
    recalcFromInputs();
    setRunning(true);
  };

  const pause = () => setRunning(false);

  const reset = () => {
    setRunning(false);
    recalcFromInputs();
  };

  const formatTime = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Time Tool</div>
          <h1 className="page-title">Countdown Timer</h1>
          <p className="page-subtitle">
            Set a duration and track a countdown for tasks, workouts, study sessions or meetings.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Left: inputs & controls */}
            <div>
              <div className="field">
                <label className="label">Hours</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="label">Minutes</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="label">Seconds</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  type="button"
                  className="btn"
                  onClick={start}
                  disabled={running}
                >
                  Start
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={pause}
                  disabled={!running}
                >
                  Pause
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={reset}
                >
                  Reset
                </button>
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                Timer runs in this tab only. Changing inputs while running will apply on next reset.
              </p>
            </div>

            {/* Right: display */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="result-box" style={{ textAlign: "center" }}>
                <div className="result-title">Remaining Time</div>
                <div className="result-value" style={{ fontSize: "1.6rem" }}>
                  {formatTime(remaining)}
                </div>
                {!running && remaining === 0 && (
                  <p className="helper-text" style={{ marginTop: 8 }}>
                    Time&apos;s up! Reset or set a new duration to start again.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
