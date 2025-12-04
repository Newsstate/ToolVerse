import { useState, useRef } from "react";
import Link from "next/link";

export default function BlurBackgroundToolPage() {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [blurRadius, setBlurRadius] = useState(10);
  const [subjectX, setSubjectX] = useState("");
  const [subjectY, setSubjectY] = useState("");
  const [subjectW, setSubjectW] = useState("");
  const [subjectH, setSubjectH] = useState("");
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

  const handleBlurBackground = async () => {
    try {
      const { canvas, ctx, img } = await drawImageOnCanvas();
      const { width, height } = canvas;

      // Create blurred version
      const tmpCanvas = document.createElement("canvas");
      tmpCanvas.width = width;
      tmpCanvas.height = height;
      const tmpCtx = tmpCanvas.getContext("2d");
      tmpCtx.filter = `blur(${blurRadius}px)`;
      tmpCtx.drawImage(img, 0, 0);
      tmpCtx.filter = "none";

      // Base: blurred background
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(tmpCanvas, 0, 0);

      // Subject rectangle
      let x = parseInt(subjectX, 10);
      let y = parseInt(subjectY, 10);
      let w = parseInt(subjectW, 10);
      let h = parseInt(subjectH, 10);

      if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
        // default: center 60% sharp
        w = Math.round(width * 0.6);
        h = Math.round(height * 0.6);
        x = Math.round((width - w) / 2);
        y = Math.round((height - h) / 2);
      } else {
        // clamp
        x = Math.max(0, Math.min(x, width));
        y = Math.max(0, Math.min(y, height));
        w = Math.max(1, Math.min(w, width - x));
        h = Math.max(1, Math.min(h, height - y));
      }

      // Draw sharp subject region on top
      ctx.drawImage(img, x, y, w, h, x, y, w, h);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setOutputUrl(url);
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
          <h1 className="page-title">Blur Background Tool</h1>
          <p className="page-subtitle">
            Blur everything except a subject area. Great for portrait-style
            photos with a faux depth-of-field effect.
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
                <label className="label">Blur Strength</label>
                <p className="helper-text">
                  Higher values = stronger background blur.
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 12 }}>{blurRadius}px</span>
                  <input
                    type="range"
                    min="4"
                    max="25"
                    value={blurRadius}
                    onChange={(e) =>
                      setBlurRadius(parseInt(e.target.value, 10))
                    }
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Subject Area (Optional)</label>
                <p className="helper-text">
                  X, Y, Width, Height in pixels. If left empty, the center 60% of
                  the image will stay sharp.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 8,
                    marginTop: 6,
                  }}
                >
                  <input
                    className="input"
                    type="number"
                    placeholder="X"
                    value={subjectX}
                    onChange={(e) => setSubjectX(e.target.value)}
                  />
                  <input
                    className="input"
                    type="number"
                    placeholder="Y"
                    value={subjectY}
                    onChange={(e) => setSubjectY(e.target.value)}
                  />
                  <input
                    className="input"
                    type="number"
                    placeholder="Width"
                    value={subjectW}
                    onChange={(e) => setSubjectW(e.target.value)}
                  />
                  <input
                    className="input"
                    type="number"
                    placeholder="Height"
                    value={subjectH}
                    onChange={(e) => setSubjectH(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn"
                onClick={handleBlurBackground}
                disabled={!previewUrl}
              >
                Apply Background Blur
              </button>

              {outputUrl && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Blurred Background Ready</div>
                  <a
                    href={outputUrl}
                    download={`${getBaseName()}-blur-bg.jpg`}
                    className="nav-pill"
                  >
                    Download Image
                  </a>
                </div>
              )}
            </div>

            {/* Right */}
            <div>
              {previewUrl ? (
                <>
                  <p className="helper-text" style={{ marginBottom: 8 }}>
                    Original preview. Result will blur everything except the
                    subject rectangle.
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
                  Upload a portrait or product photo to blur its background.
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
