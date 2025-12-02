import { useState } from "react";
import Link from "next/link";

export default function SurfaceAreaCalculatorPage() {
  const [shape, setShape] = useState("cuboid");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);

    let sa = null;

    if (shape === "cuboid") {
      if (!Number.isFinite(A) || !Number.isFinite(B) || !Number.isFinite(C)) {
        setResult(null);
        return;
      }
      sa = 2 * (A * B + B * C + A * C);
    } else if (shape === "cube") {
      if (!Number.isFinite(A)) {
        setResult(null);
        return;
      }
      sa = 6 * A * A;
    } else if (shape === "sphere") {
      if (!Number.isFinite(A)) {
        setResult(null);
        return;
      }
      sa = 4 * Math.PI * A * A;
    } else if (shape === "cylinder") {
      if (!Number.isFinite(A) || !Number.isFinite(B)) {
        setResult(null);
        return;
      }
      sa = 2 * Math.PI * A * (A + B); // 2πr² + 2πrh
    } else if (shape === "cone") {
      if (!Number.isFinite(A) || !Number.isFinite(B)) {
        setResult(null);
        return;
      }
      const r = A;
      const h = B;
      const l = Math.sqrt(r * r + h * h); // slant height
      sa = Math.PI * r * (r + l);
    }

    setResult({ surfaceArea: sa });
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Geometry Tool</div>
          <h1 className="page-title">Surface Area Calculator</h1>
          <p className="page-subtitle">
            Compute total surface area for basic 3D shapes like cuboids, cubes, spheres, cylinders and cones.
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
                  <option value="cuboid">Cuboid</option>
                  <option value="cube">Cube</option>
                  <option value="sphere">Sphere</option>
                  <option value="cylinder">Cylinder</option>
                  <option value="cone">Cone</option>
                </select>
              </div>

              {shape === "cuboid" && (
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
                  <div className="field">
                    <label className="label">Height</label>
                    <input
                      className="input"
                      type="number"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                      placeholder="height"
                    />
                  </div>
                </>
              )}

              {shape === "cube" && (
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

              {shape === "sphere" && (
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

              {shape === "cylinder" && (
                <>
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

              {shape === "cone" && (
                <>
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
                Calculate Surface Area
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Surface Area</div>
                <div className="result-value">
                  {result ? fmt4(result.surfaceArea) : "—"}
                </div>
              </div>

              <p className="helper-text" style={{ marginTop: 8 }}>
                Useful for painting, wrapping, or material estimates. Add your own units (cm², m², etc.).
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
