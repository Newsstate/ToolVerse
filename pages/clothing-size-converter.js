import { useState } from "react";
import Link from "next/link";

const CLOTHING_SIZES = [
  { intl: "XS", us: 2, uk: 6, eu: 34 },
  { intl: "S",  us: 4, uk: 8, eu: 36 },
  { intl: "M",  us: 6, uk: 10, eu: 38 },
  { intl: "L",  us: 8, uk: 12, eu: 40 },
  { intl: "XL", us: 10, uk: 14, eu: 42 },
];

const SYSTEMS = {
  intl: "International (XS–XL)",
  us: "US",
  uk: "UK",
  eu: "EU",
};

function getOptionsForSystem(systemKey) {
  const values = Array.from(new Set(CLOTHING_SIZES.map((s) => s[systemKey])));
  if (systemKey === "intl") return values;
  return values.sort((a, b) => a - b);
}

export default function ClothingSizeConverterPage() {
  const [system, setSystem] = useState("intl");
  const [size, setSize] = useState("");
  const [result, setResult] = useState(null);

  const convert = () => {
    if (!size) {
      setResult(null);
      return;
    }

    let match = null;
    if (system === "intl") {
      match = CLOTHING_SIZES.find((s) => s.intl === size);
    } else {
      const n = parseFloat(size);
      match = CLOTHING_SIZES.find((s) => s[system] === n);
    }
    setResult(match || null);
  };

  const options = getOptionsForSystem(system);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Size Converter</div>
          <h1 className="page-title">Clothing Size Converter</h1>
          <p className="page-subtitle">
            Convert approximate women’s clothing sizes between International, US, UK and EU.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Input side */}
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
                    <option key={key} value={key}>{label}</option>
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
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <button type="button" className="btn" onClick={convert}>
                Convert Clothing Size
              </button>
            </div>

            {/* Result side */}
            <div>
              <div className="result-box">
                <div className="result-title">Converted Sizes</div>
                <div className="result-value" style={{ fontSize: "0.95rem" }}>
                  {result ? (
                    <>
                      <div>International: {result.intl}</div>
                      <div>US: {result.us}</div>
                      <div>UK: {result.uk}</div>
                      <div>EU: {result.eu}</div>
                    </>
                  ) : (
                    "—"
                  )}
                </div>
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                Sizes vary by brand. Use this as a rough guide, not an exact fitting tool.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
