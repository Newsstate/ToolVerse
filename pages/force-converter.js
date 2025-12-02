import { useState } from "react";
import Link from "next/link";

const FORCE_UNITS = {
  N: { label: "Newton (N)", factor: 1 }, // base
  kN: { label: "Kilonewton (kN)", factor: 1000 },
  dyn: { label: "Dyne (dyn)", factor: 1e-5 },
  kgf: { label: "Kilogram-force (kgf)", factor: 9.80665 },
  lbf: { label: "Pound-force (lbf)", factor: 4.4482216153 },
};

export default function ForceConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("N");
  const [toUnit, setToUnit] = useState("kgf");
  const [result, setResult] = useState(null);

  const convert = () => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) {
      setResult(null);
      return;
    }
    const from = FORCE_UNITS[fromUnit];
    const to = FORCE_UNITS[toUnit];
    const inNewtons = v * from.factor;
    const converted = inNewtons / to.factor;
    setResult(converted);
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  const unitOptions = Object.entries(FORCE_UNITS);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Unit Converter</div>
          <h1 className="page-title">Force Converter</h1>
          <p className="page-subtitle">
            Convert between Newtons, kilogram-force, pound-force, dynes and kilonewtons.
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
                Convert Force
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Converted Value</div>
                <div className="result-value">
                  {result != null ? fmt(result) : "—"}
                </div>
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                All conversions go via Newton (N) as the base unit of force.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
