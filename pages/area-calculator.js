import { useState } from "react";
import Link from "next/link";

export default function AreaCalculatorPage() {
  const [shape, setShape] = useState("rectangle");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);

    let area = null;

    if (shape === "rectangle") {
      if (!Number.isFinite(A) || !Number.isFinite(B)) {
        setResult(null);
        return;
      }
      area = A * B;
    } else if (shape === "square") {
      if (!Number.isFinite(A)) {
        setResult(null);
        return;
      }
      area = A * A;
    } else if (shape === "circle") {
      if (!Number.isFinite(A) || A < 0) {
        setResult(null);
        return;
      }
      area = Math.PI * A * A;
    } else if (shape === "triangle") {
      if (!Number.isFinite(A) || !Number.isFinite(B)) {
        setResult(null);
        return;
      }
      area = 0.5 * A * B;
    }

    setResult({ area });
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const shapeLabel = {
    rectangle: "length × width",
    square: "side",
    circle: "radius",
    triangle: "base × height",
  }[shape];

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Geometry Tool</div>
          <h1 className="page-title">Area Calculator</h1>
          <p className="page-subtitle">
            Quickly find the area of basic shapes: rectangles, squares, circles and
            triangles.
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
                <label className="label">Shape</label>
                <select
                  className="input"
                  value={shape}
                  onChange={(e) => {
                    setShape(e.target.value);
                    setResult(null);
                  }}
                >
                  <option value="rectangle">Rectangle</option>
                  <option value="square">Square</option>
                  <option value="circle">Circle</option>
                  <option value="triangle">Triangle</option>
                </select>
              </div>

              {shape === "rectangle" && (
                <>
                  <div className="field">
                    <label className="label">Length</label>
                    <input
                      className="input"
                      type="number"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      placeholder="length"
                    />
                  </div>
                  <div className="field">
                    <label className="label">Width</label>
                    <input
                      className="input"
                      type="number"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      placeholder="width"
                    />
                  </div>
                </>
              )}

              {shape === "square" && (
                <div className="field">
                  <label className="label">Side</label>
                  <input
                    className="input"
                    type="number"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    placeholder="side"
                  />
                </div>
              )}

              {shape === "circle" && (
                <div className="field">
                  <label className="label">Radius</label>
                  <input
                    className="input"
                    type="number"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    placeholder="radius"
                  />
                </div>
              )}

              {shape === "triangle" && (
                <>
                  <div className="field">
                    <label className="label">Base</label>
                    <input
                      className="input"
                      type="number"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      placeholder="base"
                    />
                  </div>
                  <div className="field">
                    <label className="label">Height</label>
                    <input
                      className="input"
                      type="number"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      placeholder="height"
                    />
                  </div>
                </>
              )}

              <button type="button" className="btn" onClick={calculate}>
                Calculate Area
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Area</div>
                <div className="result-value">
                  {result ? fmt4(result.area) : "—"}
                </div>
              </div>

              <p className="helper-text" style={{ marginTop: 8 }}>
                Uses standard formulas — e.g., rectangle: L×W, circle: πr², triangle:
                ½×base×height. Add your own units (cm², m², ft², etc.).
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
