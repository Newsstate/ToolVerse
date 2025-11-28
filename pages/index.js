import Link from "next/link";

export default function Home() {
  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Online Utility Tools</div>
          <h1 className="page-title">All-in-One Calculator Hub</h1>
          <p className="page-subtitle">
            Quick, clean tools for everyday maths, finance and health — built to embed
            inside any website.
          </p>
        </header>

        <div className="card">
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 8 }}>
            Math & Calculation Tools
          </h2>
          <p className="page-subtitle" style={{ marginBottom: 12 }}>
            Start with these core calculators. Each tool has a dedicated URL for easy
            WordPress iframe embedding.
          </p>

          <div className="nav-links">
  <Link href="/calculator" className="nav-pill">
    Standard Calculator
  </Link>
  <Link href="/emi-calculator" className="nav-pill">
    Loan EMI Calculator
  </Link>
  <Link href="/percent-calculator" className="nav-pill">
    Percent Calculator
  </Link>
  <Link href="/age-calculator" className="nav-pill">
    Age Calculator
  </Link>
  <Link href="/bmi-calculator" className="nav-pill">
    BMI Calculator
  </Link>
  <Link href="/time-zone-converter" className="nav-pill">
    Time Zone Converter
  </Link>
  <Link href="/date-calculator" className="nav-pill">
    Date Calculator
  </Link>
</div>

        </div>
      </main>
    </div>
  );
}
