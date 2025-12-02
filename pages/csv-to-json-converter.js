import { useState } from "react";
import Link from "next/link";

function parseCsvToJson(csv) {
  const lines = csv
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) return [];

  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = lines.slice(1);

  const data = rows.map((line) => {
    const cols = line.split(","); // simple split, no quote handling
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (cols[i] ?? "").trim();
    });
    return obj;
  });

  return data;
}

export default function CsvToJsonConverterPage() {
  const [csvInput, setCsvInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setError("");
      const data = parseCsvToJson(csvInput);
      const json = JSON.stringify(data, null, 2);
      setJsonOutput(json);
    } catch (e) {
      setJsonOutput("");
      setError("Unable to parse CSV. Please check the format.");
    }
  };

  const clearAll = () => {
    setCsvInput("");
    setJsonOutput("");
    setError("");
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Developer Tool</div>
          <h1 className="page-title">CSV to JSON Converter</h1>
          <p className="page-subtitle">
            Convert simple comma-separated values into JSON using the first row as keys.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* CSV input */}
            <div>
              <div className="field">
                <label className="label">CSV Input</label>
                <textarea
                  className="input"
                  rows={12}
                  value={csvInput}
                  onChange={(e) => setCsvInput(e.target.value)}
                  placeholder={'name,age,city\nAlex,30,Mumbai\nRiya,28,Delhi'}
                />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button type="button" className="btn" onClick={convert}>
                  Convert to JSON
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{ background: "transparent", color: "inherit", border: "1px solid var(--border-subtle, #ddd)" }}
                  onClick={clearAll}
                >
                  Clear
                </button>
              </div>
              {error && (
                <p className="helper-text" style={{ marginTop: 8, color: "#d9534f" }}>
                  {error}
                </p>
              )}
            </div>

            {/* JSON output */}
            <div>
              <div className="field">
                <label className="label">JSON Output</label>
                <textarea
                  className="input"
                  rows={12}
                  value={jsonOutput}
                  readOnly
                  placeholder="JSON will appear here…"
                />
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                This basic parser assumes comma-separated values without embedded commas
                or quotes.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
