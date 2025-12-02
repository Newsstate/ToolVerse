import { useState } from "react";
import Link from "next/link";

function prepareExpression(expr) {
  if (!expr) return "";
  let e = expr;

  e = e.replace(/×/g, "*").replace(/÷/g, "/");
  e = e.replace(/\^/g, "**");

  e = e.replace(/\bsin\(/g, "Math.sin(");
  e = e.replace(/\bcos\(/g, "Math.cos(");
  e = e.replace(/\btan\(/g, "Math.tan(");
  e = e.replace(/\blog\(/g, "Math.log10(");
  e = e.replace(/\bln\(/g, "Math.log(");
  e = e.replace(/\bsqrt\(/g, "Math.sqrt(");
  e = e.replace(/\babs\(/g, "Math.abs(");

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

export default function DerivativeCalculatorPage() {
  const [expression, setExpression] = useState("x^2");
  const [point, setPoint] = useState("2");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(point);
    if (!Number.isFinite(a)) {
      setResult(null);
      return;
    }

    const baseH = 0.1;
    const rows = [];

    for (let i = 0; i < 6; i++) {
      const h = baseH / Math.pow(10, i);
      const fPlus = evalAt(expression, a + h);
      const fMinus = evalAt(expression, a - h);
      if (!Number.isFinite(fPlus) || !Number.isFinite(fMinus)) continue;
      const derivative = (fPlus - fMinus) / (2 * h);
      rows.push({ h, derivative });
    }

    const last = rows[rows.length - 1];
    setResult({
      a,
      rows,
      approx: last ? last.derivative : null,
    });
  };

  const fmt6 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Calculus Tool</div>
          <h1 className="page-title">Derivative Calculator (Numeric)</h1>
          <p className="page-subtitle">
            Estimate the derivative f&apos;(a) using a central difference formula.
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
                <label className="label">Function f(x)</label>
                <input
                  className="input"
                  type="text"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  placeholder="e.g. x^3 - 4x + 1"
                />
              </div>

              <div className="field">
                <label className="label">Point a</label>
                <input
                  className="input"
                  type="number"
                  value={point}
                  onChange={(e) => setPoint(e.target.value)}
                  placeholder="e.g. 2"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Approximate f&apos;(a)
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Approximate Derivative</div>
                <div className="result-value">
                  {result && result.approx != null
                    ? fmt6(result.approx)
                    : "—"}
                </div>
              </div>

              {result && result.rows.length > 0 && (
                <div
                  className="helper-text"
                  style={{ marginTop: 10, fontSize: "0.82rem" }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    Values for smaller h:
                  </div>
                  {result.rows.map((r, i) => (
                    <div key={i}>
                      h = {r.h} → f&apos;(a) ≈ {fmt6(r.derivative)}
                    </div>
                  ))}
                </div>
              )}

              <p className="helper-text" style={{ marginTop: 8 }}>
                Uses the symmetric difference formula{" "}
                <strong>[f(a + h) − f(a − h)] / (2h)</strong> for shrinking values of h.
                For exact symbolic derivatives, you&apos;d typically use a CAS.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
