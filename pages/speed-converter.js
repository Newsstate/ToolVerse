import { useState } from "react";
import Link from "next/link";

const SPEED_UNITS = {
  "m/s": { label: "Metres per second (m/s)", factor: 1 }, // base
  "km/h": { label: "Kilometres per hour (km/h)", factor: 1000 / 3600 },
  mph: { label: "Miles per hour (mph)", factor: 1609.344 / 3600 },
  knot: { label: "Knots (kn)", factor: 1852 / 3600 },
};

export default function SpeedConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("km/h");
  const [toUnit, setToUnit] = useState("m/s");
  const [result, setResult] = useState(null);

  const convert = () => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) {
      setResult(null);
      return;
    }
    const from = SPEED_UNITS[fromUnit];
    const to = SPEED_UNITS[toUnit];
    const inMs = v * from.factor;
    const converted = inMs / to.factor;
    setResult(converted);
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const unitOptions = Object.entries(SPEED_UNITS);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Unit Converter</div>
          <h1 className="page-title">Speed Converter</h1>
          <p className="page-subtitle">
            Convert speeds between m/s, km/h, mph and knots for travel or physics
            problems.
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
                <label className="label">Value</label>
                <input
                  className="input"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="e.g. 80"
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
                    <option key={key} value={key}>
                      {u.label}
                    </option>
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
                    <option key={key} value={key}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>

              <button type="button" className="btn" onClick={convert}>
                Convert Speed
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
                Internal base unit is m/s. For example, 1 km/h ≈ 0.2778 m/s.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
