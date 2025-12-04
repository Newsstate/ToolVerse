import { useState } from "react";
import Link from "next/link";

function extractYouTubeId(input) {
  if (!input) return "";
  const trimmed = input.trim();
  // If only ID
  if (/^[a-zA-Z0-9_-]{8,}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace("www.", "");
    if (host === "youtube.com" || host === "m.youtube.com") {
      return url.searchParams.get("v") || "";
    }
    if (host === "youtu.be") {
      return url.pathname.replace("/", "");
    }
  } catch (e) {
    // ignore
  }
  return "";
}

export default function ThumbnailDownloaderPage() {
  const [input, setInput] = useState("");
  const [videoId, setVideoId] = useState("");
  const [error, setError] = useState("");

  const handleGetThumbnails = () => {
    const id = extractYouTubeId(input);
    if (!id) {
      setVideoId("");
      setError("Could not detect a valid YouTube video ID.");
      return;
    }
    setError("");
    setVideoId(id);
  };

  const makeUrl = (id, quality) =>
    `https://img.youtube.com/vi/${id}/${quality}.jpg`;

  const qualities = [
    { key: "maxresdefault", label: "Max Resolution" },
    { key: "sddefault", label: "SD" },
    { key: "hqdefault", label: "HQ" },
    { key: "mqdefault", label: "Medium" },
    { key: "default", label: "Default" },
  ];

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">YouTube Tool</div>
          <h1 className="page-title">YouTube Thumbnail Downloader</h1>
          <p className="page-subtitle">
            Paste any YouTube URL or video ID to view and download its
            thumbnails in different sizes.
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
                <label className="label">YouTube URL or Video ID</label>
                <input
                  className="input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                />
                <p className="helper-text">
                  Works with full URLs, youtu.be links, or just the ID.
                </p>
              </div>

              <button
                type="button"
                className="btn"
                onClick={handleGetThumbnails}
                disabled={!input.trim()}
              >
                Get Thumbnails
              </button>

              {error && (
                <p
                  className="helper-text"
                  style={{ color: "#c0392b", marginTop: 8 }}
                >
                  {error}
                </p>
              )}

              {videoId && (
                <div className="result-box" style={{ marginTop: 10 }}>
                  <div className="result-title">Detected Video ID</div>
                  <div className="result-value">{videoId}</div>
                  <p className="helper-text">
                    Scroll right to see all available thumbnail sizes.
                  </p>
                </div>
              )}
            </div>

            {/* Right */}
            <div>
              {videoId ? (
                <>
                  <p className="helper-text" style={{ marginBottom: 8 }}>
                    Click &quot;Download&quot; under the thumbnail you want.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      maxHeight: 500,
                      overflowY: "auto",
                    }}
                  >
                    {qualities.map((q) => {
                      const url = makeUrl(videoId, q.key);
                      return (
                        <div
                          key={q.key}
                          style={{
                            borderRadius: 8,
                            border: "1px solid #eee",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              padding: 8,
                              borderBottom: "1px solid #f1f5f9",
                              fontSize: "0.85rem",
                              fontWeight: 600,
                            }}
                          >
                            {q.label} ({q.key}.jpg)
                          </div>
                          <img
                            src={url}
                            alt={q.label}
                            style={{
                              width: "100%",
                              display: "block",
                              background: "#000",
                            }}
                          />
                          <div style={{ padding: 8 }}>
                            <a
                              href={url}
                              download={`youtube-${videoId}-${q.key}.jpg`}
                              className="nav-pill"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <p className="helper-text">
                  Enter a YouTube link or ID and click &quot;Get
                  Thumbnails&quot; to preview and download.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
