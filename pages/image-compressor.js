// /pages/image-compressor.js
import { useState, useRef } from "react";
import Link from "next/link";

export default function ImageToolsPage() {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [quality, setQuality] = useState(0.7);

  const [compressedUrl, setCompressedUrl] = useState("");
  const [resizedUrl, setResizedUrl] = useState("");
  const [croppedUrl, setCroppedUrl] = useState("");
  const [pngUrl, setPngUrl] = useState("");

  const [resizeWidth, setResizeWidth] = useState("");
  const [resizeHeight, setResizeHeight] = useState("");
  const [cropX, setCropX] = useState("");
  const [cropY, setCropY] = useState("");
  const [cropWidth, setCropWidth] = useState("");
  const [cropHeight, setCropHeight] = useState("");

  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setFileName(file.name);
    setPreviewUrl(url);

    // reset outputs
    setCompressedUrl("");
    setResizedUrl("");
    setCroppedUrl("");
    setPngUrl("");
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
        resolve({ img, canvas, ctx });
      };
      img.onerror = reject;
      img.src = previewUrl;
    });

  // 1. Image Compressor
  const handleCompress = async () => {
    try {
      const { canvas } = await drawImageOnCanvas();
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setCompressedUrl(url);
        },
        "image/jpeg",
        quality
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 2. Image Resizer
  const handleResize = async () => {
    try {
      if (!resizeWidth && !resizeHeight) return;

      const { img } = await drawImageOnCanvas();
      let targetW = parseInt(resizeWidth, 10);
      let targetH = parseInt(resizeHeight, 10);
      const aspect = img.width / img.height;

      if (!targetW && targetH) {
        targetW = Math.round(targetH * aspect);
      } else if (!targetH && targetW) {
        targetH = Math.round(targetW / aspect);
      }

      if (!targetW || !targetH) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = targetW;
      canvas.height = targetH;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, targetW, targetH);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setResizedUrl(url);
      }, "image/png");
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Image Cropper
  const handleCrop = async () => {
    try {
      const { img } = await drawImageOnCanvas();

      let x = parseInt(cropX || "0", 10);
      let y = parseInt(cropY || "0", 10);
      let w = parseInt(cropWidth || img.width, 10);
      let h = parseInt(cropHeight || img.height, 10);

      x = Math.max(0, Math.min(x, img.width));
      y = Math.max(0, Math.min(y, img.height));
      w = Math.max(1, Math.min(w, img.width - x));
      h = Math.max(1, Math.min(h, img.height - y));

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = w;
      canvas.height = h;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setCroppedUrl(url);
      }, "image/png");
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Image → PDF (via print)
  const handleImageToPdf = () => {
    if (!previewUrl || typeof window === "undefined") return;

    const win = window.open("", "_blank");
    if (!win) return;

    win.document.write(`
      <html>
        <head>
          <title>${getBaseName()}-pdf</title>
        </head>
        <body style="margin:0;padding:0;">
          <img src="${previewUrl}" style="width:100%;height:auto;display:block;" />
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  // 5. JPG → PNG converter
  const handleJpgToPng = async () => {
    try {
      const { canvas } = await drawImageOnCanvas();
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setPngUrl(url);
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
          <h1 className="page-title">Image Compressor & Editor</h1>
          <p className="page-subtitle">
            Compress, resize, crop, convert to PDF, and convert JPG to PNG —
            everything runs in your browser. Safe to embed anywhere.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Left: Inputs & Actions */}
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

              {/* Compressor */}
              <div className="field">
                <label className="label">Image Compressor (JPG)</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 12 }}>
                    Quality:{" "}
                    <strong>{Math.round(quality * 100)}%</strong>
                  </span>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(e) =>
                      setQuality(parseFloat(e.target.value))
                    }
                    style={{ flex: 1 }}
                  />
                </div>
                <button
                  type="button"
                  className="btn"
                  style={{ marginTop: 8 }}
                  onClick={handleCompress}
                  disabled={!previewUrl}
                >
                  Compress Image
                </button>
                {compressedUrl && (
                  <div className="result-box" style={{ marginTop: 8 }}>
                    <div className="result-title">Compressed JPG Ready</div>
                    <a
                      href={compressedUrl}
                      download={`${getBaseName()}-compressed.jpg`}
                      className="nav-pill"
                    >
                      Download Compressed JPG
                    </a>
                  </div>
                )}
              </div>

              {/* Resizer */}
              <div className="field">
                <label className="label">Image Resizer</label>
                <p className="helper-text">
                  Set width and/or height (px). Leave one empty to keep aspect
                  ratio.
                </p>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <input
                    className="input"
                    type="number"
                    placeholder="Width"
                    value={resizeWidth}
                    onChange={(e) => setResizeWidth(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <input
                    className="input"
                    type="number"
                    placeholder="Height"
                    value={resizeHeight}
                    onChange={(e) => setResizeHeight(e.target.value)}
                    style={{ flex: 1 }}
                  />
                </div>
                <button
                  type="button"
                  className="btn"
                  style={{ marginTop: 8 }}
                  onClick={handleResize}
                  disabled={!previewUrl}
                >
                  Resize Image
                </button>
                {resizedUrl && (
                  <div className="result-box" style={{ marginTop: 8 }}>
                    <div className="result-title">Resized PNG Ready</div>
                    <a
                      href={resizedUrl}
                      download={`${getBaseName()}-resized.png`}
                      className="nav-pill"
                    >
                      Download Resized PNG
                    </a>
                  </div>
                )}
              </div>

              {/* Cropper */}
              <div className="field">
                <label className="label">Image Cropper</label>
                <p className="helper-text">
                  Optional crop area in px. Defaults to full image.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 8,
                    marginTop: 6
                  }}
                >
                  <input
                    className="input"
                    type="number"
                    placeholder="X"
                    value={cropX}
                    onChange={(e) => setCropX(e.target.value)}
                  />
                  <input
                    className="input"
                    type="number"
                    placeholder="Y"
                    value={cropY}
                    onChange={(e) => setCropY(e.target.value)}
                  />
                  <input
                    className="input"
                    type="number"
                    placeholder="Width"
                    value={cropWidth}
                    onChange={(e) => setCropWidth(e.target.value)}
                  />
                  <input
                    className="input"
                    type="number"
                    placeholder="Height"
                    value={cropHeight}
                    onChange={(e) => setCropHeight(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn"
                  style={{ marginTop: 8 }}
                  onClick={handleCrop}
                  disabled={!previewUrl}
                >
                  Crop Image
                </button>
                {croppedUrl && (
                  <div className="result-box" style={{ marginTop: 8 }}>
                    <div className="result-title">Cropped PNG Ready</div>
                    <a
                      href={croppedUrl}
                      download={`${getBaseName()}-cropped.png`}
                      className="nav-pill"
                    >
                      Download Cropped PNG
                    </a>
                  </div>
                )}
              </div>

              {/* JPG → PNG */}
              <div className="field">
                <label className="label">JPG to PNG Converter</label>
                <p className="helper-text">
                  Convert your image to PNG format (browser side).
                </p>
                <button
                  type="button"
                  className="btn"
                  onClick={handleJpgToPng}
                  disabled={!previewUrl}
                >
                  Convert to PNG
                </button>
                {pngUrl && (
                  <div className="result-box" style={{ marginTop: 8 }}>
                    <div className="result-title">PNG Ready</div>
                    <a
                      href={pngUrl}
                      download={`${getBaseName()}-converted.png`}
                      className="nav-pill"
                    >
                      Download PNG
                    </a>
                  </div>
                )}
              </div>

              {/* Image → PDF */}
              <div className="field">
                <label className="label">Image to PDF Converter</label>
                <p className="helper-text">
                  Opens print dialog—choose <strong>Save as PDF</strong> in
                  your browser.
                </p>
                <button
                  type="button"
                  className="btn"
                  onClick={handleImageToPdf}
                  disabled={!previewUrl}
                >
                  Convert to PDF
                </button>
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
                      maxWidth: "100%"
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
                  Upload an image on the left to start compressing, resizing,
                  cropping or converting.
                </p>
              )}
            </div>
          </div>

          {/* Hidden canvas */}
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
