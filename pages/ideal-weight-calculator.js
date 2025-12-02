import { useState } from "react";
import Link from "next/link";

export default function IdealWeightCalculatorPage() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const h = parseFloat(height);

    if (!h || h <= 0) {
      setResult(null);
      return;
    }

    // Devine formula (metric approximation)
    // Male:   50 + 0.9 * (height_cm - 152)
    // Female: 45.5 + 0.9 * (height_cm - 152)
    const base =
      gender === "male"
        ? 50 + 0.9 * (h - 152)
        : 45.5 + 0.9 * (h - 152);

    const lower = base * 0.9;
    const upper = base * 1.1;

    setResult({
      base,
      lower,
      upper,
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
          <h1 className="page-title">Ideal Weight Calculator</h1>
          <p className="page-subtitle">
            Estimate a rough &quot;ideal&quot; body weight based on height and gender
            using the Devine formula, plus a comfortable range.
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
                <label className="label">Height (cm)</label>
                <input
                  className="input"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 170"
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate Ideal Weight
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  Ideal Weight (centre)
                </div>
                <div className="result-value">
                  {result ? `${fmt1(result.base)} kg` : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  Suggested Range (±10%)
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt1(result.lower)} – ${fmt1(
                        result.upper
                      )} kg`
                    : "—"}
                </div>
              </div>

              {result && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8 }}
                >
                  &quot;Ideal&quot; weight is just a mathematical
                  estimate. Muscle mass, body composition and
                  overall health are far more important than a
                  single number.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
