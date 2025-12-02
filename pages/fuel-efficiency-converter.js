import { useState } from "react";
import Link from "next/link";

const FUEL_UNITS = {
  kmpl: {
    label: "Kilometres per litre (km/L)",
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  l_per_100km: {
    label: "Litres per 100 km (L/100km)",
    toBase: (v) => (v <= 0 ? NaN : 100 / v),         // -> km/L
    fromBase: (v) => (v <= 0 ? NaN : 100 / v),
  },
  mpg_us: {
    label: "Miles per gallon (US mpg)",
    toBase: (v) => (v * 1.609344) / 3.785411784,     // -> km/L
    fromBase: (v) => (v * 3.785411784) / 1.609344,
  },
};

export default function FuelEfficiencyConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kmpl");
  const [toUnit, setToUnit] = useState("l_per_100km");
  const [result, setResult] = useState(null);

  const convert = () => {
    const v = parseFloat(value);
    if (!Number.isFinite(v) || v <= 0) {
      setResult(null);
      return;
    }

    const from = FUEL_UNITS[fromUnit];
    const to = FUEL_UNITS[toUnit];

    const baseKmpl = from.toBase(v);
    if (!Number.isFinite(baseKmpl) || baseKmpl <= 0) {
      setResult(null);
      return;
    }

    const converted = to.fromBase(baseKmpl);
    setResult(converted);
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const unitOptions = Object.entries(FUEL_UNITS);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Unit Converter</div>
          <h1 className="page-title">Fuel Efficiency Converter</h1>
          <p className="page-subtitle">
            Convert between km/L, L/100km and US miles per gallon (mpg).
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
                  placeholder="e.g. 15"
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
                Convert Fuel Efficiency
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
                Higher km/L and mpg mean better efficiency; lower L/100km means better
                efficiency.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
