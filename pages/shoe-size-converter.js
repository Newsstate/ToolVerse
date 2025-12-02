import { useState } from "react";
import Link from "next/link";

const SHOE_SIZES = [
  { eu: 38, uk: 5, usMen: 6, usWomen: 7.5 },
  { eu: 39, uk: 6, usMen: 7, usWomen: 8.5 },
  { eu: 40, uk: 7, usMen: 8, usWomen: 9.5 },
  { eu: 41, uk: 8, usMen: 9, usWomen: 10.5 },
  { eu: 42, uk: 8.5, usMen: 9.5, usWomen: 11 },
  { eu: 43, uk: 9, usMen: 10, usWomen: 11.5 },
  { eu: 44, uk: 10, usMen: 11, usWomen: 12.5 },
  { eu: 45, uk: 11, usMen: 12, usWomen: 13.5 },
];

const SYSTEMS = {
  eu: "EU",
  uk: "UK",
  usMen: "US Men",
  usWomen: "US Women",
};

function getOptionsForSystem(systemKey) {
  const values = Array.from(
    new Set(SHOE_SIZES.map((s) => s[systemKey]))
  );
  return values.sort((a, b) => a - b);
}

export default function ShoeSizeConverterPage() {
  const [system, setSystem] = useState("eu");
  const [size, setSize] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!size) {
      setResult(null);
      return;
    }
    const numericSize = parseFloat(size);
    const match = SHOE_SIZES.find(
      (s) => s[system] === numericSize
    );
    setResult(match || null);
  };

  const options = getOptionsForSystem(system);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Size Converter</div>
          <h1 className="page-title">Shoe Size Converter</h1>
          <p className="page-subtitle">
            Convert adult shoe sizes between EU, UK, US Men and US Women (approximate
            guide).
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Input */}
            <div>
              <div className="field">
                <label className="label">Your Size System</label>
                <select
                  className="input"
                  value={system}
                  onChange={(e) => {
                    setSystem(e.target.value);
                    setSize("");
                    setResult(null);
                  }}
                >
                  {Object.entries(SYSTEMS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">
                  Select Size ({SYSTEMS[system]})
                </label>
                <select
                  className="input"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="">Choose size…</option>
                  {options.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Convert Shoe Size
              </button>
            </div>

            {/* Result */}
            <div>
              <div className="result-box">
                <div className="result-title">Converted Sizes</div>
                <div className="result-value" style={{ fontSize: "0.95rem" }}>
                  {result ? (
                    <>
                      <div>EU: {result.eu}</div>
                      <div>UK: {result.uk}</div>
                      <div>US Men: {result.usMen}</div>
                      <div>US Women: {result.usWomen}</div>
                    </>
                  ) : (
                    "—"
                  )}
                </div>
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                Size charts vary slightly by brand and region. Use this as a general
                reference.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
