import { useState } from 'react';
import Link from 'next/link';

function getBmiCategory(bmi) {
  if (!bmi && bmi !== 0) return '';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 23) return 'Normal (Asian range)';
  if (bmi < 25) return 'Overweight (Asian range)';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export default function BmiCalculatorPage() {
  const [weight, setWeight] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [bmi, setBmi] = useState('');
  const [category, setCategory] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const hcm = parseFloat(heightCm);
    if (!w || !hcm) return;
    const h = hcm / 100;
    const bmiVal = w / (h * h);
    const rounded = bmiVal.toFixed(1);
    setBmi(rounded);
    setCategory(getBmiCategory(bmiVal));
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Health Tool</div>
          <h1 className="page-title">BMI Calculator</h1>
          <p className="page-subtitle">
            Check your Body Mass Index using your height and weight. Uses the
            standard BMI formula with Asian-specific ranges.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <form onSubmit={handleCalculate} className="grid grid-2">
            <div>
              <div className="field">
                <label className="label">Weight (kg)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 68"
                />
              </div>
              <div className="field">
                <label className="label">Height (cm)</label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="e.g. 172"
                />
              </div>
              <button className="btn" type="submit">
                Calculate BMI
              </button>
              <p className="helper-text">
                Formula: BMI = weight (kg) ÷ [height (m)]²
              </p>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">BMI Score</div>
                <div className="result-value">{bmi || '—'}</div>
              </div>
              <div className="result-box" style={{ marginTop: 10 }}>
                <div className="result-title">Category</div>
                <div className="result-value" style={{ fontSize: '1.05rem' }}>
                  {category || '—'}
                </div>
              </div>
              <p className="helper-text" style={{ marginTop: 10 }}>
                BMI is a general indicator only and does not replace medical
                advice.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
