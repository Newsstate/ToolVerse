import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function StopwatchPage() {
  const [running, setRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      const now = Date.now();
      startTimeRef.current = now - elapsedMs;
      intervalRef.current = setInterval(() => {
        setElapsedMs(Date.now() - startTimeRef.current);
      }, 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setElapsedMs(0);
  };

  const formatTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const centi = Math.floor((ms % 1000) / 10);
    const pad = (n, len = 2) => String(n).padStart(len, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(centi)}`;
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Time Tool</div>
          <h1 className="page-title">Stopwatch</h1>
          <p className="page-subtitle">
            Simple stopwatch to track elapsed time for activities, workouts and tasks.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="result-box" style={{ textAlign: "center" }}>
                <div className="result-title">Elapsed Time</div>
                <div className="result-value" style={{ fontSize: "1.8rem" }}>
                  {formatTime(elapsedMs)}
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className="btn" onClick={start} disabled={running}>
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
                  disabled={elapsedMs === 0}
                >
                  Reset
                </button>
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                Stopwatch resets if you refresh the page. Keep this tab open for long timings.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
