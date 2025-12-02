import { useState } from "react";
import Link from "next/link";

export default function ArmyBodyFatCalculatorPage() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState(""); // females
  const [result, setResult] = useState(null);

  const calculate = () => {
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hp = parseFloat(hip);

    if (!h || !n || !w || (gender === "female" && !hp)) {
      setResult(null);
      return;
    }

    const log10 = (x) => Math.log10(x);

    let bodyFat;

    try {
      if (gender === "male") {
        // U.S. Army male formula (metric-friendly version)
        // BF% ≈ 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
        bodyFat =
          86.010 * log10(w - n) -
          70.041 * log10(h) +
          36.76;
      } else {
        // U.S. Army female formula
        // BF% ≈ 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
        bodyFat =
          163.205 * log10(w + hp - n) -
          97.684 * log10(h) -
          78.387;
      }
    } catch (e) {
      setResult(null);
      return;
    }

    if (!isFinite(bodyFat)) {
      setResult(null);
      return;
    }

    setResult({
      bodyFat,
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
          <h1 className="page-title">Army Body Fat Calculator</h1>
          <p className="page-subtitle">
            Estimate body fat percentage using the U.S. Army circumference method
            (height, neck, waist and hip for women).
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
                  placeholder="e.g. 175"
                />
              </div>

              <div className="field">
                <label className="label">Neck Circumference (cm)</label>
                <input
                  className="input"
                  type="number"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  placeholder="e.g. 38"
                />
              </div>

              <div className="field">
                <label className="label">Waist Circumference (cm)</label>
                <input
                  className="input"
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  placeholder="e.g. 85"
                />
              </div>

              {gender === "female" && (
                <div className="field">
                  <label className="label">Hip Circumference (cm)</label>
                  <input
                    className="input"
                    type="number"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    placeholder="e.g. 95"
                  />
                </div>
              )}

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate Army Body Fat %
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Body Fat Percentage</div>
                <div className="result-value">
                  {result ? `${fmt1(result.bodyFat)}%` : "—"}
                </div>
              </div>

              {result && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8 }}
                >
                  This is an estimate based on circumference
                  measurements. Use it for trend tracking, not as a
                  medical diagnosis.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
