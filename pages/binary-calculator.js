import { useState } from "react";
import Link from "next/link";

function isValidBinary(str) {
  return /^[01]+$/.test(str);
}

export default function BinaryCalculatorPage() {
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [binA, setBinA] = useState("");
  const [binB, setBinB] = useState("");
  const [result, setResult] = useState(null);

  const convertFromDecimal = () => {
    const n = parseInt(decimal, 10);
    if (!Number.isInteger(n) || n < 0) {
      setResult(null);
      return;
    }
    const bin = n.toString(2);
    setBinary(bin);
    setResult((prev) => ({
      ...(prev || {}),
      decToBin: bin,
    }));
  };

  const convertFromBinary = () => {
    const s = binary.trim();
    if (!isValidBinary(s)) {
      setResult(null);
      return;
    }
    const n = parseInt(s, 2);
    setDecimal(String(n));
    setResult((prev) => ({
      ...(prev || {}),
      binToDec: n,
    }));
  };

  const addBinaries = () => {
    const a = binA.trim();
    const b = binB.trim();
    if (!isValidBinary(a) || !isValidBinary(b)) {
      setResult((prev) => ({
        ...(prev || {}),
        sum: null,
        sumError: "Use only 0 and 1 for binary numbers.",
      }));
      return;
    }
    const sumDec = parseInt(a, 2) + parseInt(b, 2);
    const sumBin = sumDec.toString(2);
    setResult((prev) => ({
      ...(prev || {}),
      sum: {
        bin: sumBin,
        dec: sumDec,
      },
      sumError: "",
    }));
  };

  const fmt = (n) =>
    typeof n === "number"
      ? n.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })
      : n;

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Number System Tool</div>
          <h1 className="page-title">Binary Calculator</h1>
          <p className="page-subtitle">
            Convert between decimal and binary, and add two binary numbers with decimal
            equivalent.
          </p>
          <div className="nav-links">
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Converters */}
            <div>
              <div className="field">
                <label className="label">Decimal to Binary</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    value={decimal}
                    onChange={(e) => setDecimal(e.target.value)}
                    placeholder="e.g. 42"
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={convertFromDecimal}
                  >
                    → Bin
                  </button>
                </div>
              </div>

              <div className="field" style={{ marginTop: 10 }}>
                <label className="label">Binary to Decimal</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type="text"
                    value={binary}
                    onChange={(e) => setBinary(e.target.value)}
                    placeholder="e.g. 101010"
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={convertFromBinary}
                  >
                    → Dec
                  </button>
                </div>
              </div>

              <div className="field" style={{ marginTop: 16 }}>
                <label className="label">Binary Addition</label>
                <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <input
                    className="input"
                    type="text"
                    value={binA}
                    onChange={(e) => setBinA(e.target.value)}
                    placeholder="Binary A (e.g. 1010)"
                  />
                  <span style={{ alignSelf: "center" }}>+</span>
                  <input
                    className="input"
                    type="text"
                    value={binB}
                    onChange={(e) => setBinB(e.target.value)}
                    placeholder="Binary B (e.g. 110)"
                  />
                </div>
                <button
                  type="button"
                  className="btn"
                  onClick={addBinaries}
                >
                  Add Binaries
                </button>
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">
                  Decimal → Binary
                </div>
                <div className="result-value">
                  {result?.decToBin ?? "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  Binary → Decimal
                </div>
                <div className="result-value">
                  {result?.binToDec != null
                    ? fmt(result.binToDec)
                    : "—"}
                </div>
              </div>

              <div
                className="result-box"
                style={{ marginTop: 10 }}
              >
                <div className="result-title">
                  Binary Sum (A + B)
                </div>
                <div className="result-value" style={{ fontSize: "0.9rem" }}>
                  {result?.sum
                    ? `${result.sum.bin} (dec ${fmt(
                        result.sum.dec
                      )})`
                    : "—"}
                </div>
              </div>

              {result?.sumError && (
                <p
                  className="helper-text"
                  style={{ marginTop: 8, color: "#e11d48" }}
                >
                  {result.sumError}
                </p>
              )}

              <p className="helper-text" style={{ marginTop: 8 }}>
                Binary numbers use only 0 and 1. This tool only supports
                non-negative integers.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
