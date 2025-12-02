import { useState } from "react";
import Link from "next/link";

export default function BloodAlcoholCalculatorPage() {
  const [gender, setGender] = useState("male");
  const [weightKg, setWeightKg] = useState("");
  const [drinks, setDrinks] = useState("");
  const [hours, setHours] = useState("1");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const wKg = parseFloat(weightKg);
    const nDrinks = parseFloat(drinks);
    const h = parseFloat(hours);

    if (!wKg || !nDrinks || nDrinks <= 0 || !h || h < 0) {
      setResult(null);
      return;
    }

    // Widmark formula approximation
    // Assume 1 "standard drink" = 14 g alcohol ≈ 0.6 fl oz ethanol.
    // A (oz) = drinks * 0.6
    const A = nDrinks * 0.6;
    const wLb = wKg * 2.20462;
    const r = gender === "male" ? 0.73 : 0.66;

    let bac = (A * 5.14) / (wLb * r) - 0.015 * h;
    if (bac < 0) bac = 0;

    let category = "Low / mild effects";
    if (bac >= 0.08 && bac < 0.20) category = "Legally impaired in many places";
    else if (bac >= 0.20) category = "Dangerously high — medical risk";

    setResult({
      bac,
      category,
    });
  };

  const fmt3 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 3 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Health Tool</div>
          <h1 className="page-title">Blood Alcohol Content (BAC) Calculator</h1>
          <p className="page-subtitle">
            Roughly estimate your blood alcohol concentration based on weight, number of
            standard drinks and time since drinking.
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
                <label className="label">Body Weight (kg)</label>
                <input
                  className="input"
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="e.g. 70"
                />
              </div>

              <div className="field">
                <label className="label">
                  Number of Standard Drinks
                  <span style={{ fontSize: 12, fontWeight: 400 }}>
                    {" "}
                    (1 drink ≈ 14 g alcohol)
                  </span>
                </label>
                <input
                  className="input"
                  type="number"
                  value={drinks}
                  onChange={(e) => setDrinks(e.target.value)}
                  placeholder="e.g. 3"
                  step="0.5"
                />
              </div>

              <div className="field">
                <label className="label">Hours Since Drinking Started</label>
                <input
                  className="input"
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="e.g. 2"
                  step="0.5"
                  min="0"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate BAC
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Estimated BAC</div>
                <div className="result-value">
                  {result ? `${fmt3(result.bac)}` : "—"}
                </div>
              </div>

              {result && (
                <>
                  <div className="result-box" style={{ marginTop: 10 }}>
                    <div className="result-title">Interpretation</div>
                    <div className="result-value" style={{ fontSize: "0.9rem" }}>
                      {result.category}
                    </div>
                  </div>

                  <p className="helper-text" style={{ marginTop: 8 }}>
                    This is a rough estimate only. Never use this tool to decide whether
                    it&apos;s safe to drive, operate machinery, or drink more. Tolerance,
                    medications and health conditions can change effects dramatically.
                    When in doubt, don&apos;t drink or call a cab.
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
