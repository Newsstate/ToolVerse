import { useState } from "react";
import Link from "next/link";

export default function BmrCalculatorPage() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!a || !w || !h) {
      setResult(null);
      return;
    }

    // Mifflin–St Jeor (metric)
    // Male:   BMR = 10W + 6.25H - 5A + 5
    // Female: BMR = 10W + 6.25H - 5A - 161
    let bmr =
      10 * w +
      6.25 * h -
      5 * a +
      (gender === "male" ? 5 : -161);

    setResult({
      bmr,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Fitness Tool</div>
          <h1 className="page-title">BMR Calculator</h1>
          <p className="page-subtitle">
            Estimate your Basal Metabolic Rate (BMR) — calories your body burns at rest
            each day.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Inputs */}
            <div>
              <div className="field">
                <label className="label">Gender</label>
                <select
                  className="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="field">
                <label className="label">Age (years)</label>
                <input
                  className="input"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 28"
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

              <div className="field">
                <label className="label">Height (cm)</label>
                <input
                  className="input"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate BMR
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  BMR (Calories per Day)
                </div>
                <div className="result-value">
                  {result ? `${fmt(result.bmr)} kcal/day` : "—"}
                </div>
              </div>

              {result && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8 }}
                >
                  This is an estimate using the Mifflin–St Jeor
                  equation. Actual calorie needs change with
                  muscle mass, hormones and daily activity.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
