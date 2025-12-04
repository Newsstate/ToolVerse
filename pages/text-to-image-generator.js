import { useState, useRef } from "react";
import Link from "next/link";

export default function TextToImageGeneratorPage() {
  const [text, setText] = useState("Write your quote, heading, or social post here.");
  const [subtitle, setSubtitle] = useState("");
  const [bgColor, setBgColor] = useState("#1E293B");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [imageUrl, setImageUrl] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const [alignment, setAlignment] = useState("center");
  const canvasRef = useRef(null);

  const wrapText = (ctx, textValue, maxWidth) => {
    const words = textValue.split(" ");
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

  const generateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const w = parseInt(width, 10) || 1080;
    const h = parseInt(height, 10) || 1080;
    const fs = parseInt(fontSize, 10) || 48;

    canvas.width = w;
    canvas.height = h;

    // background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    // main text
    ctx.fillStyle = textColor;
    ctx.textBaseline = "top";
    ctx.font = `700 ${fs}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

    const padding = w * 0.08;
    let x;
    if (alignment === "left") {
      ctx.textAlign = "left";
      x = padding;
    } else if (alignment === "right") {
      ctx.textAlign = "right";
      x = w - padding;
    } else {
      ctx.textAlign = "center";
      x = w / 2;
    }

    const lines = wrapText(ctx, text || "", w - padding * 2);

    // vertically center block of text + subtitle
    const lineHeight = fs + 8;
    let totalHeight = lines.length * lineHeight;

    let subFs = 24;
    let hasSub = Boolean(subtitle.trim());
    if (hasSub) totalHeight += subFs + 16;

    let startY = (h - totalHeight) / 2;

    lines.forEach((line) => {
      ctx.fillText(line, x, startY);
      startY += lineHeight;
    });

    // subtitle
    if (hasSub) {
      ctx.font = `400 ${subFs}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
      const subLines = wrapText(ctx, subtitle, w - padding * 2);
      subLines.forEach((line) => {
        ctx.fillText(line, x, startY);
        startY += subFs + 6;
      });
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      },
      "image/png",
      1
    );
  };

  const downloadName = (text || "text-image")
    .toLowerCase()
    .slice(0, 40)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Design Tool</div>
          <h1 className="page-title">Text to Image Generator</h1>
          <p className="page-subtitle">
            Turn plain text into shareable images — perfect for quotes, social
            posts, banners, and hero images. (No AI art, fully browser-based.)
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
                <label className="label">Main Text</label>
                <textarea
                  className="input"
                  rows={5}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your quote, heading, or announcement..."
                />
              </div>

              <div className="field">
                <label className="label">Subtitle (optional)</label>
                <input
                  className="input"
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Attribution, CTA, or small detail"
                />
              </div>

              <div className="field">
                <label className="label">Canvas Size (px)</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Width"
                    style={{ flex: 1 }}
                  />
                  <input
                    className="input"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Height"
                    style={{ flex: 1 }}
                  />
                </div>
                <p className="helper-text">
                  1080×1080 for Instagram, 1280×720 for YouTube-style, 1200×630
                  for OG cards.
                </p>
              </div>

              <div className="field">
                <label className="label">Style</label>
                <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <div style={{ flex: 1 }}>
                    <span className="helper-text">Background</span>
                    <input
                      className="input"
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="helper-text">Text Color</span>
                    <input
                      className="input"
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <span className="helper-text">Font Size</span>
                    <input
                      className="input"
                      type="number"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      placeholder="48"
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="helper-text">Alignment</span>
                    <select
                      className="input"
                      value={alignment}
                      onChange={(e) => setAlignment(e.target.value)}
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn"
                onClick={generateImage}
              >
                Generate Image
              </button>

              {imageUrl && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Image Ready</div>
                  <a
                    href={imageUrl}
                    download={`${downloadName || "text-image"}.png`}
                    className="nav-pill"
                  >
                    Download PNG
                  </a>
                </div>
              )}
            </div>

            {/* Preview */}
            <div>
              <p className="helper-text" style={{ marginBottom: 8 }}>
                Preview:
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
                  maxHeight: 500,
                  overflow: "hidden",
                }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Generated text image"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ) : (
                  <span className="helper-text">
                    Type your text and click &quot;Generate Image&quot; to see
                    a preview.
                  </span>
                )}
              </div>
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
