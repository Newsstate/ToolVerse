import { useState } from "react";
import Link from "next/link";

const RING_SIZES = [
  { us: 5,   uk: "J½",  diameter: 15.7, circumference: 49.3 },
  { us: 6,   uk: "L½",  diameter: 16.5, circumference: 51.8 },
  { us: 7,   uk: "N½",  diameter: 17.3, circumference: 54.4 },
  { us: 8,   uk: "P½",  diameter: 18.1, circumference: 57.0 },
  { us: 9,   uk: "R½",  diameter: 18.9, circumference: 59.5 },
  { us: 10,  uk: "T½",  diameter: 19.8, circumference: 62.1 },
  { us: 11,  uk: "V½",  diameter: 20.6, circumference: 64.6 },
  { us: 12,  uk: "X½",  diameter: 21.4, circumference: 67.2 },
];

const SYSTEMS = {
  us: "US Size",
  uk: "UK Size",
  diameter: "Inner Diameter (mm)",
  circumference: "Inner Circumference (mm)",
};

function getOptionsForSystem(systemKey) {
  const values = Array.from(
    new Set(RING_SIZES.map((s) => s[systemKey]))
  );
  if (systemKey === "uk") {
    return values; // already strings
  }
  return values.sort((a, b) => (a > b ? 1 : -1));
}

export default function RingSizeConverterPage() {
  const [system, setSystem] = useState("us");
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!value) {
      setResult(null);
      return;
    }

    let match = null;
    if (system === "us") {
      const n = parseFloat(value);
      match = RING_SIZES.find((s) => s.us === n);
    } else if (system === "uk") {
      match = RING_SIZES.find((s) => s.uk === value);
    } else if (system === "diameter") {
      const n = parseFloat(value);
      match = RING_SIZES.find((s) => s.diameter === n);
    } else if (system === "circumference") {
      const n = parseFloat(value);
      match = RING_SIZES.find((s) => s.circumference === n);
    }

    setResult(match || null);
  };

  const options = getOptionsForSystem(system);

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Size Converter</div>
          <h1 className="page-title">Ring Size Converter</h1>
          <p className="page-subtitle">
            Convert ring sizes between US, UK and approximate inner diameter /
            circumference in millimetres.
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
                    setValue("");
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
                  Select {SYSTEMS[system]}
                </label>
                <select
                  className="input"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                >
                  <option value="">Choose…</option>
                  {options.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Convert Ring Size
              </button>
            </div>

            {/* Result */}
            <div>
              <div className="result-box">
                <div className="result-title">Converted Sizes</div>
                <div className="result-value" style={{ fontSize: "0.95rem" }}>
                  {result ? (
                    <>
                      <div>US: {result.us}</div>
                      <div>UK: {result.uk}</div>
                      <div>Diameter: {fmt(result.diameter)} mm</div>
                      <div>
                        Circumference: {fmt(result.circumference)} mm
                      </div>
                    </>
                  ) : (
                    "—"
                  )}
                </div>
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                Sizing can vary by jeweller; use this as an approximate guide and confirm
                with a physical ring sizer for exact fit.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
