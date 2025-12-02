import { useState } from "react";
import Link from "next/link";

export default function PaceCalculatorPage() {
  const [distanceKm, setDistanceKm] = useState("");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("0");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const d = parseFloat(distanceKm);
    const h = parseInt(hours || "0", 10);
    const m = parseInt(minutes || "0", 10);
    const s = parseInt(seconds || "0", 10);

    const totalSec = h * 3600 + m * 60 + s;

    if (!d || d <= 0 || !totalSec || totalSec <= 0) {
      setResult(null);
      return;
    }

    const paceSecPerKm = totalSec / d;
    const paceMinKm = Math.floor(paceSecPerKm / 60);
    const paceSecKm = Math.round(paceSecPerKm % 60);

    const distanceMiles = d / 1.60934;
    const paceSecPerMile = totalSec / distanceMiles;
    const paceMinMile = Math.floor(paceSecPerMile / 60);
    const paceSecMile = Math.round(paceSecPerMile % 60);

    const speedKmH = d / (totalSec / 3600);

    setResult({
      paceMinKm,
      paceSecKm,
      paceMinMile,
      paceSecMile,
      speedKmH,
    });
  };

  const pad = (n) => n.toString().padStart(2, "0");
  const fmt1 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 1 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Running Tool</div>
          <h1 className="page-title">Pace Calculator</h1>
          <p className="page-subtitle">
            Enter your run distance and finish time to get your pace per kilometre, per
            mile, and average speed.
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
                <label className="label">Distance (km)</label>
                <input
                  className="input"
                  type="number"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(e.target.value)}
                  placeholder="e.g. 5"
                  step="0.01"
                />
              </div>

              <div className="field">
                <label className="label">Time</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="hh"
                    min="0"
                  />
                  <input
                    className="input"
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    placeholder="mm"
                    min="0"
                  />
                  <input
                    className="input"
                    type="number"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    placeholder="ss"
                    min="0"
                  />
                </div>
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Pace
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Pace per km</div>
                <div className="result-value">
                  {result
                    ? `${pad(result.paceMinKm)}:${pad(
                        result.paceSecKm
                      )} min/km`
                    : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Pace per mile</div>
                <div className="result-value">
                  {result
                    ? `${pad(result.paceMinMile)}:${pad(
                        result.paceSecMile
                      )} min/mile`
                    : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Average Speed</div>
                <div className="result-value">
                  {result ? `${fmt1(result.speedKmH)} km/h` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Use this to plan future race goals or to convert between different run
                  distances and target paces.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
