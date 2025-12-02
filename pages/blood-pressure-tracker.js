import { useState } from "react";
import Link from "next/link";

export default function BloodPressureTrackerPage() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const sys = parseFloat(systolic);
    const dia = parseFloat(diastolic);
    const hr = heartRate ? parseFloat(heartRate) : null;

    if (!sys || !dia) {
      setResult(null);
      return;
    }

    let category = "Normal";
    let note = "This reading falls in the normal range.";

    if (sys < 120 && dia < 80) {
      category = "Normal";
      note = "Great! Keep up a heart-healthy lifestyle.";
    } else if (sys >= 120 && sys <= 129 && dia < 80) {
      category = "Elevated";
      note = "Consider lifestyle changes and regular monitoring.";
    } else if (
      (sys >= 130 && sys <= 139) ||
      (dia >= 80 && dia <= 89)
    ) {
      category = "Hypertension Stage 1";
      note = "Consider speaking with a doctor about this reading.";
    } else if (sys >= 140 || dia >= 90) {
      category = "Hypertension Stage 2";
      note =
        "This is a high reading. Medical advice is strongly recommended.";
    }

    if (sys >= 180 || dia >= 120) {
      category = "Hypertensive Crisis (Emergency)";
      note =
        "This is a potentially dangerous level. Seek emergency medical care immediately.";
    }

    setResult({
      sys,
      dia,
      hr,
      category,
      note,
    });
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Health Tool</div>
          <h1 className="page-title">Blood Pressure Tracker</h1>
          <p className="page-subtitle">
            Log a blood pressure reading and see how it falls into standard categories
            (normal, elevated, hypertension, etc.).
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
                <label className="label">Systolic (upper, mmHg)</label>
                <input
                  className="input"
                  type="number"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  placeholder="e.g. 120"
                />
              </div>

              <div className="field">
                <label className="label">Diastolic (lower, mmHg)</label>
                <input
                  className="input"
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  placeholder="e.g. 80"
                />
              </div>

              <div className="field">
                <label className="label">
                  Heart Rate (bpm, optional)
                </label>
                <input
                  className="input"
                  type="number"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                  placeholder="e.g. 72"
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Analyse Reading
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  Category (Non-diagnostic)
                </div>
                <div className="result-value">
                  {result ? result.category : "—"}
                </div>
              </div>

              {result && (
                <>
                  <div
                    className="result-box"
                    style={{ marginTop: 10 }}
                  >
                    <div className="result-title">
                      Reading Summary
                    </div>
                    <div className="result-value" style={{ fontSize: "0.9rem" }}>
                      {result.sys}/{result.dia} mmHg
                      {result.hr
                        ? ` · Heart rate: ${result.hr} bpm`
                        : ""}
                    </div>
                  </div>

                  <p
                    className="helper-text"
                    style={{ marginTop: 8 }}
                  >
                    This tool is for information only and{" "}
                    <strong>not</strong> a diagnosis. If you get
                    repeated high readings or feel unwell, please
                    seek medical advice.
                  </p>
                  <p
                    className="helper-text"
                    style={{ marginTop: 4 }}
                  >
                    Tip: For tracking over time, you can save each
                    result manually in a notes app or spreadsheet.
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
