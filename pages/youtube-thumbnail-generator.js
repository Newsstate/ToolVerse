import { useState, useRef } from "react";
import Link from "next/link";

export default function YoutubeThumbnailGeneratorPage() {
  const [title, setTitle] = useState("YOUR VIDEO TITLE");
  const [subtitle, setSubtitle] = useState("Quick hook / tagline here");
  const [bgColor, setBgColor] = useState("#0F172A"); // slate-900
  const [accentColor, setAccentColor] = useState("#FACC15"); // amber
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [uploadedBg, setUploadedBg] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const canvasRef = useRef(null);
  const bgImgRef = useRef(null);

  const WIDTH = 1280;
  const HEIGHT = 720;

  const handleBgUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedBg(url);
  };

  const generateThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if (uploadedBg && bgImgRef.current?.complete) {
      const img = bgImgRef.current;
      const ratio = Math.max(
        WIDTH / img.naturalWidth,
        HEIGHT / img.naturalHeight
      );
      const newW = img.naturalWidth * ratio;
      const newH = img.naturalHeight * ratio;
      const offsetX = (WIDTH - newW) / 2;
      const offsetY = (HEIGHT - newH) / 2;
      ctx.drawImage(img, offsetX, offsetY, newW, newH);
      // slight overlay for readability
      ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    // accent bar
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, HEIGHT * 0.7, WIDTH, HEIGHT * 0.3);

    // title text
    ctx.fillStyle = textColor;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    const titleFontSize = 64;
    ctx.font = `800 ${titleFontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

    const padding = 80;
    const titleLines = wrapText(
      ctx,
      title || "YOUR VIDEO TITLE",
      WIDTH - padding * 2
    );

    let currentY = padding;

    titleLines.forEach((line) => {
      ctx.fillText(line, padding, currentY);
      currentY += titleFontSize + 10;
    });

    // subtitle
    if (subtitle.trim()) {
      const subFontSize = 34;
      ctx.font = `600 ${subFontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      ctx.fillStyle = "#0F172A";
      const subLines = wrapText(
        ctx,
        subtitle,
        WIDTH - padding * 2
      );
      let subY = HEIGHT * 0.72;
      subLines.forEach((line) => {
        ctx.fillText(line, padding, subY);
        subY += subFontSize + 6;
      });
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setThumbUrl(url);
      },
      "image/jpeg",
      0.9
    );
  };

  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const { width } = ctx.measureText(testLine);
      if (width > maxWidth) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) lines.push(currentLine);
    return lines;
  };

  const downloadName = (title || "youtube-thumbnail")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">YouTube Tool</div>
          <h1 className="page-title">YouTube Thumbnail Generator</h1>
          <p className="page-subtitle">
            Create 1280×720 thumbnails with bold titles, subtitles and optional
            background images — perfect for YouTube uploads.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Controls */}
            <div>
              <div className="field">
                <label className="label">Title</label>
                <textarea
                  className="input"
                  rows={3}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="YOUR VIDEO TITLE"
                />
              </div>

              <div className="field">
                <label className="label">Subtitle / Hook</label>
                <input
                  className="input"
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Short supporting line"
                />
              </div>

              <div className="field">
                <label className="label">Background Options</label>
                <p className="helper-text">
                  Use a solid color or upload a background image (image will be
                  darkened slightly).
                </p>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <span className="helper-text">Solid Background</span>
                    <input
                      className="input"
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="helper-text">Accent Bar</span>
                    <input
                      className="input"
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="helper-text">Title Text</span>
                    <input
                      className="input"
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  className="input"
                  type="file"
                  accept="image/*"
                  onChange={handleBgUpload}
                />
                <p className="helper-text" style={{ marginTop: 4 }}>
                  Optional: upload a background image for a more dynamic look.
                </p>
              </div>

              <button
                type="button"
                className="btn"
                onClick={generateThumbnail}
              >
                Generate Thumbnail (1280×720)
              </button>

              {thumbUrl && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Thumbnail Ready</div>
                  <a
                    href={thumbUrl}
                    download={`${downloadName || "youtube-thumbnail"}.jpg`}
                    className="nav-pill"
                  >
                    Download JPG
                  </a>
                </div>
              )}
            </div>

            {/* Preview */}
            <div>
              <p className="helper-text" style={{ marginBottom: 8 }}>
                Preview (scaled down):
              </p>
              <div
                style={{
                  borderRadius: 8,
                  border: "1px solid #eee",
                  padding: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#f9fafb",
                }}
              >
                {thumbUrl ? (
                  <img
                    src={thumbUrl}
                    alt="YouTube thumbnail preview"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                ) : (
                  <span className="helper-text">
                    Fill title/subtitle, adjust colors and click &quot;Generate
                    Thumbnail&quot;.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* hidden canvas & bg img */}
          <canvas
            ref={canvasRef}
            style={{ display: "none" }}
            aria-hidden="true"
          />
          {uploadedBg && (
            <img
              ref={bgImgRef}
              src={uploadedBg}
              alt="bg"
              style={{ display: "none" }}
              onLoad={() => {
                // nothing, used only when generateThumbnail runs
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
