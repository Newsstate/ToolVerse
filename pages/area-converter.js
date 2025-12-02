import { useState } from "react";
import Link from "next/link";

const AREA_UNITS = {
  "mm2": { label: "Square millimetre (mm²)", factor: 1e-6 },      // to m²
  "cm2": { label: "Square centimetre (cm²)", factor: 1e-4 },
  "m2":  { label: "Square metre (m²)", factor: 1 },
  "km2": { label: "Square kilometre (km²)", factor: 1e6 },
  "in2": { label: "Square inch (in²)", factor: 0.00064516 },
  "ft2": { label: "Square foot (ft²)", factor: 0.09290304 },
  "yd2": { label: "Square yard (yd²)", factor: 0.83612736 },
  "acre": { label: "Acre", factor: 4046.8564224 },
  "hectare": { label: "Hectare (ha)", factor: 10000 },
};

export default function AreaConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m2");
  const [toUnit, setToUnit] = useState("ft2");
  const [result, setResult] = useState(null);

  const convert = () => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) {
      setResult(null);
      return;
    }
    const from = AREA_UNITS[fromUnit];
    const to = AREA_UNITS[toUnit];
    const inM2 = v * from.factor;
    const converted = inM2 / to.factor;
    setResult(converted);
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  const unitOptions = Object.entries(AREA_UNITS);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Unit Converter</div>
          <h1 className="page-title">Area Converter</h1>
          <p className="page-subtitle">
            Convert between square metres, feet, inches, acres, hectares and more.
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
                  placeholder="e.g. 100"
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
                Convert Area
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
                All conversions go via square metres (m²) as the base unit.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
