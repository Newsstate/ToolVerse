import { useState } from "react";
import Link from "next/link";

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export default function RatioCalculatorPage() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);

    if (!A || !B || !C) {
      setResult(null);
      return;
    }

    // a : b = c : x => x = (b * c) / a
    const x = (B * C) / A;

    const g = gcd(A, B);
    const simpA = A / g;
    const simpB = B / g;

    setResult({
      x,
      simpA,
      simpB,
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
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Ratio Calculator</h1>
          <p className="page-subtitle">
            Work with simple ratios of the form <strong>a : b = c : x</strong>. Get the
            missing value and a simplified version of the ratio.
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
                  Ratio a : b (left side)
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <input
                    className="input"
                    type="number"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    placeholder="a"
                  />
                  <span>:</span>
                  <input
                    className="input"
                    type="number"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    placeholder="b"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                  Third value (c) in a : b = c : x
                </label>
                <input
                  className="input"
                  type="number"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  placeholder="c"
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Find x (a : b = c : x)
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Simplified a : b</div>
                <div className="result-value">
                  {result
                    ? `${result.simpA} : ${result.simpB}`
                    : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  x in a : b = c : x
                </div>
                <div className="result-value">
                  {result ? fmt2(result.x) : "—"}
                </div>
              </div>

              {result && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8 }}
                >
                  Great for recipe scaling, map scales, or any
                  proportional relationship where one value is
                  missing.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
