import { useState } from "react";
import Link from "next/link";

export default function WaterIntakeCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [exerciseMinutes, setExerciseMinutes] = useState("0");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const ex = parseFloat(exerciseMinutes) || 0;

    if (!w) {
      setResult(null);
      return;
    }

    // 35 ml per kg baseline
    const baseMl = w * 35;
    // + 350 ml per 30 min exercise (≈ 12 ml/min)
    const extraMl = (ex / 30) * 350;
    const totalMl = baseMl + extraMl;
    const totalLiters = totalMl / 1000;

    setResult({
      baseMl,
      extraMl,
      totalMl,
      totalLiters,
    });
  };

  const fmt1 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 1 });

  const fmt0 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Health Tool</div>
          <h1 className="page-title">Water Intake Calculator</h1>
          <p className="page-subtitle">
            Estimate your daily water requirement based on body weight and exercise
            duration.
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
                  placeholder="e.g. 65"
                />
              </div>

              <div className="field">
                <label className="label">Exercise per Day (minutes)</label>
                <input
                  className="input"
                  type="number"
                  value={exerciseMinutes}
                  onChange={(e) => setExerciseMinutes(e.target.value)}
                  placeholder="e.g. 45"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Water Intake
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Total Water per Day</div>
                <div className="result-value">
                  {result
                    ? `${fmt1(result.totalLiters)} L (${fmt0(
                        result.totalMl
                      )} ml)`
                    : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Baseline (without exercise)</div>
                <div className="result-value">
                  {result ? `${fmt0(result.baseMl)} ml` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Climate, health conditions and pregnancy can change water needs. This is
                  a general guideline, not medical advice.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
