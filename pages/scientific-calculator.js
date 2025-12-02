import { useState } from "react";
import Link from "next/link";

function prepareExpression(expr) {
  if (!expr) return "";

  let e = expr;

  // Replace common symbols with JS equivalents
  e = e.replace(/×/g, "*").replace(/÷/g, "/");

  // Power operator: use ^ in UI but map to **
  e = e.replace(/\^/g, "**");

  // Map functions to Math.*
  e = e.replace(/\bsin\(/g, "Math.sin(");
  e = e.replace(/\bcos\(/g, "Math.cos(");
  e = e.replace(/\btan\(/g, "Math.tan(");
  e = e.replace(/\blog\(/g, "Math.log10(");
  e = e.replace(/\bln\(/g, "Math.log(");
  e = e.replace(/\bsqrt\(/g, "Math.sqrt(");

  // Constants
  e = e.replace(/\bpi\b/gi, "Math.PI");
  e = e.replace(/\be\b/g, "Math.E");

  return e;
}

export default function ScientificCalculatorPage() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const append = (val) => {
    setExpression((prev) => prev + val);
    setError("");
  };

  const clearAll = () => {
    setExpression("");
    setResult(null);
    setError("");
  };

  const backspace = () => {
    setExpression((prev) => prev.slice(0, -1));
    setError("");
  };

  const calculate = () => {
    try {
      const prepared = prepareExpression(expression);
      if (!prepared.trim()) {
        setResult(null);
        return;
      }
      // eslint-disable-next-line no-eval
      const value = eval(prepared);
      if (typeof value === "number" && isFinite(value)) {
        setResult(value);
        setError("");
      } else {
        setResult(null);
        setError("Invalid expression");
      }
    } catch (e) {
      setResult(null);
      setError("Invalid expression");
    }
  };

  const fmt = (n) =>
    typeof n === "number"
      ? n.toLocaleString(undefined, { maximumFractionDigits: 10 })
      : n;

  const btn = (label, val = label) => (
    <button
      key={label}
      type="button"
      className="btn"
      style={{ padding: "6px 10px", fontSize: "0.9rem" }}
      onClick={() => append(val)}
    >
      {label}
    </button>
  );

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Scientific Calculator</h1>
          <p className="page-subtitle">
            A simple scientific calculator for quick expressions, trigonometry, powers
            and logs.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Display + keypad */}
            <div>
              <div className="field">
                <label className="label">Expression</label>
                <input
                  className="input"
                  type="text"
                  value={expression}
                  onChange={(e) => {
                    setExpression(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g. sin(pi/2) + 2^3 / 4"
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                {/* First row */}
                {btn("7")}
                {btn("8")}
                {btn("9")}
                {btn("÷", "÷")}
                <button
                  type="button"
                  className="btn"
                  style={{ padding: "6px 10px", fontSize: "0.9rem" }}
                  onClick={backspace}
                >
                  ⌫
                </button>

                {/* Second row */}
                {btn("4")}
                {btn("5")}
                {btn("6")}
                {btn("×", "×")}
                {btn("^")}

                {/* Third row */}
                {btn("1")}
                {btn("2")}
                {btn("3")}
                {btn("-")}
                {btn("+")}

                {/* Fourth row */}
                {btn("0")}
                {btn(".")}
                {btn("(")}
                {btn(")")}
                <button
                  type="button"
                  className="btn"
                  style={{ padding: "6px 10px", fontSize: "0.9rem" }}
                  onClick={clearAll}
                >
                  AC
                </button>

                {/* Fifth row: functions */}
                {btn("sin(", "sin(")}
                {btn("cos(", "cos(")}
                {btn("tan(", "tan(")}
                {btn("log(", "log(")}
                {btn("ln(", "ln(")}

                {/* Sixth row */}
                {btn("sqrt(", "sqrt(")}
                {btn("pi", "pi")}
                {btn("e", "e")}
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                =
              </button>
            </div>

            {/* Result */}
            <div>
              <div className="result-box">
                <div className="result-title">Result</div>
                <div className="result-value">
                  {result !== null ? fmt(result) : "—"}
                </div>
              </div>

              {error && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8, color: "#e11d48" }}
                >
                  {error}
                </p>
              )}

              <p className="helper-text" style={{ marginTop: 8 }}>
                Supported: +, -, ×, ÷, ^, sin(), cos(), tan(), log() (base 10), ln(),
                sqrt(), pi, e and parentheses.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
