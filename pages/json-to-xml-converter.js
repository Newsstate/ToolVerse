import { useState } from "react";
import Link from "next/link";

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function valueToXml(key, value, indentLevel) {
  const indent = "  ".repeat(indentLevel);
  const keySafe = key || "item";

  if (value === null || value === undefined) {
    return `${indent}<${keySafe} />\n`;
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return `${indent}<${keySafe}>${escapeXml(value)}</${keySafe}>\n`;
  }

  if (Array.isArray(value)) {
    let xml = "";
    value.forEach((item) => {
      xml += valueToXml(keySafe, item, indentLevel);
    });
    return xml;
  }

  // object
  let xml = `${indent}<${keySafe}>\n`;
  for (const childKey in value) {
    if (Object.prototype.hasOwnProperty.call(value, childKey)) {
      xml += valueToXml(childKey, value[childKey], indentLevel + 1);
    }
  }
  xml += `${indent}</${keySafe}>\n`;
  return xml;
}

function jsonToXmlString(json) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n`;
  if (Array.isArray(json)) {
    json.forEach((item) => {
      xml += valueToXml("item", item, 1);
    });
  } else if (typeof json === "object" && json !== null) {
    for (const key in json) {
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        xml += valueToXml(key, json[key], 1);
      }
    }
  } else {
    xml += valueToXml("value", json, 1);
  }
  xml += `</root>\n`;
  return xml;
}

export default function JsonToXmlConverterPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [xmlOutput, setXmlOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setError("");
      const parsed = JSON.parse(jsonInput);
      const xml = jsonToXmlString(parsed);
      setXmlOutput(xml);
    } catch (e) {
      setXmlOutput("");
      setError("Invalid JSON. Please check your syntax.");
    }
  };

  const clearAll = () => {
    setJsonInput("");
    setXmlOutput("");
    setError("");
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Developer Tool</div>
          <h1 className="page-title">JSON to XML Converter</h1>
          <p className="page-subtitle">
            Paste JSON, get a simple XML representation with a root element.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* JSON input */}
            <div>
              <div className="field">
                <label className="label">JSON Input</label>
                <textarea
                  className="input"
                  rows={12}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='e.g. { "name": "Alex", "age": 30 }'
                />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button type="button" className="btn" onClick={convert}>
                  Convert to XML
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

            {/* XML output */}
            <div>
              <div className="field">
                <label className="label">XML Output</label>
                <textarea
                  className="input"
                  rows={12}
                  value={xmlOutput}
                  readOnly
                  placeholder="XML will appear here…"
                />
              </div>
              <p className="helper-text" style={{ marginTop: 8 }}>
                Nested objects become nested elements. Arrays become repeated elements
                inside the same parent.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
