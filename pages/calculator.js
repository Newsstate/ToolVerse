import { useState } from "react";
import Link from "next/link";

export default function CalculatorPage() {
  const [expression, setExpression] = useState("");
  const [error, setError] = useState("");

  const append = (val) => {
    setError("");
    setExpression((prev) => prev + val);
  };

  const clearAll = () => {
    setExpression("");
    setError("");
  };

  const backspace = () => {
    setError("");
    setExpression((prev) => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      const allowed = /^[0-9+\-*/().% ]+$/;
      if (!allowed.test(expression)) {
        setError("Invalid characters in expression");
        return;
      }
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${expression})`)();
      if (result === undefined || isNaN(result)) {
        setError("Cannot calculate");
        return;
      }
      setExpression(String(result));
      setError("");
    } catch (e) {
      setError("Invalid expression");
    }
  };

  const buttons = [
    { label: "C", action: clearAll },
    { label: "⌫", action: backspace },
    { label: "%", value: "%" },
    { label: "/", value: "/" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "×", value: "*" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "−", value: "-" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "+", value: "+" },
    { label: "0", value: "0", wide: true },
    { label: ".", value: "." },
    { label: "=", action: calculate, equal: true }
  ];

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Math Tool</div>
          <h1 className="page-title">Online Standard Calculator</h1>
          <p className="page-subtitle">
            A clean, responsive calculator for quick calculations. Perfect for embedding
            inside your WordPress site.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">
              ← All Tools
            </Link>
          </div>
        </header>

        <div className="card">
          <div className="calc-display">{expression || "0"}</div>
          {error && (
            <div
              style={{
                marginBottom: 8,
                fontSize: "0.8rem",
                color: "#b91c1c"
              }}
            >
              {error}
            </div>
          )}
          <div className="calc-grid">
            {buttons.map((btn, idx) => {
              const isOperator = ["/", "*", "-", "+", "%"].includes(btn.value);
              const classNames = [
                "calc-btn",
                isOperator ? "operator" : "",
                btn.wide ? "wide" : "",
                btn.equal ? "equal" : ""
              ]
                .filter(Boolean)
                .join(" ");

              const handleClick = () => {
                if (btn.action) btn.action();
                else if (btn.value) append(btn.value);
              };

              return (
                <button key={idx} className={classNames} onClick={handleClick}>
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
