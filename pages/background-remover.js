import { useState, useRef } from "react";
import Link from "next/link";

export default function BackgroundRemoverPage() {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [tolerance, setTolerance] = useState(30);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileName(file.name);
    setPreviewUrl(url);
    setOutputUrl("");
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
        resolve({ canvas, ctx });
      };
      img.onerror = reject;
      img.src = previewUrl;
    });

  const handleRemoveBackground = async () => {
    try {
      const { canvas, ctx } = await drawImageOnCanvas();
      const { width, height } = canvas;
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      const r0 = data[0];
      const g0 = data[1];
      const b0 = data[2];

      const threshold = tolerance * 3;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const diff =
          Math.abs(r - r0) + Math.abs(g - g0) + Math.abs(b - b0);

        if (diff < threshold) {
          data[i + 3] = 0; // make transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setOutputUrl(url);
      }, "image/png");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Image Tool</div>
          <h1 className="page-title">Background Remover</h1>
          <p className="page-subtitle">
            Remove solid backgrounds by making them transparent. Best for
            product shots, profile photos on plain backgrounds, etc.
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
                <label className="label">Background Similarity</label>
                <p className="helper-text">
                  Uses the top-left pixel as background color. Increase
                  tolerance for more aggressive removal.
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 12 }}>Tolerance:</span>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={tolerance}
                    onChange={(e) =>
                      setTolerance(parseInt(e.target.value, 10))
                    }
                    style={{ flex: 1 }}
                  />
                  <span style={{ fontSize: 12 }}>
                    <strong>{tolerance}</strong>
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn"
                onClick={handleRemoveBackground}
                disabled={!previewUrl}
              >
                Remove Background
              </button>

              {outputUrl && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Transparent PNG Ready</div>
                  <a
                    href={outputUrl}
                    download={`${getBaseName()}-no-bg.png`}
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
                    Original preview (left). Result will have transparent
                    background.
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
                  Upload an image with a mostly solid background to get the best
                  results.
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
