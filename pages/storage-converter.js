import { useState } from "react";
import Link from "next/link";

const DATA_UNITS = {
  bit: { label: "Bit (b)", factor: 1 / 8 },                // to bytes
  B:   { label: "Byte (B)", factor: 1 },
  KB:  { label: "Kilobyte (KB, 1024 B)", factor: 1024 },
  MB:  { label: "Megabyte (MB, 1024 KB)", factor: 1024 ** 2 },
  GB:  { label: "Gigabyte (GB, 1024 MB)", factor: 1024 ** 3 },
  TB:  { label: "Terabyte (TB, 1024 GB)", factor: 1024 ** 4 },
};

export default function StorageDataConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("MB");
  const [toUnit, setToUnit] = useState("GB");
  const [result, setResult] = useState(null);

  const convert = () => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) {
      setResult(null);
      return;
    }
    const from = DATA_UNITS[fromUnit];
    const to = DATA_UNITS[toUnit];
    const inBytes = v * from.factor;
    const converted = inBytes / to.factor;
    setResult(converted);
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 6 });

  const unitOptions = Object.entries(DATA_UNITS);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Unit Converter</div>
          <h1 className="page-title">Storage / Data Converter</h1>
          <p className="page-subtitle">
            Convert between bits, bytes, KB, MB, GB and TB (binary 1024-based units).
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
                  placeholder="e.g. 1024"
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
                Convert Storage
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
                Internally, everything is converted via bytes. KB/MB/GB/TB use 1024-based
                binary conversions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
