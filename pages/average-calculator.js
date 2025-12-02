import { useState } from "react";
import Link from "next/link";

function parseNumbers(input) {
  if (!input) return [];
  return input
    .split(/[, \n]+/)
    .map((x) => parseFloat(x))
    .filter((x) => Number.isFinite(x));
}

export default function AverageCalculatorPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const nums = parseNumbers(input);
    if (!nums.length) {
      setResult(null);
      return;
    }

    const sum = nums.reduce((acc, n) => acc + n, 0);
    const avg = sum / nums.length;

    setResult({
      count: nums.length,
      sum,
      avg,
    });
  };

  const fmt2 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Average Calculator</h1>
          <p className="page-subtitle">
            Enter a list of numbers separated by commas or spaces to get the sum and
            average (arithmetic mean).
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
                  rows={5}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. 10, 20, 30, 40"
                  style={{ resize: "vertical" }}
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Average
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
                <div className="result-title">Sum</div>
                <div className="result-value">
                  {result ? fmt2(result.sum) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Average (Mean)</div>
                <div className="result-value">
                  {result ? fmt4(result.avg) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Tip: You can paste values from Excel or CSV too — the calculator ignores
                  blank entries and text that isn&apos;t a number.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
