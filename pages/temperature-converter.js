import { useState } from "react";
import Link from "next/link";

const TEMP_UNITS = {
  C: { label: "Celsius (°C)" },
  F: { label: "Fahrenheit (°F)" },
  K: { label: "Kelvin (K)" },
};

function toCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return ((value - 32) * 5) / 9;
  if (unit === "K") return value - 273.15;
  return value;
}

function fromCelsius(valueC, unit) {
  if (unit === "C") return valueC;
  if (unit === "F") return (valueC * 9) / 5 + 32;
  if (unit === "K") return valueC + 273.15;
  return valueC;
}

export default function TemperatureConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("C");
  const [toUnit, setToUnit] = useState("F");
  const [result, setResult] = useState(null);

  const convert = () => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) {
      setResult(null);
      return;
    }
    const c = toCelsius(v, fromUnit);
    const converted = fromCelsius(c, toUnit);
    setResult(converted);
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 3 });

  const unitOptions = Object.entries(TEMP_UNITS);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Unit Converter</div>
          <h1 className="page-title">Temperature Converter</h1>
          <p className="page-subtitle">
            Convert temperatures between Celsius, Fahrenheit and Kelvin accurately.
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
                  placeholder="e.g. 37"
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
                Convert Temperature
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
                Uses standard formulas, e.g. °F = (°C × 9/5) + 32, K = °C + 273.15.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
