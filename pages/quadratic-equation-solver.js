import { useState } from "react";
import Link from "next/link";

export default function QuadraticEquationSolverPage() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);

    if (!Number.isFinite(A) || A === 0 || !Number.isFinite(B) || !Number.isFinite(C)) {
      setResult(null);
      return;
    }

    const discriminant = B * B - 4 * A * C;

    if (discriminant > 0) {
      const sqrtD = Math.sqrt(discriminant);
      const x1 = (-B + sqrtD) / (2 * A);
      const x2 = (-B - sqrtD) / (2 * A);
      setResult({
        type: "two-real",
        discriminant,
        x1,
        x2,
      });
    } else if (discriminant === 0) {
      const x = -B / (2 * A);
      setResult({
        type: "one-real",
        discriminant,
        x,
      });
    } else {
      const sqrtD = Math.sqrt(-discriminant);
      const real = -B / (2 * A);
      const imag = sqrtD / (2 * A);
      setResult({
        type: "complex",
        discriminant,
        real,
        imag,
      });
    }
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const fmt2 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const renderRoots = () => {
    if (!result) return "—";
    if (result.type === "two-real") {
      return (
        <>
          x₁ = {fmt4(result.x1)}
          <br />
          x₂ = {fmt4(result.x2)}
        </>
      );
    }
    if (result.type === "one-real") {
      return <>x = {fmt4(result.x)}</>;
    }
    const sign = result.imag >= 0 ? "+" : "−";
    const imagAbs = Math.abs(result.imag);
    return (
      <>
        x₁ = {fmt4(result.real)} {sign} {fmt4(imagAbs)}i
        <br />
        x₂ = {fmt4(result.real)} {sign === "+" ? "−" : "+"} {fmt4(imagAbs)}i
      </>
    );
  };

  const discriminantLabel = () => {
    if (!result) return "";
    if (result.type === "two-real") return "Two distinct real roots";
    if (result.type === "one-real") return "One real repeated root";
    return "Two complex conjugate roots";
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Quadratic Equation Solver</h1>
          <p className="page-subtitle">
            Solve equations of the form ax² + bx + c = 0. Get real or complex roots with discriminant.
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
                <label className="label">Coefficient a (x² term)</label>
                <input
                  className="input"
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  placeholder="e.g. 1"
                />
              </div>

              <div className="field">
                <label className="label">Coefficient b (x term)</label>
                <input
                  className="input"
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  placeholder="e.g. -3"
                />
              </div>

              <div className="field">
                <label className="label">Constant c</label>
                <input
                  className="input"
                  type="number"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  placeholder="e.g. 2"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Solve Equation
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Roots</div>
                <div className="result-value">{renderRoots()}</div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Discriminant (b² − 4ac)</div>
                <div className="result-value">
                  {result ? fmt2(result.discriminant) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  {discriminantLabel()}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
