import { useState } from "react";
import Link from "next/link";

function prepareExpression(expr) {
  if (!expr) return "";
  let e = expr;

  // Basic replacements
  e = e.replace(/×/g, "*").replace(/÷/g, "/");
  e = e.replace(/\^/g, "**");

  // Functions
  e = e.replace(/\bsin\(/g, "Math.sin(");
  e = e.replace(/\bcos\(/g, "Math.cos(");
  e = e.replace(/\btan\(/g, "Math.tan(");
  e = e.replace(/\blog\(/g, "Math.log10(");
  e = e.replace(/\bln\(/g, "Math.log(");
  e = e.replace(/\bsqrt\(/g, "Math.sqrt(");
  e = e.replace(/\babs\(/g, "Math.abs(");

  // Constants
  e = e.replace(/\bpi\b/gi, "Math.PI");
  e = e.replace(/\be\b/g, "Math.E");

  return e;
}

function evalAt(expr, x) {
  const prepared = prepareExpression(expr);
  if (!prepared.trim()) return NaN;
  const withX = prepared.replace(/\bx\b/g, `(${x})`);
  // eslint-disable-next-line no-eval
  return eval(withX);
}

export default function LimitCalculatorPage() {
  const [expression, setExpression] = useState("sin(x)/x");
  const [point, setPoint] = useState("0");
  const [direction, setDirection] = useState("both"); // both, left, right
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(point);
    if (!Number.isFinite(a)) {
      setResult(null);
      return;
    }

    const steps = [];
    const baseH = 0.1;
    for (let i = 0; i < 6; i++) {
      const h = baseH / Math.pow(10, i);
      const row = { h };

      if (direction === "both" || direction === "right") {
        const valRight = evalAt(expression, a + h);
        row.right = Number.isFinite(valRight) ? valRight : null;
      }
      if (direction === "both" || direction === "left") {
        const valLeft = evalAt(expression, a - h);
        row.left = Number.isFinite(valLeft) ? valLeft : null;
      }

      steps.push(row);
    }

    let approx = null;
    let approxLeft = null;
    let approxRight = null;

    if (direction === "both") {
      const last = steps[steps.length - 1];
      if (last.left != null) approxLeft = last.left;
      if (last.right != null) approxRight = last.right;
      if (approxLeft != null && approxRight != null) {
        approx = (approxLeft + approxRight) / 2;
      }
    } else if (direction === "left") {
      const lastValid = [...steps].reverse().find((r) => r.left != null);
      if (lastValid) {
        approxLeft = lastValid.left;
        approx = approxLeft;
      }
    } else if (direction === "right") {
      const lastValid = [...steps].reverse().find((r) => r.right != null);
      if (lastValid) {
        approxRight = lastValid.right;
        approx = approxRight;
      }
    }

    setResult({
      a,
      direction,
      steps,
      approx,
      approxLeft,
      approxRight,
    });
  };

  const fmt6 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Calculus Tool</div>
          <h1 className="page-title">Limit Calculator (Numeric)</h1>
          <p className="page-subtitle">
            Approximate a limit of f(x) as x approaches a point, using numeric values from
            the left and/or right side.
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
                <label className="label">Function f(x)</label>
                <input
                  className="input"
                  type="text"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  placeholder="e.g. (sin(x))/x"
                />
              </div>

              <div className="field">
                <label className="label">Point a (x → a)</label>
                <input
                  className="input"
                  type="number"
                  value={point}
                  onChange={(e) => setPoint(e.target.value)}
                  placeholder="e.g. 0"
                />
              </div>

              <div className="field">
                <label className="label">Direction</label>
                <select
                  className="input"
                  value={direction}
                  onChange={(e) => {
                    setDirection(e.target.value);
                    setResult(null);
                  }}
                >
                  <option value="both">From both sides</option>
                  <option value="left">From left (x → a⁻)</option>
                  <option value="right">From right (x → a⁺)</option>
                </select>
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Approximate Limit
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Approximate Limit</div>
                <div className="result-value">
                  {result && result.approx != null
                    ? fmt6(result.approx)
                    : "—"}
                </div>
              </div>

              {result && result.direction === "both" && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Side Limits</div>
                  <div className="result-value" style={{ fontSize: "0.9rem" }}>
                    Left (x → a⁻):{" "}
                    {result.approxLeft != null
                      ? fmt6(result.approxLeft)
                      : "—"}
                    <br />
                    Right (x → a⁺):{" "}
                    {result.approxRight != null
                      ? fmt6(result.approxRight)
                      : "—"}
                  </div>
                </div>
              )}

              {result && (
                <div style={{ marginTop: 10 }}>
                  <div className="result-title" style={{ fontSize: "0.9rem" }}>
                    Values closer to a
                  </div>
                  <div
                    className="helper-text"
                    style={{ marginTop: 4, fontSize: "0.82rem" }}
                  >
                    {result.steps.map((row, idx) => (
                      <div key={idx}>
                        h = {row.h} →{" "}
                        {result.direction !== "right" && row.left != null
                          ? `f(a−h) ≈ ${fmt6(row.left)} `
                          : ""}
                        {result.direction === "both" ? " | " : ""}
                        {result.direction !== "left" && row.right != null
                          ? `f(a+h) ≈ ${fmt6(row.right)}`
                          : ""}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="helper-text" style={{ marginTop: 8 }}>
                This is a <strong>numerical</strong> approximation. For exact symbolic
                limits, you&apos;d typically use a CAS (computer algebra system) or do the
                algebra by hand.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
