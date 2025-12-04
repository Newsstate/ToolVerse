import { useState, useRef } from "react";
import Link from "next/link";

export default function WebpConverterPage() {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [webpUrl, setWebpUrl] = useState("");
  const [error, setError] = useState("");
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileName(file.name);
    setPreviewUrl(url);
    setWebpUrl("");
    setError("");
  };

  const getBaseName = () =>
    fileName ? fileName.replace(/\.[^/.]+$/, "") : "image";

  const drawImageOnCanvas = () =>
    new Promise((resolve, reject) => {
      if (!previewUrl || !canvasRef.current) {
        reject(new Error("No image loaded"));
        return;
      }
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve({ canvas });
      };
      img.onerror = reject;
      img.src = previewUrl;
    });

  const handleConvert = async () => {
    try {
      setError("");
      const { canvas } = await drawImageOnCanvas();
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError(
              "WebP conversion is not supported in this browser. Try Chrome or Edge."
            );
            return;
          }
          const url = URL.createObjectURL(blob);
          setWebpUrl(url);
        },
        "image/webp",
        0.9
      );
    } catch (err) {
      console.error(err);
      setError("Something went wrong while converting.");
    }
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Image Tool</div>
          <h1 className="page-title">WebP Converter</h1>
          <p className="page-subtitle">
            Convert JPG, PNG, or other formats to modern WebP for faster web
            performance.
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
                <label className="label">Upload Image</label>
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
                <label className="label">Convert to WebP</label>
                <p className="helper-text">
                  Works best in browsers with WebP support (Chrome, Edge, etc.).
                </p>
                <button
                  type="button"
                  className="btn"
                  onClick={handleConvert}
                  disabled={!previewUrl}
                >
                  Convert to WebP
                </button>

                {error && (
                  <p className="helper-text" style={{ color: "#c0392b" }}>
                    {error}
                  </p>
                )}

                {webpUrl && (
                  <div className="result-box" style={{ marginTop: 10 }}>
                    <div className="result-title">WebP Ready</div>
                    <a
                      href={webpUrl}
                      download={`${getBaseName()}.webp`}
                      className="nav-pill"
                    >
                      Download WebP
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right */}
            <div>
              {previewUrl ? (
                <>
                  <p className="helper-text" style={{ marginBottom: 8 }}>
                    Original image preview:
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
                      src={previewUrl}
                      alt="Preview"
                      style={{ width: "100%", display: "block" }}
                    />
                  </div>
                </>
              ) : (
                <p className="helper-text">
                  Upload an image on the left to convert it to WebP.
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
