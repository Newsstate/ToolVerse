import { useState } from "react";
import Link from "next/link";

const CURRENCIES = [
  { code: "INR", name: "Indian Rupee", rateToUsd: 1 / 83 },   // ~₹83 = $1
  { code: "USD", name: "US Dollar", rateToUsd: 1 },
  { code: "EUR", name: "Euro", rateToUsd: 1.08 },             // ~1 EUR = 1.08 USD
  { code: "GBP", name: "British Pound", rateToUsd: 1.27 },
  { code: "AED", name: "UAE Dirham", rateToUsd: 0.27 },
  { code: "SAR", name: "Saudi Riyal", rateToUsd: 0.27 },
  { code: "JPY", name: "Japanese Yen", rateToUsd: 1 / 155 },  // ~¥155 = $1
  { code: "AUD", name: "Australian Dollar", rateToUsd: 0.67 }
];

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState("1");
  const [fromCode, setFromCode] = useState("INR");
  const [toCode, setToCode] = useState("USD");
  const [result, setResult] = useState(null);

  const convert = () => {
    const value = parseFloat(amount);
    if (!value && value !== 0) {
      setResult(null);
      return;
    }

    const from = CURRENCIES.find((c) => c.code === fromCode);
    const to = CURRENCIES.find((c) => c.code === toCode);
    if (!from || !to) {
      setResult(null);
      return;
    }

    // Convert: from → USD → to
    const inUsd = value * from.rateToUsd;
    const converted = inUsd / to.rateToUsd;

    setResult({
      input: value,
      fromCode,
      toCode,
      converted
    });
  };

  const fmt = (n) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 4 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Finance Tool</div>
          <h1 className="page-title">Currency Converter</h1>
          <p className="page-subtitle">
            Convert quickly between popular currencies. Uses static sample rates —
            ideal as a demo tool or until you plug in a live FX API.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            {/* Left: inputs */}
            <div>
              <div className="field">
                <label className="label">Amount</label>
                <input
                  className="input"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  placeholder="e.g. 1000"
                />
              </div>

              <div className="field">
                <label className="label">From currency</label>
                <select
                  className="select"
                  value={fromCode}
                  onChange={(e) => setFromCode(e.target.value)}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">To currency</label>
                <select
                  className="select"
                  value={toCode}
                  onChange={(e) => setToCode(e.target.value)}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="btn"
                onClick={convert}
              >
                Convert
              </button>
              <p className="helper-text" style={{ marginTop: 8 }}>
                Exchange rates are approximate and for illustration only. For real
                conversions, always confirm with a live currency source.
              </p>
            </div>

            {/* Right: result */}
            <div>
              <div className="result-box">
                <div className="result-title">Converted Amount</div>
                <div className="result-value" style={{ fontSize: "1.2rem" }}>
                  {result
                    ? `${fmt(result.converted)} ${result.toCode}`
                    : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  {fmt(result.input)} {result.fromCode} ={" "}
                  {fmt(result.converted)} {result.toCode} (approx.)
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
