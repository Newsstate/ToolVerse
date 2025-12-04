import { useState, useRef } from "react";
import Link from "next/link";

export default function PngToJpgConverterPage() {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [jpgUrl, setJpgUrl] = useState("");
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileName(file.name);
    setPreviewUrl(url);
    setJpgUrl("");
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
      const { canvas } = await drawImageOnCanvas();
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setJpgUrl(url);
        },
        "image/jpeg",
        0.9
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Image Tool</div>
          <h1 className="page-title">PNG to JPG Converter</h1>
          <p className="page-subtitle">
            Upload a PNG (or any image) and convert it to a JPG — fast and fully
            browser-based.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Left: Controls */}
            <div>
              <div className="field">
                <label className="label">Upload PNG Image</label>
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
                <label className="label">Convert to JPG</label>
                <p className="helper-text">
                  Transparent areas will become white by default.
                </p>
                <button
                  type="button"
                  className="btn"
                  onClick={handleConvert}
                  disabled={!previewUrl}
                >
                  Convert to JPG
                </button>

                {jpgUrl && (
                  <div className="result-box" style={{ marginTop: 10 }}>
                    <div className="result-title">JPG Ready</div>
                    <a
                      href={jpgUrl}
                      download={`${getBaseName()}-converted.jpg`}
                      className="nav-pill"
                    >
                      Download JPG
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Preview */}
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
                  Upload a PNG image to convert it into JPG.
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
