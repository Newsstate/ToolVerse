import { useState, useRef } from "react";
import Link from "next/link";

export default function ImageColorPickerPage() {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [pickedColor, setPickedColor] = useState(null);
  const [pickedPosition, setPickedPosition] = useState(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileName(file.name);
    setPreviewUrl(url);
    setPickedColor(null);
    setPickedPosition(null);
  };

  const handleImageClick = (e) => {
    if (!canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = imgRef.current;
    const rect = img.getBoundingClientRect();

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor(clickX * scaleX);
    const y = Math.floor(clickY * scaleY);

    const data = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b, a] = data;

    const toHex = (n) => n.toString(16).padStart(2, "0").toUpperCase();
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    setPickedColor({ r, g, b, a, hex });
    setPickedPosition({ x, y });
  };

  const handleImageLoad = () => {
    if (!canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Image Tool</div>
          <h1 className="page-title">Image Color Picker</h1>
          <p className="page-subtitle">
            Upload an image and click anywhere to pick exact HEX & RGB values —
            perfect for designers and brand work.
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
                <label className="label">Picked Color</label>
                {pickedColor ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 4,
                        border: "1px solid #ddd",
                        backgroundColor: pickedColor.hex,
                      }}
                    />
                    <div style={{ fontSize: "0.85rem" }}>
                      <div>
                        <strong>{pickedColor.hex}</strong>
                      </div>
                      <div>
                        RGB: {pickedColor.r}, {pickedColor.g}, {pickedColor.b}
                      </div>
                      {pickedPosition && (
                        <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                          At: ({pickedPosition.x}, {pickedPosition.y})
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="helper-text">
                    Upload an image and click on it to pick a color.
                  </p>
                )}
              </div>
            </div>

            {/* Right */}
            <div>
              {previewUrl ? (
                <>
                  <p className="helper-text" style={{ marginBottom: 8 }}>
                    Click anywhere on the image to pick a color.
                  </p>
                  <div
                    style={{
                      borderRadius: 8,
                      border: "1px solid #eee",
                      overflow: "hidden",
                      maxWidth: "100%",
                      cursor: "crosshair",
                    }}
                  >
                    <img
                      ref={imgRef}
                      src={previewUrl}
                      alt="Preview"
                      onClick={handleImageClick}
                      onLoad={handleImageLoad}
                      style={{ width: "100%", display: "block" }}
                    />
                  </div>
                </>
              ) : (
                <p className="helper-text">
                  Upload an image to start sampling colors.
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
