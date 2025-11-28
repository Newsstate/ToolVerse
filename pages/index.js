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
  <Link href="/date-calculator" className="nav-pill">
    Date Calculator
  </Link>
  <Link href="/sip-calculator" className="nav-pill">
  SIP Calculator
 </Link>
<Link href="/compound-interest-calculator" className="nav-pill">
  Compound Interest / FD Calculator
</Link>
<Link href="/gst-calculator" className="nav-pill">
  GST Calculator
</Link>
<Link href="/credit-card-calculator" className="nav-pill">
  Credit Card Interest Calculator
</Link>
<Link href="/salary-calculator" className="nav-pill">
  Salary / Net Pay Calculator
</Link>
<Link href="/fd-rd-calculator" className="nav-pill">
  FD / RD Calculator
</Link>
<Link href="/countdown" className="nav-pill">
  Countdown Timer
</Link>
<Link href="/stopwatch" className="nav-pill">
  Stopwatch
</Link>
<Link href="/time-zone-converter" className="nav-pill">
  Time Zone Converter
</Link>
</div>

        </div>
      </main>
    </div>
  );
}
