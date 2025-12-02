import { useState } from "react";
import Link from "next/link";

export default function GfrCalculatorPage() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const scr = parseFloat(creatinine); // mg/dL

    if (!a || !w || !scr || a <= 0 || w <= 0 || scr <= 0) {
      setResult(null);
      return;
    }

    // Cockcroft–Gault formula: CrCl (mL/min)
    // CrCl = ((140 - age) * weight_kg) / (72 * Scr_mg/dL)
    // × 0.85 for females
    let crCl =
      ((140 - a) * w) / (72 * scr);
    if (gender === "female") {
      crCl *= 0.85;
    }

    setResult({
      crCl,
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
          <div className="badge">Kidney Tool</div>
          <h1 className="page-title">GFR / Creatinine Clearance Calculator</h1>
          <p className="page-subtitle">
            Roughly estimate kidney filtration (creatinine clearance) from age, weight,
            gender and serum creatinine using the Cockcroft–Gault formula.
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
                  placeholder="e.g. 55"
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
                <label className="label">
                  Serum Creatinine (mg/dL)
                </label>
                <input
                  className="input"
                  type="number"
                  value={creatinine}
                  onChange={(e) =>
                    setCreatinine(e.target.value)
                  }
                  placeholder="e.g. 1.1"
                  step="0.01"
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate eGFR (CrCl)
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  Estimated Creatinine Clearance
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt1(result.crCl)} mL/min`
                    : "—"}
                </div>
              </div>

              {result && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8 }}
                >
                  This is a simplified estimate and may differ from
                  lab-reported eGFR (which can use other formulas
                  and adjustments). Always interpret kidney
                  results with a doctor, not this tool alone.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
