import { useState } from "react";
import Link from "next/link";

const LENGTH_UNITS = {
  mm: { label: "Millimetre (mm)", factor: 0.001 },    // to meter
  cm: { label: "Centimetre (cm)", factor: 0.01 },
  m:  { label: "Metre (m)", factor: 1 },
  km: { label: "Kilometre (km)", factor: 1000 },
  in: { label: "Inch (in)", factor: 0.0254 },
  ft: { label: "Foot (ft)", factor: 0.3048 },
  yd: { label: "Yard (yd)", factor: 0.9144 },
  mi: { label: "Mile (mi)", factor: 1609.344 },
};

export default function LengthConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [result, setResult] = useState(null);

  const convert = () => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) {
      setResult(null);
      return;
    }
    const from = LENGTH_UNITS[fromUnit];
    const to = LENGTH_UNITS[toUnit];
    const inMeters = v * from.factor;
    const converted = inMeters / to.factor;
    setResult(converted);
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  const unitOptions = Object.entries(LENGTH_UNITS);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Unit Converter</div>
          <h1 className="page-title">Length Converter</h1>
          <p className="page-subtitle">
            Convert between common length units like metres, kilometres, inches, feet,
            yards and miles.
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
                  placeholder="e.g. 1000"
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
                Convert Length
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
                All conversions are done via metres as the base unit to keep results
                consistent.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
