import { useState } from "react";
import Link from "next/link";

const ANGLE_UNITS = {
  deg:  { label: "Degrees (°)", factor: Math.PI / 180 },     // to radians
  rad:  { label: "Radians (rad)", factor: 1 },
  grad: { label: "Gradians (gon)", factor: Math.PI / 200 },
  turn: { label: "Turns (rev)", factor: 2 * Math.PI },
};

export default function AngleConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("deg");
  const [toUnit, setToUnit] = useState("rad");
  const [result, setResult] = useState(null);

  const convert = () => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) {
      setResult(null);
      return;
    }
    const from = ANGLE_UNITS[fromUnit];
    const to = ANGLE_UNITS[toUnit];
    const inRad = v * from.factor;
    const converted = inRad / to.factor;
    setResult(converted);
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  const unitOptions = Object.entries(ANGLE_UNITS);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Unit Converter</div>
          <h1 className="page-title">Angle Converter</h1>
          <p className="page-subtitle">
            Convert angles between degrees, radians, gradians and full turns.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Inputs */}
            <div>
              <div className="field">
                <label className="label">Value</label>
                <input
                  className="input"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="e.g. 180"
                />
              </div>

              <div className="field">
                <label className="label">From</label>
                <select
                  className="input"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                >
                  {unitOptions.map(([key, u]) => (
                    <option key={key} value={key}>{u.label}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">To</label>
                <select
                  className="input"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                >
                  {unitOptions.map(([key, u]) => (
                    <option key={key} value={key}>{u.label}</option>
                  ))}
                </select>
              </div>

              <button type="button" className="btn" onClick={convert}>
                Convert Angle
              </button>
            </div>

            {/* Result */}
            <div>
              <div className="result-box">
                <div className="result-title">Converted Value</div>
                <div className="result-value">
                  {result != null ? fmt(result) : "—"}
                </div>
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                All conversions go via radians as the base angle unit.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
