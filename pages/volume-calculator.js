import { useState } from "react";
import Link from "next/link";

export default function VolumeCalculatorPage() {
  const [shape, setShape] = useState("cuboid");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);

    let volume = null;

    if (shape === "cuboid") {
      if (!Number.isFinite(A) || !Number.isFinite(B) || !Number.isFinite(C)) {
        setResult(null);
        return;
      }
      volume = A * B * C;
    } else if (shape === "cube") {
      if (!Number.isFinite(A)) {
        setResult(null);
        return;
      }
      volume = Math.pow(A, 3);
    } else if (shape === "cylinder") {
      if (!Number.isFinite(A) || !Number.isFinite(B)) {
        setResult(null);
        return;
      }
      volume = Math.PI * A * A * B; // πr²h
    } else if (shape === "sphere") {
      if (!Number.isFinite(A)) {
        setResult(null);
        return;
      }
      volume = (4 / 3) * Math.PI * Math.pow(A, 3);
    } else if (shape === "cone") {
      if (!Number.isFinite(A) || !Number.isFinite(B)) {
        setResult(null);
        return;
      }
      volume = (1 / 3) * Math.PI * A * A * B;
    }

    setResult({ volume });
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Geometry Tool</div>
          <h1 className="page-title">Volume Calculator</h1>
          <p className="page-subtitle">
            Calculate volume for common 3D shapes: cuboid, cube, cylinder, sphere, and cone.
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
                  <option value="cuboid">Cuboid (L × W × H)</option>
                  <option value="cube">Cube</option>
                  <option value="cylinder">Cylinder</option>
                  <option value="sphere">Sphere</option>
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
                Calculate Volume
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Volume</div>
                <div className="result-value">
                  {result ? fmt4(result.volume) : "—"}
                </div>
              </div>

              <p className="helper-text" style={{ marginTop: 8 }}>
                Volume units depend on your inputs (cm³, m³, litres if you convert, etc.).
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
