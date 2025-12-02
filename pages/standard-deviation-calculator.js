import { useState } from "react";
import Link from "next/link";

function parseNumbers(input) {
  if (!input) return [];
  return input
    .split(/[, \n]+/)
    .map((x) => parseFloat(x))
    .filter((x) => Number.isFinite(x));
}

export default function StandardDeviationCalculatorPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("population"); // population or sample
  const [result, setResult] = useState(null);

  const calculate = () => {
    const nums = parseNumbers(input);
    const n = nums.length;
    if (!n) {
      setResult(null);
      return;
    }

    const mean = nums.reduce((acc, v) => acc + v, 0) / n;
    const squaredDiffs = nums.map((v) => (v - mean) ** 2);
    const sumSqDiff = squaredDiffs.reduce((acc, v) => acc + v, 0);

    let variance;
    if (mode === "population") {
      variance = sumSqDiff / n;
    } else {
      if (n < 2) {
        setResult({
          error:
            "Sample standard deviation requires at least 2 data points.",
        });
        return;
      }
      variance = sumSqDiff / (n - 1);
    }

    const stdDev = Math.sqrt(variance);

    setResult({
      count: n,
      mean,
      variance,
      stdDev,
      error: null,
    });
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const fmt2 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Statistics Tool</div>
          <h1 className="page-title">Standard Deviation Calculator</h1>
          <p className="page-subtitle">
            Enter a set of numbers to get the mean, variance and standard deviation
            (population or sample).
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
                <label className="label">Data Values</label>
                <textarea
                  className="input"
                  rows={6}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. 10, 12, 15, 18, 20"
                  style={{ resize: "vertical" }}
                />
              </div>

              <div className="field">
                <label className="label">Type</label>
                <select
                  className="input"
                  value={mode}
                  onChange={(e) => {
                    setMode(e.target.value);
                    setResult(null);
                  }}
                >
                  <option value="population">Population (divide by N)</option>
                  <option value="sample">Sample (divide by N − 1)</option>
                </select>
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Standard Deviation
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Count</div>
                <div className="result-value">
                  {result && !result.error ? result.count : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Mean</div>
                <div className="result-value">
                  {result && !result.error ? fmt4(result.mean) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Variance</div>
                <div className="result-value">
                  {result && !result.error ? fmt4(result.variance) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Standard Deviation</div>
                <div className="result-value">
                  {result && !result.error ? fmt4(result.stdDev) : "—"}
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
                  Use{" "}
                  <strong>population</strong> when your data is the whole group, and{" "}
                  <strong>sample</strong> when it&apos;s just a sample from a larger
                  population.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
