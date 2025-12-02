import { useState } from "react";
import Link from "next/link";

export default function StepsToCaloriesCalculatorPage() {
  const [steps, setSteps] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const s = parseFloat(steps);
    const w = parseFloat(weight);

    if (!s || !w) {
      setResult(null);
      return;
    }

    // Rough approximation:
    // distance_km ≈ steps * 0.0008 (about 0.8m step length)
    // calories ≈ distance_km * weight * 1 (kcal per kg per km)
    const distanceKm = s * 0.0008;
    const calories = distanceKm * w;

    setResult({
      distanceKm,
      calories,
    });
  };

  const fmt1 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 1 });

  const fmt2 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Fitness Tool</div>
          <h1 className="page-title">Steps to Calories Calculator</h1>
          <p className="page-subtitle">
            Convert your daily steps into an approximate distance and calories burned
            estimate.
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
                <label className="label">Steps</label>
                <input
                  className="input"
                  type="number"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  placeholder="e.g. 8000"
                />
              </div>

              <div className="field">
                <label className="label">Weight (kg)</label>
                <input
                  className="input"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Convert Steps to Calories
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Approx. Distance Walked</div>
                <div className="result-value">
                  {result ? `${fmt2(result.distanceKm)} km` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Estimated Calories Burned</div>
                <div className="result-value">
                  {result ? `${fmt1(result.calories)} kcal` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This uses average step length and walking intensity. Fitness trackers
                  with heart rate data can give more accurate values.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
