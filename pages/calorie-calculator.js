import { useState } from "react";
import Link from "next/link";

export default function CalorieCalculatorPage() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const act = parseFloat(activity);

    if (!a || !w || !h || !act) {
      setResult(null);
      return;
    }

    // Mifflin–St Jeor BMR
    let bmr =
      10 * w +
      6.25 * h -
      5 * a +
      (gender === "male" ? 5 : -161);

    const tdee = bmr * act;

    const lose = Math.max(1200, tdee - 500);
    const maintain = tdee;
    const gain = tdee + 300;

    setResult({
      bmr,
      tdee,
      lose,
      maintain,
      gain,
    });
  };

  const fmt0 = (n) =>
    n?.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Nutrition Tool</div>
          <h1 className="page-title">Calorie Calculator</h1>
          <p className="page-subtitle">
            Estimate how many calories you need per day to lose, maintain, or gain weight
            based on your stats and activity level.
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
                  placeholder="e.g. 25"
                />
              </div>

              <div className="field">
                <label className="label">Weight (kg)</label>
                <input
                  className="input"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 65"
                />
              </div>

              <div className="field">
                <label className="label">Height (cm)</label>
                <input
                  className="input"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 168"
                />
              </div>

              <div className="field">
                <label className="label">Activity Level</label>
                <select
                  className="input"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                >
                  <option value="1.2">
                    Sedentary — little or no exercise
                  </option>
                  <option value="1.375">
                    Lightly active — 1–3 days/week
                  </option>
                  <option value="1.55">
                    Moderately active — 3–5 days/week
                  </option>
                  <option value="1.725">
                    Very active — 6–7 days/week
                  </option>
                  <option value="1.9">
                    Extra active — physical job / athlete
                  </option>
                </select>
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate Calories
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  BMR (Resting Calories)
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt0(result.bmr)} kcal/day`
                    : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  TDEE (Maintain Current Weight)
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt0(result.tdee)} kcal/day`
                    : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  For Fat Loss (approx.)
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt0(result.lose)} kcal/day`
                    : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  For Weight / Muscle Gain (approx.)
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt0(result.gain)} kcal/day`
                    : "—"}
                </div>
              </div>

              {result && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8 }}
                >
                  These are estimates. Adjust 100–200 kcal up or
                  down every couple of weeks depending on how
                  your body actually responds.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
