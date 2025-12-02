import { useState } from "react";
import Link from "next/link";

export default function CaloriesBurnedCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("30");
  const [met, setMet] = useState("6");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);
    const m = parseFloat(met);

    if (!w || !d || !m) {
      setResult(null);
      return;
    }

    const hours = d / 60;
    const calories = m * w * hours;

    setResult({
      calories,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 1 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Fitness Tool</div>
          <h1 className="page-title">Calories Burned Calculator</h1>
          <p className="page-subtitle">
            Estimate calories burned for an activity using your weight, duration and
            intensity (MET value).
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
                <label className="label">Weight (kg)</label>
                <input
                  className="input"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                />
              </div>

              <div className="field">
                <label className="label">Duration (minutes)</label>
                <input
                  className="input"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 45"
                />
              </div>

              <div className="field">
                <label className="label">Activity Intensity (MET)</label>
                <select
                  className="input"
                  value={met}
                  onChange={(e) => setMet(e.target.value)}
                >
                  <option value="3">Light (walking slowly, stretching)</option>
                  <option value="6">Moderate (brisk walk, light jog)</option>
                  <option value="8">Intense (running, HIIT, sports)</option>
                  <option value="10">Very intense (fast running)</option>
                </select>
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Calories Burned
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Estimated Calories Burned</div>
                <div className="result-value">
                  {result ? `${fmt(result.calories)} kcal` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This is an approximation based on MET values. Actual calories burned
                  vary with fitness level, environment and exact activity.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
