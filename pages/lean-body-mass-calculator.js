import { useState } from "react";
import Link from "next/link";

export default function LeanBodyMassCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [bodyFatPercent, setBodyFatPercent] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const bf = parseFloat(bodyFatPercent);

    if (!w || !bf || bf < 0 || bf > 80) {
      setResult(null);
      return;
    }

    const leanMass = w * (1 - bf / 100);
    const fatMass = w - leanMass;

    setResult({
      leanMass,
      fatMass,
    });
  };

  const fmt1 = (n) =>
    n?.toLocaleString(undefined, {
      maximumFractionDigits: 1,
    });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Fitness Tool</div>
          <h1 className="page-title">Lean Body Mass Calculator</h1>
          <p className="page-subtitle">
            Find your lean body mass (muscle, organs, bones, etc.) and fat mass using your
            weight and body fat percentage.
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
                <label className="label">Body Weight (kg)</label>
                <input
                  className="input"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 72"
                />
              </div>

              <div className="field">
                <label className="label">
                  Body Fat Percentage (%)
                </label>
                <input
                  className="input"
                  type="number"
                  value={bodyFatPercent}
                  onChange={(e) =>
                    setBodyFatPercent(e.target.value)
                  }
                  placeholder="e.g. 20"
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate Lean Body Mass
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  Lean Body Mass
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt1(result.leanMass)} kg`
                    : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  Fat Mass
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt1(result.fatMass)} kg`
                    : "—"}
                </div>
              </div>

              {result && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8 }}
                >
                  Lean mass is everything except stored fat.
                  Tracking this over time can be helpful for
                  understanding whether you&apos;re losing fat,
                  muscle, or both.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
