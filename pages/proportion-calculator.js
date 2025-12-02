import { useState } from "react";
import Link from "next/link";

export default function ProportionCalculatorPage() {
  const [unknown, setUnknown] = useState("A");
  const [A, setA] = useState("");
  const [B, setB] = useState("");
  const [C, setC] = useState("");
  const [D, setD] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = unknown === "A" ? null : parseFloat(A);
    const b = unknown === "B" ? null : parseFloat(B);
    const c = unknown === "C" ? null : parseFloat(C);
    const d = unknown === "D" ? null : parseFloat(D);

    let x = null;

    try {
      if (unknown === "A") {
        if (!b || !c || !d) return setResult(null);
        x = (b * c) / d;
      } else if (unknown === "B") {
        if (!a || !c || !d) return setResult(null);
        x = (a * d) / c;
      } else if (unknown === "C") {
        if (!a || !b || !d) return setResult(null);
        x = (a * d) / b;
      } else if (unknown === "D") {
        if (!a || !b || !c) return setResult(null);
        x = (b * c) / a;
      }
    } catch {
      setResult(null);
      return;
    }

    if (!isFinite(x)) {
      setResult(null);
      return;
    }

    setResult({ unknown, value: x });
  };

  const fmt3 = (n) =>
    n?.toLocaleString(undefined, {
      maximumFractionDigits: 3,
    });

  const readOnlyIf = (name) => (unknown === name ? { readOnly: false } : {});

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Proportion Calculator</h1>
          <p className="page-subtitle">
            Solve proportions of the form <strong>A / B = C / D</strong> by choosing which
            variable is unknown and filling in the other three.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Inputs */}
            <div>
              <div className="field">
                <label className="label">Unknown Variable</label>
                <select
                  className="input"
                  value={unknown}
                  onChange={(e) => {
                    setUnknown(e.target.value);
                    setResult(null);
                  }}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div className="field">
                <label className="label">
                  Proportion A / B = C / D
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr auto 1fr",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  <input
                    className="input"
                    type="number"
                    value={A}
                    onChange={(e) => setA(e.target.value)}
                    placeholder="A"
                    disabled={unknown === "A"}
                    {...readOnlyIf("A")}
                  />
                  <span>/</span>
                  <input
                    className="input"
                    type="number"
                    value={B}
                    onChange={(e) => setB(e.target.value)}
                    placeholder="B"
                    disabled={unknown === "B"}
                    {...readOnlyIf("B")}
                  />
                  <span>=</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 6 }}>
                    <input
                      className="input"
                      type="number"
                      value={C}
                      onChange={(e) => setC(e.target.value)}
                      placeholder="C"
                      disabled={unknown === "C"}
                      {...readOnlyIf("C")}
                    />
                    <span>/</span>
                    <input
                      className="input"
                      type="number"
                      value={D}
                      onChange={(e) => setD(e.target.value)}
                      placeholder="D"
                      disabled={unknown === "D"}
                      {...readOnlyIf("D")}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn"
                onClick={calculate}
              >
                Solve Proportion
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  Unknown Value ({result?.unknown || "—"})
                </div>
                <div className="result-value">
                  {result ? fmt3(result.value) : "—"}
                </div>
              </div>

              {result && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8 }}
                >
                  Proportions are solved using cross-multiplication:
                  A / B = C / D ⇒ A·D = B·C. This is the backbone
                  of scale, percent and many word problems.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
