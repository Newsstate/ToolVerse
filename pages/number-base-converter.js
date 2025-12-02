import { useState } from "react";
import Link from "next/link";

const BASES = {
  2: { label: "Binary (base 2)" },
  8: { label: "Octal (base 8)" },
  10: { label: "Decimal (base 10)" },
  16: { label: "Hexadecimal (base 16)" },
};

export default function NumberBaseConverterPage() {
  const [value, setValue] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [toBase, setToBase] = useState("16");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    if (!value) {
      setResult(null);
      return;
    }

    const from = parseInt(fromBase, 10);
    const to = parseInt(toBase, 10);

    const num = parseInt(value, from);

    if (Number.isNaN(num)) {
      setResult(null);
      setError("Invalid number for the selected input base.");
      return;
    }

    const converted = num.toString(to).toUpperCase();
    setResult({
      converted,
      decimal: num,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 0 });

  const baseOptions = Object.entries(BASES);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Number Base Converter</h1>
          <p className="page-subtitle">
            Convert numbers between binary, octal, decimal and hexadecimal.
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
                <label className="label">Value</label>
                <input
                  className="input"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value.trim())}
                  placeholder="e.g. FF"
                />
              </div>

              <div className="field">
                <label className="label">From Base</label>
                <select
                  className="input"
                  value={fromBase}
                  onChange={(e) => setFromBase(e.target.value)}
                >
                  {baseOptions.map(([key, b]) => (
                    <option key={key} value={key}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">To Base</label>
                <select
                  className="input"
                  value={toBase}
                  onChange={(e) => setToBase(e.target.value)}
                >
                  {baseOptions.map(([key, b]) => (
                    <option key={key} value={key}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              <button type="button" className="btn" onClick={convert}>
                Convert Number
              </button>

              {error && (
                <p className="helper-text" style={{ marginTop: 8, color: "#d9534f" }}>
                  {error}
                </p>
              )}
            </div>

            {/* Result side */}
            <div>
              <div className="result-box">
                <div className="result-title">Converted Value</div>
                <div className="result-value">
                  {result ? result.converted : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Decimal Equivalent</div>
                <div className="result-value">
                  {result ? fmt(result.decimal) : "—"}
                </div>
              </div>

              <p className="helper-text" style={{ marginTop: 8 }}>
                Hex letters are shown in uppercase. Negative numbers are not supported in
                this simple tool.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
