import { useState, useRef } from "react";
import Link from "next/link";

export default function MemeGeneratorPage() {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [memeUrl, setMemeUrl] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(40);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileName(file.name);
    setPreviewUrl(url);
    setMemeUrl("");
  };

  const getBaseName = () =>
    fileName ? fileName.replace(/\.[^/.]+$/, "") : "meme";

  const handleGenerate = () => {
    if (!canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    const width = img.naturalWidth;
    const height = img.naturalHeight;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const fs = parseInt(fontSize, 10) || 40;
    ctx.font = `${fs}px Impact, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.lineWidth = Math.max(2, fs / 10);
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#fff";

    const topY = fs + 10;
    if (topText.trim()) {
      ctx.strokeText(topText.toUpperCase(), width / 2, topY);
      ctx.fillText(topText.toUpperCase(), width / 2, topY);
    }

    const bottomY = height - 10;
    if (bottomText.trim()) {
      ctx.strokeText(bottomText.toUpperCase(), width / 2, bottomY);
      ctx.fillText(bottomText.toUpperCase(), width / 2, bottomY);
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setMemeUrl(url);
      },
      "image/jpeg",
      0.9
    );
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Image Tool</div>
          <h1 className="page-title">Meme Generator</h1>
          <p className="page-subtitle">
            Upload an image, add top &amp; bottom text, and download a classic
            meme-style image.
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
                <label className="label">Top Text</label>
                <input
                  className="input"
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="WHEN YOUR CODE FINALLY WORKS"
                />
              </div>

              <div className="field">
                <label className="label">Bottom Text</label>
                <input
                  className="input"
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="BUT YOU DON'T KNOW WHY 😅"
                />
              </div>

              <div className="field">
                <label className="label">Font Size</label>
                <input
                  className="input"
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  placeholder="40"
                />
                <p className="helper-text">
                  Larger images may look better with 60–80px.
                </p>
              </div>

              <button
                type="button"
                className="btn"
                onClick={handleGenerate}
                disabled={!previewUrl}
              >
                Generate Meme
              </button>

              {memeUrl && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Meme Ready</div>
                  <a
                    href={memeUrl}
                    download={`${getBaseName()}-meme.jpg`}
                    className="nav-pill"
                  >
                    Download Meme
                  </a>
                </div>
              )}
            </div>

            {/* Right */}
            <div>
              {previewUrl ? (
                <>
                  <p className="helper-text" style={{ marginBottom: 8 }}>
                    Preview of base image. Generated meme will use full
                    resolution.
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
                  Upload an image and add text to create a meme.
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
