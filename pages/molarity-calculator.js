import { useState } from "react";
import Link from "next/link";

export default function MolarityCalculatorPage() {
  const [mode, setMode] = useState("moles");
  const [moles, setMoles] = useState("");
  const [mass, setMass] = useState("");
  const [molarMass, setMolarMass] = useState("");
  const [volume, setVolume] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const V = parseFloat(volume); // litres
    if (!Number.isFinite(V) || V <= 0) {
      setResult(null);
      return;
    }

    let n = null; // moles

    if (mode === "moles") {
      const mol = parseFloat(moles);
      if (!Number.isFinite(mol) || mol < 0) {
        setResult(null);
        return;
      }
      n = mol;
    } else {
      const m = parseFloat(mass);
      const M = parseFloat(molarMass);
      if (!Number.isFinite(m) || !Number.isFinite(M) || m < 0 || M <= 0) {
        setResult(null);
        return;
      }
      n = m / M;
    }

    const molarity = n / V; // mol/L
    setResult({
      moles: n,
      molarity,
    });
  };

  const fmt4 = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 4 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Chemistry Tool</div>
          <h1 className="page-title">Molarity Calculator</h1>
          <p className="page-subtitle">
            Find the molarity (mol/L) of a solution from moles and volume, or from mass, molar mass and volume.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>
        <div className="card">
          <div className="grid grid-2">
            <div>
              <div className="field">
                <label className="label">Input Mode</label>
                <select
                  className="input"
                  value={mode}
                  onChange={(e) => {
                    setMode(e.target.value);
                    setResult(null);
                  }}
                >
                  <option value="moles">I know moles and volume</option>
                  <option value="mass">
                    I know mass, molar mass, and volume
                  </option>
                </select>
              </div>

              {mode === "moles" && (
                <div className="field">
                  <label className="label">Moles of Solute (mol)</label>
                  <input
                    className="input"
                    type="number"
                    value={moles}
                    onChange={(e) => setMoles(e.target.value)}
                    placeholder="e.g. 0.5"
                  />
                </div>
              )}

              {mode === "mass" && (
                <>
                  <div className="field">
                    <label className="label">Mass of Solute (g)</label>
                    <input
                      className="input"
                      type="number"
                      value={mass}
                      onChange={(e) => setMass(e.target.value)}
                      placeholder="e.g. 29.2"
                    />
                  </div>
                  <div className="field">
                    <label className="label">
                      Molar Mass (g/mol)
                    </label>
                    <input
                      className="input"
                      type="number"
                      value={molarMass}
                      onChange={(e) => setMolarMass(e.target.value)}
                      placeholder="e.g. 58.44 for NaCl"
                    />
                  </div>
                </>
              )}

              <div className="field">
                <label className="label">
                  Volume of Solution (L)
                </label>
                <input
                  className="input"
                  type="number"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="e.g. 1.0"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Molarity
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Moles of Solute (mol)</div>
                <div className="result-value">
                  {result ? fmt4(result.moles) : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">
                  Molarity (mol/L)
                </div>
                <div className="result-value">
                  {result ? fmt4(result.molarity) : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Molarity M = moles / volume (in litres). Double-check that your volume
                  is converted to litres for correct units.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
