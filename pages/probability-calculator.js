import { useState } from "react";
import Link from "next/link";

export default function ProbabilityCalculatorPage() {
  const [favorable, setFavorable] = useState("");
  const [total, setTotal] = useState("");
  const [pA, setPA] = useState("");
  const [pB, setPB] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const fav = parseFloat(favorable);
    const tot = parseFloat(total);

    let basicProb = null;
    if (Number.isFinite(fav) && Number.isFinite(tot) && tot > 0 && fav >= 0 && fav <= tot) {
      basicProb = fav / tot;
    }

    const pAVal = parseFloat(pA);
    const pBVal = parseFloat(pB);

    let joint = null;
    let either = null;
    if (
      Number.isFinite(pAVal) &&
      Number.isFinite(pBVal) &&
      pAVal >= 0 &&
      pAVal <= 1 &&
      pBVal >= 0 &&
      pBVal <= 1
    ) {
      joint = pAVal * pBVal; // P(A and B) for independent events
      either = pAVal + pBVal - joint; // P(A or B)
    }

    setResult({
      basicProb,
      joint,
      either,
    });
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const fmtPct = (n) =>
    (n * 100).toLocaleString(undefined, { maximumFractionDigits: 2 }) + "%";

  const renderProb = (p) => {
    if (p === null || !Number.isFinite(p)) return "—";
    return `${fmt4(p)} (${fmtPct(p)})`;
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Probability Tool</div>
          <h1 className="page-title">Probability Calculator</h1>
          <p className="page-subtitle">
            Quickly compute basic probability from favourable and total outcomes, plus
            combined probabilities for independent events A and B.
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
                <label className="label">
                  Basic Probability (favourable / total)
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="number"
                    value={favorable}
                    onChange={(e) => setFavorable(e.target.value)}
                    placeholder="favourable outcomes"
                  />
                  <input
                    className="input"
                    type="number"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    placeholder="total outcomes"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                  Independent Events (probabilities 0 to 1)
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="number"
                    value={pA}
                    onChange={(e) => setPA(e.target.value)}
                    placeholder="P(A)"
                    step="0.01"
                  />
                  <input
                    className="input"
                    type="number"
                    value={pB}
                    onChange={(e) => setPB(e.target.value)}
                    placeholder="P(B)"
                    step="0.01"
                  />
                </div>
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Probability
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  Basic Probability P(event)
                </div>
                <div className="result-value">
                  {result ? renderProb(result.basicProb) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">
                  P(A and B) (independent)
                </div>
                <div className="result-value">
                  {result ? renderProb(result.joint) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">
                  P(A or B) (independent)
                </div>
                <div className="result-value">
                  {result ? renderProb(result.either) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  For independent events:{" "}
                  <strong>P(A and B) = P(A) × P(B)</strong> and{" "}
                  <strong>P(A or B) = P(A) + P(B) − P(A and B)</strong>. All probabilities
                  should be between 0 and 1.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
