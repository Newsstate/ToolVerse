import { useState } from "react";
import Link from "next/link";

export default function PythagoreanCalculatorPage() {
  const [mode, setMode] = useState("hypotenuse");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);

    let value = null;
    let label = "";

    try {
      if (mode === "hypotenuse") {
        if (!Number.isFinite(A) || !Number.isFinite(B)) {
          setResult(null);
          return;
        }
        value = Math.sqrt(A * A + B * B);
        label = "Hypotenuse (c)";
      } else if (mode === "leg-from-c-a") {
        if (!Number.isFinite(C) || !Number.isFinite(A) || C <= A) {
          setResult(null);
          return;
        }
        value = Math.sqrt(C * C - A * A);
        label = "Missing leg (b)";
      } else if (mode === "leg-from-c-b") {
        if (!Number.isFinite(C) || !Number.isFinite(B) || C <= B) {
          setResult(null);
          return;
        }
        value = Math.sqrt(C * C - B * B);
        label = "Missing leg (a)";
      }
    } catch {
      setResult(null);
      return;
    }

    if (!Number.isFinite(value)) {
      setResult(null);
      return;
    }

    setResult({ value, label });
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const showLegInputs = mode !== "hypotenuse";

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Pythagorean Calculator</h1>
          <p className="page-subtitle">
            Use a² + b² = c² to find the hypotenuse or a missing leg in a right-angled triangle.
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
                <label className="label">What do you want to find?</label>
                <select
                  className="input"
                  value={mode}
                  onChange={(e) => {
                    setMode(e.target.value);
                    setResult(null);
                  }}
                >
                  <option value="hypotenuse">Hypotenuse c (given a and b)</option>
                  <option value="leg-from-c-a">Leg b (given a and c)</option>
                  <option value="leg-from-c-b">Leg a (given b and c)</option>
                </select>
              </div>

              {mode === "hypotenuse" && (
                <>
                  <div className="field">
                    <label className="label">Side a</label>
                    <input
                      className="input"
                      type="number"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      placeholder="e.g. 3"
                    />
                  </div>

                  <div className="field">
                    <label className="label">Side b</label>
                    <input
                      className="input"
                      type="number"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      placeholder="e.g. 4"
                    />
                  </div>
                </>
              )}

              {mode === "leg-from-c-a" && (
                <>
                  <div className="field">
                    <label className="label">Side a</label>
                    <input
                      className="input"
                      type="number"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      placeholder="known leg (a)"
                    />
                  </div>
                  <div className="field">
                    <label className="label">Hypotenuse c</label>
                    <input
                      className="input"
                      type="number"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                      placeholder="hypotenuse (c)"
                    />
                  </div>
                </>
              )}

              {mode === "leg-from-c-b" && (
                <>
                  <div className="field">
                    <label className="label">Side b</label>
                    <input
                      className="input"
                      type="number"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      placeholder="known leg (b)"
                    />
                  </div>
                  <div className="field">
                    <label className="label">Hypotenuse c</label>
                    <input
                      className="input"
                      type="number"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                      placeholder="hypotenuse (c)"
                    />
                  </div>
                </>
              )}

              <button type="button" className="btn" onClick={calculate}>
                Calculate
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  {result ? result.label : "Result"}
                </div>
                <div className="result-value">
                  {result ? fmt4(result.value) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Works only for right-angled triangles. Non-right triangles require different formulas (like cosine rule).
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
