import { useState } from "react";
import Link from "next/link";

function parseMatrix(input) {
  if (!input.trim()) return null;
  const rows = input
    .trim()
    .split(/\n+/)
    .map((line) =>
      line
        .trim()
        .split(/[\s,]+/)
        .map((x) => parseFloat(x))
        .filter((x) => Number.isFinite(x))
    );

  if (!rows.length) return null;
  const cols = rows[0].length;
  if (!cols) return null;

  for (const r of rows) {
    if (r.length !== cols) return null;
  }

  return rows;
}

function transpose(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const t = [];
  for (let j = 0; j < cols; j++) {
    const row = [];
    for (let i = 0; i < rows; i++) {
      row.push(matrix[i][j]);
    }
    t.push(row);
  }
  return t;
}

function determinant(matrix) {
  const n = matrix.length;
  if (n !== matrix[0].length) return null; // must be square

  if (n === 1) {
    return matrix[0][0];
  }
  if (n === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  if (n === 3) {
    const m = matrix;
    const a = m[0][0],
      b = m[0][1],
      c = m[0][2];
    const d = m[1][0],
      e = m[1][1],
      f = m[1][2];
    const g = m[2][0],
      h = m[2][1],
      i = m[2][2];
    return (
      a * (e * i - f * h) -
      b * (d * i - f * g) +
      c * (d * h - e * g)
    );
  }
  return null; // not implemented for >3x3
}

function formatMatrix(matrix) {
  return matrix
    .map((row) =>
      row
        .map((v) =>
          v.toLocaleString(undefined, { maximumFractionDigits: 4 })
        )
        .join("\t")
    )
    .join("\n");
}

export default function MatrixCalculatorPage() {
  const [input, setInput] = useState("1 2\n3 4");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const mat = parseMatrix(input);
    if (!mat) {
      setResult(null);
      setError(
        "Could not read matrix. Use rows on new lines, numbers separated by space or comma."
      );
      return;
    }

    const rows = mat.length;
    const cols = mat[0].length;
    const det =
      rows === cols && rows <= 3 ? determinant(mat) : null;
    const t = transpose(mat);

    setResult({
      rows,
      cols,
      det,
      transpose: t,
    });
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Algebra Tool</div>
          <h1 className="page-title">Matrix Calculator</h1>
          <p className="page-subtitle">
            Enter a matrix to get its size, transpose, and determinant (for up to 3×3
            square matrices).
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Input */}
            <div>
              <div className="field">
                <label className="label">Matrix</label>
                <textarea
                  className="input"
                  rows={6}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={"Example 2×2:\n1 2\n3 4"}
                  style={{ resize: "vertical" }}
                />
              </div>
              <p className="helper-text" style={{ marginBottom: 8 }}>
                Each row on a new line, values separated by spaces or commas.
              </p>
              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Calculate Matrix Properties
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Dimensions</div>
                <div className="result-value">
                  {result
                    ? `${result.rows} × ${result.cols}`
                    : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  Determinant (if square up to 3×3)
                </div>
                <div className="result-value">
                  {result && result.det != null
                    ? fmt4(result.det)
                    : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">Transpose</div>
                <pre
                  className="result-value"
                  style={{
                    whiteSpace: "pre-wrap",
                    fontSize: "0.85rem",
                  }}
                >
                  {result ? formatMatrix(result.transpose) : "—"}
                </pre>
              </div>

              {error && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8, color: "#e11d48" }}
                >
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
