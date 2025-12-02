import { useState } from "react";
import Link from "next/link";

const TIME_UNITS = {
  s: { label: "Seconds (s)", factor: 1 }, // base
  min: { label: "Minutes (min)", factor: 60 },
  h: { label: "Hours (h)", factor: 3600 },
  day: { label: "Days", factor: 86400 },
  week: { label: "Weeks", factor: 604800 },
};

export default function TimeConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("min");
  const [toUnit, setToUnit] = useState("s");
  const [result, setResult] = useState(null);

  const convert = () => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) {
      setResult(null);
      return;
    }
    const from = TIME_UNITS[fromUnit];
    const to = TIME_UNITS[toUnit];
    const inSeconds = v * from.factor;
    const converted = inSeconds / to.factor;
    setResult(converted);
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const unitOptions = Object.entries(TIME_UNITS);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Unit Converter</div>
          <h1 className="page-title">Time Converter</h1>
          <p className="page-subtitle">
            Convert time between seconds, minutes, hours, days and weeks in one step.
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
                  placeholder="e.g. 120"
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
                Convert Time
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
                Internally all conversions go through seconds as the base time unit.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
