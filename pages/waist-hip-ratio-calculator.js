import { useState } from "react";
import Link from "next/link";

function getRiskCategory(gender, whr) {
  if (!whr || whr <= 0) return null;

  // WHO-ish cutoffs: can vary by guideline; this is a common set.
  if (gender === "male") {
    if (whr < 0.90) return "Low health risk";
    if (whr < 1.0) return "Moderate health risk";
    return "High health risk";
  } else {
    // female
    if (whr < 0.80) return "Low health risk";
    if (whr < 0.85) return "Moderate health risk";
    return "High health risk";
  }
}

export default function WaistHipRatioCalculatorPage() {
  const [gender, setGender] = useState("male");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const w = parseFloat(waist);
    const h = parseFloat(hip);

    if (!w || !h || w <= 0 || h <= 0) {
      setResult(null);
      return;
    }

    const whr = w / h;
    const category = getRiskCategory(gender, whr);

    setResult({
      whr,
      category,
    });
  };

  const fmt2 = (n) =>
    n?.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Health Tool</div>
          <h1 className="page-title">Waist-Hip Ratio Calculator</h1>
          <p className="page-subtitle">
            Check your waist-to-hip ratio (WHR) to get a rough idea of abdominal fat
            distribution and related health risk.
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
                <label className="label">
                  Waist Circumference (cm)
                </label>
                <input
                  className="input"
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  placeholder="e.g. 90"
                />
              </div>

              <div className="field">
                <label className="label">
                  Hip Circumference (cm)
                </label>
                <input
                  className="input"
                  type="number"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  placeholder="e.g. 100"
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate WHR
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  Waist-Hip Ratio
                </div>
                <div className="result-value">
                  {result
                    ? `${fmt2(result.whr)}`
                    : "—"}
                </div>
              </div>

              {result && (
                <>
                  <div
                    className="result-box"
                    style={{ marginTop: 10 }}
                  >
                    <div className="result-title">
                      Indicative Risk Category
                    </div>
                    <div className="result-value">
                      {result.category || "—"}
                    </div>
                  </div>

                  <p
                    className="helper-text"
                    style={{ marginTop: 8 }}
                  >
                    WHR is just one indicator. BMI, blood tests, blood
                    pressure and medical history all matter when
                    assessing overall health.
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
