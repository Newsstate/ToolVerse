import { useState } from "react";
import Link from "next/link";

function parseNumbers(input) {
  if (!input) return [];
  return input
    .split(/[, \n ]+/)
    .map((x) => parseFloat(x))
    .filter((x) => Number.isFinite(x));
}

function calculateStats(nums) {
  if (!nums.length) return null;

  const count = nums.length;
  const sorted = [...nums].sort((a, b) => a - b);

  const sum = nums.reduce((acc, n) => acc + n, 0);
  const mean = sum / count;

  let median;
  if (count % 2 === 1) {
    median = sorted[(count - 1) / 2];
  } else {
    median = (sorted[count / 2 - 1] + sorted[count / 2]) / 2;
  }

  const freq = new Map();
  let maxFreq = 0;
  sorted.forEach((n) => {
    const f = (freq.get(n) || 0) + 1;
    freq.set(n, f);
    if (f > maxFreq) maxFreq = f;
  });

  let modes = [];
  if (maxFreq > 1) {
    modes = [...freq.entries()]
      .filter(([, f]) => f === maxFreq)
      .map(([val]) => val);
  }

  return {
    count,
    sum,
    mean,
    median,
    modes,
    sorted,
  };
}

export default function MeanMedianModeCalculatorPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const nums = parseNumbers(input);
    const stats = calculateStats(nums);
    setResult(stats);
  };

  const fmt2 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const renderMode = () => {
    if (!result) return "—";
    if (!result.modes.length) return "No mode (all values unique)";
    return result.modes.map((m) => fmt2(m)).join(", ");
  };

  const renderSorted = () => {
    if (!result) return "—";
    return result.sorted.map((n) => fmt2(n)).join(", ");
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Mean, Median & Mode Calculator</h1>
          <p className="page-subtitle">
            Paste a list of numbers to instantly get the mean (average), median, mode(s)
            and sorted data.
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
                <label className="label">Numbers</label>
                <textarea
                  className="input"
                  rows={6}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. 12, 15, 15, 18, 20"
                  style={{ resize: "vertical" }}
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Stats
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Count</div>
                <div className="result-value">
                  {result ? result.count : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Mean (Average)</div>
                <div className="result-value">
                  {result ? fmt4(result.mean) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Median</div>
                <div className="result-value">
                  {result ? fmt4(result.median) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Mode</div>
                <div className="result-value">
                  {renderMode()}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Sorted Data</div>
                <div className="result-value" style={{ fontSize: "0.85rem" }}>
                  {renderSorted()}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Great for quick stats homework, survey data, or checking if outliers are
                  skewing your average.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
