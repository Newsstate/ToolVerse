import { useState } from "react";
import Link from "next/link";

export default function HeartRateZoneCalculatorPage() {
  const [age, setAge] = useState("");
  const [restingHr, setRestingHr] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(age);
    const rhr = parseFloat(restingHr);

    if (!a || !rhr) {
      setResult(null);
      return;
    }

    const maxHr = 220 - a;
    const hrr = maxHr - rhr;

    const zone = (lowPct, highPct) => {
      const low = rhr + hrr * lowPct;
      const high = rhr + hrr * highPct;
      return { low, high };
    };

    const warmup = zone(0.5, 0.6);
    const fatBurn = zone(0.6, 0.7);
    const cardio = zone(0.7, 0.8);
    const hard = zone(0.8, 0.9);

    setResult({
      maxHr,
      warmup,
      fatBurn,
      cardio,
      hard,
    });
  };

  const fmt0 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 0 });

  const fmt1 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 1 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Fitness Tool</div>
          <h1 className="page-title">Heart Rate Zone Calculator</h1>
          <p className="page-subtitle">
            Find your estimated heart rate zones (warm-up, fat burn, cardio, hard) using
            your age and resting heart rate.
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
                <label className="label">Age (years)</label>
                <input
                  className="input"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 30"
                />
              </div>

              <div className="field">
                <label className="label">Resting Heart Rate (bpm)</label>
                <input
                  className="input"
                  type="number"
                  value={restingHr}
                  onChange={(e) => setRestingHr(e.target.value)}
                  placeholder="e.g. 60"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Heart Rate Zones
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Estimated Max Heart Rate</div>
                <div className="result-value">
                  {result ? `${fmt0(result.maxHr)} bpm` : "—"}
                </div>
              </div>

              {result && (
                <>
                  <div className="result-box" style={{ marginTop: 10 }}>
                    <div className="result-title">Warm-up Zone (50–60%)</div>
                    <div className="result-value">
                      {fmt1(result.warmup.low)} – {fmt1(result.warmup.high)} bpm
                    </div>
                  </div>

                  <div className="result-box" style={{ marginTop: 10 }}>
                    <div className="result-title">Fat Burn Zone (60–70%)</div>
                    <div className="result-value">
                      {fmt1(result.fatBurn.low)} – {fmt1(result.fatBurn.high)} bpm
                    </div>
                  </div>

                  <div className="result-box" style={{ marginTop: 10 }}>
                    <div className="result-title">Cardio Zone (70–80%)</div>
                    <div className="result-value">
                      {fmt1(result.cardio.low)} – {fmt1(result.cardio.high)} bpm
                    </div>
                  </div>

                  <div className="result-box" style={{ marginTop: 10 }}>
                    <div className="result-title">Hard / Anaerobic (80–90%)</div>
                    <div className="result-value">
                      {fmt1(result.hard.low)} – {fmt1(result.hard.high)} bpm
                    </div>
                  </div>

                  <p className="helper-text" style={{ marginTop: 8 }}>
                    These zones are estimates only. If you have any heart or health
                    conditions, talk to a doctor before following heart rate-based
                    training.
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
