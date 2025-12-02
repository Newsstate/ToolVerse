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

export default function IntegralCalculatorPage() {
  const [expression, setExpression] = useState("x^2");
  const [a, setA] = useState("0");
  const [b, setB] = useState("1");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    if (!Number.isFinite(A) || !Number.isFinite(B) || A === B) {
      setResult(null);
      return;
    }

    const n = 400; // even number for Simpson
    const h = (B - A) / n;
    let sum = 0;
    let ok = true;

    for (let i = 0; i <= n; i++) {
      const x = A + i * h;
      const fx = evalAt(expression, x);
      if (!Number.isFinite(fx)) {
        ok = false;
        break;
      }
      // Simpson weights
      let weight = 1;
      if (i === 0 || i === n) {
        weight = 1;
      } else if (i % 2 === 0) {
        weight = 2;
      } else {
        weight = 4;
      }
      sum += weight * fx;
    }

    if (!ok) {
      setResult(null);
      return;
    }

    const integral = (h / 3) * sum;
    setResult({
      A,
      B,
      integral,
    });
  };

  const fmt6 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Calculus Tool</div>
          <h1 className="page-title">Definite Integral Calculator (Numeric)</h1>
          <p className="page-subtitle">
            Approximate a definite integral ∫<sub>a</sub><sup>b</sup> f(x) dx using
            Simpson&apos;s rule (numeric integration).
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
                  placeholder="e.g. x^2 + 3*x"
                />
              </div>

              <div className="field">
                <label className="label">Lower Limit a</label>
                <input
                  className="input"
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  placeholder="e.g. 0"
                />
              </div>

              <div className="field">
                <label className="label">Upper Limit b</label>
                <input
                  className="input"
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  placeholder="e.g. 1"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Approximate Integral
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">
                  ∫<sub>a</sub><sup>b</sup> f(x) dx (approx)
                </div>
                <div className="result-value">
                  {result ? fmt6(result.integral) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This uses Simpson&apos;s rule with 400 subintervals. For complicated or
                  improper integrals, results may be inaccurate — check with a CAS or
                  analytic method if needed.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
