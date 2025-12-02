import { useState } from "react";
import Link from "next/link";

function getBmiCategory(bmi) {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

function getRecommendedGainRange(bmiCategory) {
  // Total pregnancy gain recommendations (kg), approximate IOM guidelines
  switch (bmiCategory) {
    case "underweight":
      return { min: 12.5, max: 18 };
    case "normal":
      return { min: 11.5, max: 16 };
    case "overweight":
      return { min: 7, max: 11.5 };
    case "obese":
      return { min: 5, max: 9 };
    default:
      return { min: 0, max: 0 };
  }
}

export default function PregnancyWeightGainCalculatorPage() {
  const [preWeight, setPreWeight] = useState("");
  const [height, setHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [week, setWeek] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const pw = parseFloat(preWeight);
    const hCm = parseFloat(height);
    const cw = parseFloat(currentWeight);
    const wk = parseFloat(week);

    if (!pw || !hCm || !cw || !wk || wk <= 0 || wk > 42) {
      setResult(null);
      return;
    }

    const hM = hCm / 100;
    const bmi = pw / (hM * hM);
    const category = getBmiCategory(bmi);
    const totalRange = getRecommendedGainRange(category);

    if (totalRange.min === 0 && totalRange.max === 0) {
      setResult(null);
      return;
    }

    const totalGain = cw - pw;

    // Very simplified progression: assume gain spread over 40 weeks
    const fraction = Math.min(Math.max(wk / 40, 0), 1);
    const expectedMinSoFar = totalRange.min * fraction;
    const expectedMaxSoFar = totalRange.max * fraction;

    let status = "on track";
    if (totalGain < expectedMinSoFar - 1) status = "below recommended range";
    else if (totalGain > expectedMaxSoFar + 1) status = "above recommended range";

    setResult({
      bmi,
      category,
      totalRange,
      totalGain,
      expectedMinSoFar,
      expectedMaxSoFar,
      status,
    });
  };

  const fmt1 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 1 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Pregnancy Tool</div>
          <h1 className="page-title">Pregnancy Weight Gain Calculator</h1>
          <p className="page-subtitle">
            See how your current pregnancy weight gain compares with general recommended
            ranges for your pre-pregnancy BMI.
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
                <label className="label">Pre-pregnancy Weight (kg)</label>
                <input
                  className="input"
                  type="number"
                  value={preWeight}
                  onChange={(e) => setPreWeight(e.target.value)}
                  placeholder="e.g. 60"
                />
              </div>

              <div className="field">
                <label className="label">Height (cm)</label>
                <input
                  className="input"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 165"
                />
              </div>

              <div className="field">
                <label className="label">Current Weight (kg)</label>
                <input
                  className="input"
                  type="number"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  placeholder="e.g. 67"
                />
              </div>

              <div className="field">
                <label className="label">Current Week of Pregnancy</label>
                <input
                  className="input"
                  type="number"
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                  placeholder="e.g. 24"
                  min="1"
                  max="42"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Check Weight Gain
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Pre-pregnancy BMI</div>
                <div className="result-value">
                  {result
                    ? `${fmt1(result.bmi)} (${result.category})`
                    : "—"}
                </div>
              </div>

              {result && (
                <>
                  <div className="result-box" style={{ marginTop: 10 }}>
                    <div className="result-title">
                      Recommended Total Gain (full pregnancy)
                    </div>
                    <div className="result-value">
                      {fmt1(result.totalRange.min)} – {fmt1(result.totalRange.max)} kg
                    </div>
                  </div>

                  <div className="result-box" style={{ marginTop: 10 }}>
                    <div className="result-title">
                      Your Gain So Far ({fmt1(result.totalGain)} kg)
                    </div>
                    <div className="result-value" style={{ fontSize: "0.9rem" }}>
                      Expected by now: {fmt1(result.expectedMinSoFar)} –{" "}
                      {fmt1(result.expectedMaxSoFar)} kg
                      <br />
                      Status: <strong>{result.status}</strong>
                    </div>
                  </div>

                  <p className="helper-text" style={{ marginTop: 8 }}>
                    These are general guidelines only and don&apos;t replace personalised
                    advice. Always discuss weight changes with your doctor or healthcare
                    provider.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
