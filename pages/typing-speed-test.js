import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const SAMPLE_TEXT =
  "Typing fast comes with practice. Use this typing test to improve your speed and accuracy.";

export default function TypingSpeedTestPage() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [typed, setTyped] = useState("");
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTest = () => {
    setTyped("");
    setTimeLeft(60);
    setRunning(true);
  };

  const stopTest = () => setRunning(false);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const wordCount = typed.trim().split(/\s+/).filter(Boolean).length;
  const wpm = Math.round((wordCount / (60 - timeLeft || 1)) * 60);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Productivity Tool</div>
          <h1 className="page-title">Typing Speed Test</h1>
          <p className="page-subtitle">
            Type the sentence below for 60 seconds and test your WPM score.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <p style={{ marginBottom: 10 }}>{SAMPLE_TEXT}</p>

          <textarea
            className="input"
            rows="6"
            disabled={!running}
            placeholder={running ? "Start typing..." : "Click Start to begin!"}
            style={{ resize: "none" }}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
          />

          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="btn" disabled={running} onClick={startTest}>
              Start
            </button>
            <button className="btn-outline" disabled={!running} onClick={stopTest}>
              Stop
            </button>
          </div>

          <div className="result-box" style={{ marginTop: 16 }}>
            <div className="result-title">Time Left</div>
            <div className="result-value">{timeLeft}s</div>
          </div>

          <div className="result-box" style={{ marginTop: 10 }}>
            <div className="result-title">Words Per Minute</div>
            <div className="result-value">
              {running ? "—" : `${wpm} WPM`}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
