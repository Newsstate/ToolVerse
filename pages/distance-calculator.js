import { useState } from "react";
import Link from "next/link";

export default function DistanceCalculatorPage() {
  const [mode, setMode] = useState("2d");
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [z1, setZ1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [z2, setZ2] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const X1 = parseFloat(x1);
    const Y1 = parseFloat(y1);
    const X2 = parseFloat(x2);
    const Y2 = parseFloat(y2);

    if (mode === "2d") {
      if (
        !Number.isFinite(X1) ||
        !Number.isFinite(Y1) ||
        !Number.isFinite(X2) ||
        !Number.isFinite(Y2)
      ) {
        setResult(null);
        return;
      }
      const dx = X2 - X1;
      const dy = Y2 - Y1;
      const d = Math.sqrt(dx * dx + dy * dy);
      setResult({ distance: d });
    } else {
      const Z1 = parseFloat(z1);
      const Z2 = parseFloat(z2);
      if (
        !Number.isFinite(X1) ||
        !Number.isFinite(Y1) ||
        !Number.isFinite(Z1) ||
        !Number.isFinite(X2) ||
        !Number.isFinite(Y2) ||
        !Number.isFinite(Z2)
      ) {
        setResult(null);
        return;
      }
      const dx = X2 - X1;
      const dy = Y2 - Y1;
      const dz = Z2 - Z1;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      setResult({ distance: d });
    }
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Distance Calculator</h1>
          <p className="page-subtitle">
            Find the straight-line distance between two points in 2D or 3D space.
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
                <label className="label">Mode</label>
                <select
                  className="input"
                  value={mode}
                  onChange={(e) => {
                    setMode(e.target.value);
                    setResult(null);
                  }}
                >
                  <option value="2d">2D (x, y)</option>
                  <option value="3d">3D (x, y, z)</option>
                </select>
              </div>

              <div className="field">
                <label className="label">Point 1</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      mode === "2d"
                        ? "1fr 1fr"
                        : "1fr 1fr 1fr",
                    gap: 8,
                  }}
                >
                  <input
                    className="input"
                    type="number"
                    value={x1}
                    onChange={(e) => setX1(e.target.value)}
                    placeholder="x₁"
                  />
                  <input
                    className="input"
                    type="number"
                    value={y1}
                    onChange={(e) => setY1(e.target.value)}
                    placeholder="y₁"
                  />
                  {mode === "3d" && (
                    <input
                      className="input"
                      type="number"
                      value={z1}
                      onChange={(e) => setZ1(e.target.value)}
                      placeholder="z₁"
                    />
                  )}
                </div>
              </div>

              <div className="field">
                <label className="label">Point 2</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      mode === "2d"
                        ? "1fr 1fr"
                        : "1fr 1fr 1fr",
                    gap: 8,
                  }}
                >
                  <input
                    className="input"
                    type="number"
                    value={x2}
                    onChange={(e) => setX2(e.target.value)}
                    placeholder="x₂"
                  />
                  <input
                    className="input"
                    type="number"
                    value={y2}
                    onChange={(e) => setY2(e.target.value)}
                    placeholder="y₂"
                  />
                  {mode === "3d" && (
                    <input
                      className="input"
                      type="number"
                      value={z2}
                      onChange={(e) => setZ2(e.target.value)}
                      placeholder="z₂"
                    />
                  )}
                </div>
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Distance
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Distance</div>
                <div className="result-value">
                  {result ? fmt4(result.distance) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Uses{" "}
                  {mode === "2d"
                    ? "√[(x₂ − x₁)² + (y₂ − y₁)²]"
                    : "√[(x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²]"}{" "}
                  — the Pythagorean theorem in 2D/3D.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
