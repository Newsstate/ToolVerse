import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function LogoMakerPage() {
  const [text, setText] = useState("My Brand");
  const [subtitle, setSubtitle] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const [subtitleSize, setSubtitleSize] = useState(18);
  const [fontWeight, setFontWeight] = useState("700");
  const [bgColor, setBgColor] = useState("#111827"); // gray-900
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [accentColor, setAccentColor] = useState("#6366F1"); // indigo-ish
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(400);
  const [logoUrl, setLogoUrl] = useState("");
  const canvasRef = useRef(null);

  const generateLogo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const w = parseInt(width, 10) || 800;
    const h = parseInt(height, 10) || 400;
    canvas.width = w;
    canvas.height = h;

    // background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    // accent bar / circle (simple mark)
    const markSize = Math.min(w, h) * 0.16;
    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(w * 0.18, h * 0.5, markSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // main text
    ctx.fillStyle = textColor;
    ctx.textAlign = "left";

    const mainSize = parseInt(fontSize, 10) || 48;
    ctx.font = `${fontWeight} ${mainSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

    const textX = w * 0.32;
    const textY = h * 0.48;

    ctx.fillText(text || "My Brand", textX, textY);

    // subtitle
    const subSize = parseInt(subtitleSize, 10) || 18;
    if (subtitle.trim()) {
      ctx.font = `400 ${subSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      ctx.fillStyle = "#D1D5DB"; // gray-300
      ctx.fillText(subtitle, textX, textY + subSize + 12);
    }

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setLogoUrl(url);
    }, "image/png");
  };

  // auto-generate on first load
  useEffect(() => {
    generateLogo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadFileName = (text || "logo")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Brand Tool</div>
          <h1 className="page-title">Logo Maker</h1>
          <p className="page-subtitle">
            Create simple text-based logos with custom colors and sizes — ideal
            for quick brand mockups and side projects.
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
                <label className="label">Brand Name</label>
                <input
                  className="input"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="My Brand"
                />
              </div>

              <div className="field">
                <label className="label">Tagline (optional)</label>
                <input
                  className="input"
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="tagline, slogan, etc."
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
                  800×400 is a good starting point for web logos.
                </p>
              </div>

              <div className="field">
                <label className="label">Typography</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    placeholder="Main text size"
                    style={{ flex: 1 }}
                  />
                  <input
                    className="input"
                    type="number"
                    value={subtitleSize}
                    onChange={(e) => setSubtitleSize(e.target.value)}
                    placeholder="Subtitle size"
                    style={{ flex: 1 }}
                  />
                </div>
                <div style={{ marginTop: 8 }}>
                  <select
                    className="input"
                    value={fontWeight}
                    onChange={(e) => setFontWeight(e.target.value)}
                  >
                    <option value="400">Regular</option>
                    <option value="500">Medium</option>
                    <option value="600">Semi Bold</option>
                    <option value="700">Bold</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label">Colors</label>
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
                    <span className="helper-text">Text</span>
                    <input
                      className="input"
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="helper-text">Accent</span>
                    <input
                      className="input"
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn"
                onClick={generateLogo}
              >
                Generate Logo
              </button>

              {logoUrl && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Logo Ready</div>
                  <a
                    href={logoUrl}
                    download={`${downloadFileName || "logo"}.png`}
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
                }}
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Generated logo"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ) : (
                  <span className="helper-text">
                    Adjust settings and click &quot;Generate Logo&quot; to
                    preview.
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
