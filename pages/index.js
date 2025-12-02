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
<Link href="/currency-converter" className="nav-pill">
  Currency Converter
</Link>
<Link href="/unit-converter" className="nav-pill">
  Unit Converter
</Link>
<Link href="/cgpa-percentage" className="nav-pill">CGPA to % Converter</Link>
<Link href="/typing-speed-test" className="nav-pill">Typing Speed Test</Link>
<Link href="/word-counter" className="nav-pill">Word Counter</Link>
<Link href="/home-loan-calculator" className="nav-pill">Home Loan Calculator</Link>
<Link href="/car-loan-calculator" className="nav-pill">Car Loan Calculator</Link>
<Link href="/personal-loan-calculator" className="nav-pill">Personal Loan Calculator</Link>
<Link href="/business-loan-calculator" className="nav-pill">Business Loan Calculator</Link>
<Link href="/loan-eligibility-calculator" className="nav-pill">Loan Eligibility Calculator</Link>
<Link href="/loan-comparison-calculator" className="nav-pill">Loan Comparison Calculator</Link>
<Link href="/mortgage-calculator" className="nav-pill">Mortgage Calculator</Link>
<Link href="/refinance-calculator" className="nav-pill">Refinance Calculator</Link>
<Link href="/amortization-calculator" className="nav-pill">Amortization Calculator</Link>
<Link href="/simple-interest-calculator" className="nav-pill">Simple Interest Calculator</Link>
<Link href="/mutual-fund-calculator" className="nav-pill">
  Mutual Fund Calculator
</Link>
<Link href="/cagr-calculator" className="nav-pill">
  CAGR Calculator
</Link>
<Link href="/roi-calculator" className="nav-pill">
  ROI Calculator
</Link>
<Link href="/inflation-calculator" className="nav-pill">
  Inflation Calculator
</Link>
<Link href="/inflation-calculator" className="nav-pill">
    Inflation Calculator
  </Link>

  <Link href="/gratuity-calculator" className="nav-pill">
    Gratuity Calculator
  </Link>
  <Link href="/pf-contribution-calculator" className="nav-pill">
    PF Contribution Calculator
  </Link>
  <Link href="/hra-calculator" className="nav-pill">
    HRA Calculator
  </Link>
  <Link href="/income-tax-calculator" className="nav-pill">
    Income Tax Calculator
  </Link>
  <Link href="/vat-calculator" className="nav-pill">
  VAT Calculator
</Link>
<Link href="/sales-tax-calculator" className="nav-pill">
  Sales Tax Calculator
</Link>
<Link href="/paycheck-calculator" className="nav-pill">
  Paycheck Calculator
</Link>
<Link href="/salary-to-hourly-calculator" className="nav-pill">
  Salary to Hourly Calculator
</Link>
<Link href="/hourly-wage-calculator" className="nav-pill">
  Hourly Wage Calculator
</Link>
</div>

        </div>
      </main>
    </div>
  );
}
