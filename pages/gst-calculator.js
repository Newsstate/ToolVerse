import { useState } from "react";
import Link from "next/link";

const gstRates = [5, 12, 18, 28];

export default function GstCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState("add"); // "add" or "remove"
  const [result, setResult] = useState(null);

  const calculate = () => {
    const baseAmount = parseFloat(amount);
    const r = parseFloat(rate);

    if (Number.isNaN(baseAmount)) {
      setResult(null);
      return;
    }

    let taxAmount = 0;
    let netAmount = 0;
    let grossAmount = 0;

    if (mode === "add") {
      taxAmount = (baseAmount * r) / 100;
      grossAmount = baseAmount + taxAmount;
      netAmount = baseAmount;
    } else {
      // remove GST from gross → derive base and tax
      grossAmount = baseAmount;
      netAmount = (baseAmount * 100) / (100 + r);
      taxAmount = grossAmount - netAmount;
    }

    setResult({
      netAmount,
      taxAmount,
      grossAmount
    });
  };

  const fmt = (val) =>
    val.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Tax Tool</div>
          <h1 className="page-title">GST Calculator</h1>
          <p className="page-subtitle">
            Quickly add or remove GST from an amount. Choose rate and mode to get net
            amount, GST value and gross amount.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Left: inputs */}
            <div>
              <div className="field">
                <label className="label">
                  Amount ({mode === "add" ? "before GST" : "including GST"})
                </label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 1000"
                />
              </div>

              <div className="field">
                <label className="label">GST Rate</label>
                <select
                  className="select"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                >
                  {gstRates.map((r) => (
                    <option key={r} value={r}>
                      {r}%
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">Mode</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    className="btn-outline"
                    style={{
                      flex: 1,
                      background: mode === "add" ? "#eff6ff" : "transparent",
                      borderColor:
                        mode === "add" ? "#2563eb" : "rgba(148,163,184,0.8)",
                      color: mode === "add" ? "#1d4ed8" : "#2563eb"
                    }}
                    onClick={() => setMode("add")}
                  >
                    Add GST
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    style={{
                      flex: 1,
                      background: mode === "remove" ? "#eff6ff" : "transparent",
                      borderColor:
                        mode === "remove" ? "#2563eb" : "rgba(148,163,184,0.8)",
                      color: mode === "remove" ? "#1d4ed8" : "#2563eb"
                    }}
                    onClick={() => setMode("remove")}
                  >
                    Remove GST
                  </button>
                </div>
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate GST
              </button>
              <p className="helper-text">
                For detailed tax planning, always confirm rates and rules with a tax
                professional or official source.
              </p>
            </div>

            {/* Right: result */}
            <div>
              <div className="result-box">
                <div className="result-title">Net Amount (before GST)</div>
                <div className="result-value" style={{ fontSize: "1.05rem" }}>
                  {result ? `₹ ${fmt(result.netAmount)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">GST Amount</div>
                <div className="result-value" style={{ fontSize: "1rem" }}>
                  {result ? `₹ ${fmt(result.taxAmount)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Gross Amount (including GST)</div>
                <div className="result-value" style={{ fontSize: "1rem" }}>
                  {result ? `₹ ${fmt(result.grossAmount)}` : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
