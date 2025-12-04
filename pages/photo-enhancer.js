import { useState, useRef } from "react";
import Link from "next/link";

export default function PhotoEnhancerPage() {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [enhancedUrl, setEnhancedUrl] = useState("");
  const [strength, setStrength] = useState(1.2);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileName(file.name);
    setPreviewUrl(url);
    setEnhancedUrl("");
  };

  const getBaseName = () =>
    fileName ? fileName.replace(/\.[^/.]+$/, "") : "photo";

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
        resolve({ canvas, ctx, img });
      };
      img.onerror = reject;
      img.src = previewUrl;
    });

  const handleEnhance = async () => {
    try {
      const { canvas, ctx, img } = await drawImageOnCanvas();
      const s = strength; // 1.0–1.8
      ctx.filter = `brightness(${s}) contrast(${s}) saturate(${s})`;
      ctx.drawImage(img, 0, 0);
      ctx.filter = "none";

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setEnhancedUrl(url);
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
          <h1 className="page-title">Photo Enhancer</h1>
          <p className="page-subtitle">
            Boost brightness, contrast, and saturation in one go to make dull
            photos pop.
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
                <label className="label">Upload Photo</label>
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
                <label className="label">Enhancement Strength</label>
                <p className="helper-text">
                  Subtle at 1.0, punchier around 1.4–1.6, very strong at 1.8.
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 12 }}>x{strength.toFixed(1)}</span>
                  <input
                    type="range"
                    min="1"
                    max="1.8"
                    step="0.1"
                    value={strength}
                    onChange={(e) =>
                      setStrength(parseFloat(e.target.value))
                    }
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn"
                onClick={handleEnhance}
                disabled={!previewUrl}
              >
                Enhance Photo
              </button>

              {enhancedUrl && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Enhanced Photo Ready</div>
                  <a
                    href={enhancedUrl}
                    download={`${getBaseName()}-enhanced.jpg`}
                    className="nav-pill"
                  >
                    Download Enhanced JPG
                  </a>
                </div>
              )}
            </div>

            {/* Right */}
            <div>
              {previewUrl ? (
                <>
                  <p className="helper-text" style={{ marginBottom: 8 }}>
                    Original photo preview. Enhanced version will apply global
                    colour & contrast adjustments.
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
                  Upload a photo to enhance its brightness, contrast and
                  saturation.
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
