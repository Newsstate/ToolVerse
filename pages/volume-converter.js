import { useState } from "react";
import Link from "next/link";

const VOLUME_UNITS = {
  ml:   { label: "Millilitre (mL)", factor: 1e-6 },            // to m³
  l:    { label: "Litre (L)", factor: 1e-3 },
  m3:   { label: "Cubic metre (m³)", factor: 1 },
  cm3:  { label: "Cubic centimetre (cm³)", factor: 1e-6 },
  in3:  { label: "Cubic inch (in³)", factor: Math.pow(0.0254, 3) },
  ft3:  { label: "Cubic foot (ft³)", factor: Math.pow(0.3048, 3) },
  gal:  { label: "US gallon (gal)", factor: 0.003785411784 },
};

export default function VolumeConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("l");
  const [toUnit, setToUnit] = useState("ml");
  const [result, setResult] = useState(null);

  const convert = () => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) {
      setResult(null);
      return;
    }
    const from = VOLUME_UNITS[fromUnit];
    const to = VOLUME_UNITS[toUnit];
    const inM3 = v * from.factor;
    const converted = inM3 / to.factor;
    setResult(converted);
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  const unitOptions = Object.entries(VOLUME_UNITS);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Unit Converter</div>
          <h1 className="page-title">Volume Converter</h1>
          <p className="page-subtitle">
            Convert between litres, millilitres, cubic metres, cubic feet, gallons and more.
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
                  placeholder="e.g. 2.5"
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
                Convert Volume
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
                Uses cubic metre (m³) as the base unit for all conversions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
