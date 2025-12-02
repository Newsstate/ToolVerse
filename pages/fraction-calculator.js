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

export default function FractionCalculatorPage() {
  const [n1, setN1] = useState("");
  const [d1, setD1] = useState("");
  const [n2, setN2] = useState("");
  const [d2, setD2] = useState("");
  const [op, setOp] = useState("+");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(n1);
    const b = parseFloat(d1);
    const c = parseFloat(n2);
    const d = parseFloat(d2);

    if (!a && a !== 0) {
      setResult(null);
      return;
    }
    if (!b || !d) {
      setResult(null);
      return;
    }
    if (!c && c !== 0) {
      setResult(null);
      return;
    }

    let num = 0;
    let den = 1;

    if (op === "+") {
      num = a * d + c * b;
      den = b * d;
    } else if (op === "-") {
      num = a * d - c * b;
      den = b * d;
    } else if (op === "×") {
      num = a * c;
      den = b * d;
    } else if (op === "÷") {
      num = a * d;
      den = b * c;
    }

    if (den === 0) {
      setResult(null);
      return;
    }

    const sign = den < 0 ? -1 : 1;
    num *= sign;
    den *= sign;

    const g = gcd(num, den);
    const simpNum = num / g;
    const simpDen = den / g;
    const decimal = simpNum / simpDen;

    setResult({
      num: simpNum,
      den: simpDen,
      decimal,
    });
  };

  const fmtDecimal = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Fraction Calculator</h1>
          <p className="page-subtitle">
            Add, subtract, multiply or divide two fractions and get a simplified result
            plus decimal value.
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
                <label className="label">Fraction 1</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <input
                    className="input"
                    type="number"
                    value={n1}
                    onChange={(e) => setN1(e.target.value)}
                    placeholder="numerator"
                  />
                  <div style={{ textAlign: "center", fontSize: "1.2rem" }}>
                    —
                  </div>
                  <input
                    className="input"
                    type="number"
                    value={d1}
                    onChange={(e) => setD1(e.target.value)}
                    placeholder="denominator"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Operation</label>
                <select
                  className="input"
                  value={op}
                  onChange={(e) => setOp(e.target.value)}
                >
                  <option value="+">+</option>
                  <option value="-">−</option>
                  <option value="×">×</option>
                  <option value="÷">÷</option>
                </select>
              </div>

              <div className="field">
                <label className="label">Fraction 2</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <input
                    className="input"
                    type="number"
                    value={n2}
                    onChange={(e) => setN2(e.target.value)}
                    placeholder="numerator"
                  />
                  <div style={{ textAlign: "center", fontSize: "1.2rem" }}>
                    —
                  </div>
                  <input
                    className="input"
                    type="number"
                    value={d2}
                    onChange={(e) => setD2(e.target.value)}
                    placeholder="denominator"
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Result (Simplified Fraction)</div>
                <div className="result-value">
                  {result
                    ? `${result.num} / ${result.den}`
                    : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  Decimal Equivalent
                </div>
                <div className="result-value">
                  {result ? fmtDecimal(result.decimal) : "—"}
                </div>
              </div>

              {result && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8 }}
                >
                  Fraction is simplified using the greatest common
                  divisor (GCD). Use this to quickly tidy up
                  fraction homework or calculations.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
