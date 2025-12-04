import { useState, useRef } from "react";
import Link from "next/link";

const SIZES = [16, 32, 48, 64];

export default function FaviconGeneratorPage() {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [size, setSize] = useState(32);
  const [faviconUrl, setFaviconUrl] = useState("");
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileName(file.name);
    setPreviewUrl(url);
    setFaviconUrl("");
  };

  const getBaseName = () =>
    fileName ? fileName.replace(/\.[^/.]+$/, "") : "favicon";

  const handleGenerate = () => {
    if (!canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    const targetSize = parseInt(size, 10);
    canvas.width = targetSize;
    canvas.height = targetSize;

    ctx.clearRect(0, 0, targetSize, targetSize);

    // Fit image into square canvas (contain)
    const ratio = Math.min(
      targetSize / img.naturalWidth,
      targetSize / img.naturalHeight
    );
    const newW = img.naturalWidth * ratio;
    const newH = img.naturalHeight * ratio;
    const offsetX = (targetSize - newW) / 2;
    const offsetY = (targetSize - newH) / 2;

    ctx.drawImage(img, offsetX, offsetY, newW, newH);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setFaviconUrl(url);
      },
      "image/png",
      1
    );
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Image Tool</div>
          <h1 className="page-title">Favicon Generator</h1>
          <p className="page-subtitle">
            Turn any logo or image into a favicon-sized PNG icon for your
            website (16×16, 32×32, etc.).
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
                <label className="label">Upload Logo / Icon</label>
                <input
                  className="input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {fileName && (
                  <p className="helper-text" style={{ marginTop: 6 }}>
                    Selected: <strong>{fileName}</strong>
                  </p>
                )}
              </div>

              <div className="field">
                <label className="label">Favicon Size</label>
                <select
                  className="input"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s} × {s} px
                    </option>
                  ))}
                </select>
                <p className="helper-text">
                  You can generate multiple sizes by changing the dropdown and
                  clicking again.
                </p>
              </div>

              <button
                type="button"
                className="btn"
                onClick={handleGenerate}
                disabled={!previewUrl}
              >
                Generate Favicon PNG
              </button>

              {faviconUrl && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">
                    Favicon ({size}×{size}) Ready
                  </div>
                  <a
                    href={faviconUrl}
                    download={`${getBaseName()}-${size}x${size}.png`}
                    className="nav-pill"
                  >
                    Download PNG
                  </a>
                </div>
              )}
            </div>

            {/* Right */}
            <div>
              {previewUrl ? (
                <>
                  <p className="helper-text" style={{ marginBottom: 8 }}>
                    Preview of source image. Favicon will fit inside a square.
                  </p>
                  <div
                    style={{
                      borderRadius: 8,
                      border: "1px solid #eee",
                      overflow: "hidden",
                      maxWidth: "100%",
                    }}
                  >
                    <img
                      ref={imgRef}
                      src={previewUrl}
                      alt="Preview"
                      style={{ width: "100%", display: "block" }}
                    />
                  </div>
                </>
              ) : (
                <p className="helper-text">
                  Upload a logo or image to generate favicon PNGs.
                </p>
              )}
            </div>
          </div>

          <canvas
            ref={canvasRef}
            style={{ display: "none" }}
            aria-hidden="true"
          />
        </div>
      </main>
    </div>
  );
}
