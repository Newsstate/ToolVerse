import { useState } from "react";
import Link from "next/link";

export default function Vo2MaxCalculatorPage() {
  const [distanceKm, setDistanceKm] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const dKm = parseFloat(distanceKm);
    if (!dKm || dKm <= 0) {
      setResult(null);
      return;
    }

    const dMeters = dKm * 1000;
    const vo2 = (dMeters - 504.9) / 44.73;

    setResult({
      vo2,
    });
  };

  const fmt1 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 1 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Fitness Tool</div>
          <h1 className="page-title">VO₂ Max Calculator</h1>
          <p className="page-subtitle">
            Estimate your VO₂ max from the Cooper 12-minute run test. Enter the distance
            you can cover in 12 minutes.
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
                  Distance Covered in 12 Minutes (km)
                </label>
                <input
                  className="input"
                  type="number"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(e.target.value)}
                  placeholder="e.g. 2.4"
                  step="0.01"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate VO₂ Max
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Estimated VO₂ Max</div>
                <div className="result-value">
                  {result ? `${fmt1(result.vo2)} ml/kg/min` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This is a rough estimate based on a 12-minute run. Lab tests and
                  wearables with heart rate / gas analysis give more precise results.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
