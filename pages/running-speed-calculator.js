import { useState } from "react";
import Link from "next/link";

export default function RunningSpeedCalculatorPage() {
  const [distanceKm, setDistanceKm] = useState("");
  const [timeMinutes, setTimeMinutes] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const d = parseFloat(distanceKm);
    const tMin = parseFloat(timeMinutes);

    if (!d || d <= 0 || !tMin || tMin <= 0) {
      setResult(null);
      return;
    }

    const hours = tMin / 60;
    const totalSec = tMin * 60;

    const speedKmH = d / hours;
    const speedMps = (d * 1000) / totalSec;

    const paceSecPerKm = totalSec / d;
    const paceMinKm = Math.floor(paceSecPerKm / 60);
    const paceSecKm = Math.round(paceSecPerKm % 60);

    setResult({
      speedKmH,
      speedMps,
      paceMinKm,
      paceSecKm,
    });
  };

  const pad = (n) => n.toString().padStart(2, "0");
  const fmt2 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Running Tool</div>
          <h1 className="page-title">Running Speed Calculator</h1>
          <p className="page-subtitle">
            Enter your run distance and time in minutes to get your average speed and pace
            per kilometre.
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
                  placeholder="e.g. 3"
                  step="0.01"
                />
              </div>

              <div className="field">
                <label className="label">Time (minutes)</label>
                <input
                  className="input"
                  type="number"
                  value={timeMinutes}
                  onChange={(e) => setTimeMinutes(e.target.value)}
                  placeholder="e.g. 18"
                  step="0.1"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Speed
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Average Speed</div>
                <div className="result-value">
                  {result
                    ? `${fmt2(result.speedKmH)} km/h`
                    : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Speed (m/s)</div>
                <div className="result-value">
                  {result
                    ? `${fmt2(result.speedMps)} m/s`
                    : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Pace per km</div>
                <div className="result-value">
                  {result
                    ? `${pad(result.paceMinKm)}:${pad(
                        result.paceSecKm
                      )} min/km`
                    : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Great for quick checks of training pace during intervals or tempo runs.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
