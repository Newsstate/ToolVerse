import { useState } from "react";
import Link from "next/link";

const WEIGHT_UNITS = {
  mg: { label: "Milligram (mg)", factor: 1e-6 }, // to kg
  g:  { label: "Gram (g)", factor: 1e-3 },
  kg: { label: "Kilogram (kg)", factor: 1 },
  t:  { label: "Tonne (t)", factor: 1000 },
  oz: { label: "Ounce (oz)", factor: 0.028349523125 },
  lb: { label: "Pound (lb)", factor: 0.45359237 },
};

export default function WeightConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kg");
  const [toUnit, setToUnit] = useState("lb");
  const [result, setResult] = useState(null);

  const convert = () => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) {
      setResult(null);
      return;
    }
    const from = WEIGHT_UNITS[fromUnit];
    const to = WEIGHT_UNITS[toUnit];
    const inKg = v * from.factor;
    const converted = inKg / to.factor;
    setResult(converted);
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  const unitOptions = Object.entries(WEIGHT_UNITS);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Unit Converter</div>
          <h1 className="page-title">Weight Converter</h1>
          <p className="page-subtitle">
            Convert between grams, kilograms, tonnes, ounces and pounds quickly.
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
                  placeholder="e.g. 75"
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
                Convert Weight
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
                Internally, everything is converted via kilograms as the base unit.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
