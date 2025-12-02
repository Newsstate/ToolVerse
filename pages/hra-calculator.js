import { useState } from "react";
import Link from "next/link";

export default function HraCalculatorPage() {
  const [basic, setBasic] = useState("");
  const [da, setDa] = useState("");
  const [hraReceived, setHraReceived] = useState("");
  const [rentPaid, setRentPaid] = useState("");
  const [cityType, setCityType] = useState("non-metro");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const b = parseFloat(basic);
    const d = parseFloat(da) || 0;
    const hra = parseFloat(hraReceived);
    const rent = parseFloat(rentPaid);

    if (!b || !hra || !rent) {
      setResult(null);
      return;
    }

    const salary = b + d;
    const rentMinus10 = Math.max(0, rent - 0.1 * salary);
    const percentSalary = (cityType === "metro" ? 0.5 : 0.4) * salary;

    const hraExempt = Math.min(hra, rentMinus10, percentSalary);
    const hraTaxable = Math.max(0, hra - hraExempt);

    setResult({
      hraExempt,
      hraTaxable,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Money Tool</div>
          <h1 className="page-title">HRA Calculator</h1>
          <p className="page-subtitle">
            Calculate the exempt and taxable portion of your House Rent Allowance (HRA).
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
                <label className="label">Basic Salary (Monthly, ₹)</label>
                <input
                  className="input"
                  type="number"
                  value={basic}
                  onChange={(e) => setBasic(e.target.value)}
                  placeholder="e.g. 40000"
                />
              </div>

              <div className="field">
                <label className="label">Dearness Allowance (Monthly, ₹)</label>
                <input
                  className="input"
                  type="number"
                  value={da}
                  onChange={(e) => setDa(e.target.value)}
                  placeholder="e.g. 5000 (optional)"
                />
              </div>

              <div className="field">
                <label className="label">HRA Received (Monthly, ₹)</label>
                <input
                  className="input"
                  type="number"
                  value={hraReceived}
                  onChange={(e) => setHraReceived(e.target.value)}
                  placeholder="e.g. 15000"
                />
              </div>

              <div className="field">
                <label className="label">Rent Paid (Monthly, ₹)</label>
                <input
                  className="input"
                  type="number"
                  value={rentPaid}
                  onChange={(e) => setRentPaid(e.target.value)}
                  placeholder="e.g. 18000"
                />
              </div>

              <div className="field">
                <label className="label">City Type</label>
                <select
                  className="input"
                  value={cityType}
                  onChange={(e) => setCityType(e.target.value)}
                >
                  <option value="metro">Metro (Delhi, Mumbai, Kolkata, Chennai)</option>
                  <option value="non-metro">Non-metro</option>
                </select>
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate HRA
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">HRA Exempt (per month)</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.hraExempt)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">HRA Taxable (per month)</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.hraTaxable)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This follows the common HRA rule: least of (1) actual HRA received, (2) rent
                  paid minus 10% of salary, (3) 50% of salary for metro or 40% for non-metro.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
