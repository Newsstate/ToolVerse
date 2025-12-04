import { useState, useRef } from "react";
import Link from "next/link";
import JsBarcode from "jsbarcode";

export default function BarcodeGeneratorPage() {
  const [value, setValue] = useState("");
  const [format, setFormat] = useState("CODE128");
  const [error, setError] = useState("");
  const [pngUrl, setPngUrl] = useState("");
  const canvasRef = useRef(null);

  const handleGenerate = () => {
    if (!canvasRef.current || !value.trim()) return;
    setError("");
    setPngUrl("");
    try {
      JsBarcode(canvasRef.current, value.trim(), {
        format,
        lineColor: "#000000",
        width: 2,
        height: 80,
        displayValue: true,
        fontSize: 14,
        margin: 8,
      });

      const canvas = canvasRef.current;
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setPngUrl(url);
      });
    } catch (err) {
      console.error(err);
      setError("Failed to generate barcode. Try a different format/value.");
    }
  };

  const SUPPORTED_FORMATS = [
    { value: "CODE128", label: "CODE128 (general purpose)" },
    { value: "EAN13", label: "EAN-13" },
    { value: "EAN8", label: "EAN-8" },
    { value: "UPC", label: "UPC-A" },
    { value: "CODE39", label: "CODE39" },
    { value: "ITF14", label: "ITF-14" },
  ];

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Code Tool</div>
          <h1 className="page-title">Barcode Generator</h1>
          <p className="page-subtitle">
            Generate scannable barcodes (CODE128, EAN, UPC & more) for labels,
            inventory, packaging, and POS.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Left */}
            <div>
              <div className="field">
                <label className="label">Barcode Value</label>
                <input
                  className="input"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="e.g. 123456789012"
                />
                <p className="helper-text">
                  For EAN/UPC formats, use numeric-only values with correct
                  length.
                </p>
              </div>

              <div className="field">
                <label className="label">Format</label>
                <select
                  className="input"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  {SUPPORTED_FORMATS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="btn"
                onClick={handleGenerate}
                disabled={!value.trim()}
              >
                Generate Barcode
              </button>

              {error && (
                <p className="helper-text" style={{ color: "#c0392b", marginTop: 8 }}>
                  {error}
                </p>
              )}

              {pngUrl && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Barcode Ready</div>
                  <a
                    href={pngUrl}
                    download="barcode.png"
                    className="nav-pill"
                  >
                    Download PNG
                  </a>
                </div>
              )}
            </div>

            {/* Right */}
            <div>
              {value.trim() ? (
                <>
                  <p className="helper-text" style={{ marginBottom: 8 }}>
                    Barcode preview:
                  </p>
                  <div
                    style={{
                      borderRadius: 8,
                      border: "1px solid #eee",
                      padding: 16,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <canvas ref={canvasRef} />
                  </div>
                </>
              ) : (
                <p className="helper-text">
                  Enter a value and choose a format to generate a barcode.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
