import { useState } from "react";
import Link from "next/link";

function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= n; i++) {
    result *= i;
  }
  return result;
}

export default function CombinationCalculatorPage() {
  const [n, setN] = useState("");
  const [r, setR] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const N = parseInt(n, 10);
    const R = parseInt(r, 10);

    if (!Number.isInteger(N) || !Number.isInteger(R) || N < 0 || R < 0 || R > N) {
      setResult(null);
      return;
    }

    if (N > 50) {
      setResult({
        error: "Please use n ≤ 50 to avoid very large numbers.",
      });
      return;
    }

    const nBig = BigInt(N);
    const rBig = BigInt(R);
    const nMinusR = nBig - rBig;

    const nFact = factorial(nBig);
    const rFact = factorial(rBig);
    const nMinusRFact = factorial(nMinusR);

    const combinations = nFact / (rFact * nMinusRFact);

    setResult({
      N,
      R,
      combinations: combinations.toString(),
      error: null,
    });
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Combinatorics Tool</div>
          <h1 className="page-title">Combination Calculator (nCr)</h1>
          <p className="page-subtitle">
            Calculate the number of combinations (nCr) — ways to choose r items from n
            when order does not matter.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            <div>
              <div className="field">
                <label className="label">n (total items)</label>
                <input
                  className="input"
                  type="number"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>

              <div className="field">
                <label className="label">r (items chosen)</label>
                <input
                  className="input"
                  type="number"
                  value={r}
                  onChange={(e) => setR(e.target.value)}
                  placeholder="e.g. 3"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate nCr
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Combinations (nCr)</div>
                <div
                  className="result-value"
                  style={{ fontSize: "0.9rem", wordBreak: "break-all" }}
                >
                  {result && !result.error ? result.combinations : "—"}
                </div>
              </div>

              {result?.error && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8, color: "#e11d48" }}
                >
                  {result.error}
                </p>
              )}

              {result && !result.error && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Formula: <strong>nCr = n! / (r!(n − r)!)</strong>. Use combinations
                  when selection order doesn&apos;t matter.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
