import { useState } from "react";
import Link from "next/link";

export default function MacroCalculatorPage() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [goal, setGoal] = useState("maintain");
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

    let targetCalories = tdee;
    if (goal === "lose") {
      targetCalories = tdee - 500; // mild deficit
    } else if (goal === "gain") {
      targetCalories = tdee + 300; // mild surplus
    }

    if (targetCalories < 1200) {
      targetCalories = 1200; // floor to avoid absurdly low
    }

    // Macro split by goal (percent of calories)
    let pPct, cPct, fPct;
    if (goal === "lose") {
      // higher protein for cutting
      pPct = 0.30;
      cPct = 0.40;
      fPct = 0.30;
    } else if (goal === "gain") {
      pPct = 0.25;
      cPct = 0.50;
      fPct = 0.25;
    } else {
      // maintain
      pPct = 0.25;
      cPct = 0.50;
      fPct = 0.25;
    }

    const proteinCalories = targetCalories * pPct;
    const carbCalories = targetCalories * cPct;
    const fatCalories = targetCalories * fPct;

    const proteinGrams = proteinCalories / 4;
    const carbGrams = carbCalories / 4;
    const fatGrams = fatCalories / 9;

    setResult({
      bmr,
      tdee,
      targetCalories,
      proteinGrams,
      carbGrams,
      fatGrams,
    });
  };

  const fmt0 = (n) =>
    n?.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });

  const fmt1 = (n) =>
    n?.toLocaleString(undefined, {
      maximumFractionDigits: 1,
    });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Nutrition Tool</div>
          <h1 className="page-title">Macro Calculator</h1>
          <p className="page-subtitle">
            Get a daily calorie target and macro breakdown (protein, carbs, fat) based on
            your stats, activity and goal.
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
                  placeholder="e.g. 27"
                />
              </div>

              <div className="field">
                <label className="label">Weight (kg)</label>
                <input
                  className="input"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 68"
                />
              </div>

              <div className="field">
                <label className="label">Height (cm)</label>
                <input
                  className="input"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 172"
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

              <div className="field">
                <label className="label">Goal</label>
                <select
                  className="input"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="lose">Fat Loss</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Muscle / Weight Gain</option>
                </select>
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate Macros
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  Daily Calorie Target
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt0(result.targetCalories)} kcal`
                    : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  Protein per Day
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt1(result.proteinGrams)} g`
                    : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  Carbs per Day
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt1(result.carbGrams)} g`
                    : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  Fat per Day
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt1(result.fatGrams)} g`
                    : "—"}
                </div>
              </div>

              {result && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8 }}
                >
                  These are starting targets, not strict rules.
                  Adjust based on energy, performance, hunger and
                  progress over a few weeks.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
