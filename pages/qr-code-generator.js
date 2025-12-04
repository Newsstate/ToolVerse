import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import QRCode from "qrcode";

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [error, setError] = useState("");
  const [pngUrl, setPngUrl] = useState("");
  const canvasRef = useRef(null);

  const handleGenerate = async () => {
    if (!canvasRef.current || !text.trim()) return;
    setError("");
    setPngUrl("");
    try {
      await QRCode.toCanvas(canvasRef.current, text.trim(), {
        width: parseInt(size, 10) || 256,
        margin: 2,
      });
      const canvas = canvasRef.current;
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setPngUrl(url);
      });
    } catch (err) {
      console.error(err);
      setError("Failed to generate QR code. Please try again.");
    }
  };

  useEffect(() => {
    if (!text) {
      setPngUrl("");
    }
  }, [text]);

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Code Tool</div>
          <h1 className="page-title">QR Code Generator</h1>
          <p className="page-subtitle">
            Create QR codes for URLs, text, Wi-Fi names, coupon codes and more.
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
                <label className="label">Text / URL</label>
                <textarea
                  className="input"
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="https://example.com, your text, coupon code, etc."
                />
              </div>

              <div className="field">
                <label className="label">Size (px)</label>
                <input
                  className="input"
                  type="number"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="256"
                />
                <p className="helper-text">
                  256×256 is good for most use cases. Use 512×512 for print.
                </p>
              </div>

              <button
                type="button"
                className="btn"
                onClick={handleGenerate}
                disabled={!text.trim()}
              >
                Generate QR Code
              </button>

              {error && (
                <p className="helper-text" style={{ color: "#c0392b", marginTop: 8 }}>
                  {error}
                </p>
              )}

              {pngUrl && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">QR Code Ready</div>
                  <a
                    href={pngUrl}
                    download="qr-code.png"
                    className="nav-pill"
                  >
                    Download PNG
                  </a>
                </div>
              )}
            </div>

            {/* Right */}
            <div>
              {text.trim() ? (
                <>
                  <p className="helper-text" style={{ marginBottom: 8 }}>
                    Live QR preview:
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
                  Enter some text or a URL to generate a QR code.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
