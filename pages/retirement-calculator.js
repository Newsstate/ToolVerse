import { useState } from "react";
import Link from "next/link";

export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("60");
  const [currentCorpus, setCurrentCorpus] = useState("0");
  const [monthlyInvestment, setMonthlyInvestment] = useState("10000");
  const [annualReturnRate, setAnnualReturnRate] = useState("10");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const ageNow = parseFloat(currentAge);
    const retireAt = parseFloat(retirementAge);
    const corpusNow = parseFloat(currentCorpus) || 0;
    const monthlyInv = parseFloat(monthlyInvestment);
    const r = parseFloat(annualReturnRate);

    if (!ageNow || !retireAt || retireAt <= ageNow || !monthlyInv || !r) {
      setResult(null);
      return;
    }

    const years = retireAt - ageNow;
    const n = years * 12;
    const annualRate = r / 100;
    const monthlyRate = annualRate / 12;

    // Future value of current corpus
    const futureCorpus =
      monthlyRate > 0
        ? corpusNow * Math.pow(1 + monthlyRate, n)
        : corpusNow;

    // Future value of monthly SIP contributions
    const fvSip =
      monthlyRate > 0
        ? monthlyInv * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate)
        : monthlyInv * n;

    const totalCorpus = futureCorpus + fvSip;
    const totalInvested = corpusNow + monthlyInv * n;

    setResult({
      years,
      totalCorpus,
      totalInvested,
    });
  };

  const fmt = (n) =>
    n?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Retirement Tool</div>
          <h1 className="page-title">Retirement Calculator</h1>
          <p className="page-subtitle">
            See how much your investments could grow to by retirement based on your current
            savings and monthly contributions.
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
                <label className="label">Current Age</label>
                <input
                  className="input"
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  placeholder="e.g. 30"
                />
              </div>

              <div className="field">
                <label className="label">Retirement Age</label>
                <input
                  className="input"
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                  placeholder="e.g. 60"
                />
              </div>

              <div className="field">
                <label className="label">Current Retirement Savings (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={currentCorpus}
                  onChange={(e) => setCurrentCorpus(e.target.value)}
                  placeholder="e.g. 500000"
                />
              </div>

              <div className="field">
                <label className="label">Monthly Investment (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(e.target.value)}
                  placeholder="e.g. 10000"
                />
              </div>

              <div className="field">
                <label className="label">Expected Return (% p.a.)</label>
                <input
                  className="input"
                  type="number"
                  value={annualReturnRate}
                  onChange={(e) => setAnnualReturnRate(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>

              <button type="button" className="btn" onClick={calculate}>
                Calculate Retirement Corpus
              </button>
            </div>

            {/* Results */}
            <div>
              <div className="result-box">
                <div className="result-title">Years Until Retirement</div>
                <div className="result-value">
                  {result ? `${result.years} years` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Projected Retirement Corpus</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.totalCorpus)}` : "—"}
                </div>
              </div>

              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Total Amount Invested</div>
                <div className="result-value">
                  {result ? `₹ ${fmt(result.totalInvested)}` : "—"}
                </div>
              </div>

              {result && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  This is a rough projection based on constant returns and investments.
                  Real-life results depend on market movements, inflation and tax.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
