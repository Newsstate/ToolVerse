import { useState } from "react";
import Link from "next/link";

const ENERGY_UNITS = {
  J:   { label: "Joule (J)", factor: 1 },                       // base
  kJ:  { label: "Kilojoule (kJ)", factor: 1000 },
  cal: { label: "Calorie (cal)", factor: 4.184 },               // small calorie
  kcal:{ label: "Kilocalorie (kcal)", factor: 4184 },           // food calorie
  Wh:  { label: "Watt-hour (Wh)", factor: 3600 },
  kWh: { label: "Kilowatt-hour (kWh)", factor: 3.6e6 },
};

export default function EnergyConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kcal");
  const [toUnit, setToUnit] = useState("kJ");
  const [result, setResult] = useState(null);

  const convert = () => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) {
      setResult(null);
      return;
    }
    const from = ENERGY_UNITS[fromUnit];
    const to = ENERGY_UNITS[toUnit];
    const inJ = v * from.factor;
    const converted = inJ / to.factor;
    setResult(converted);
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  const unitOptions = Object.entries(ENERGY_UNITS);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Unit Converter</div>
          <h1 className="page-title">Energy Converter</h1>
          <p className="page-subtitle">
            Convert between joules, calories, kilocalories, watt-hours and kilowatt-hours.
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
                  placeholder="e.g. 500"
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
                Convert Energy
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
                Uses joule (J) as the base unit. Note: food labels usually use kilocalories (kcal).
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
