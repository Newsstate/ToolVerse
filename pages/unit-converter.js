import { useState, useMemo } from "react";
import Link from "next/link";

const UNIT_GROUPS = {
  length: {
    id: "length",
    label: "Length",
    units: [
      { id: "m", label: "Meters (m)", factorToBase: 1 },
      { id: "km", label: "Kilometers (km)", factorToBase: 1000 },
      { id: "cm", label: "Centimeters (cm)", factorToBase: 0.01 },
      { id: "mm", label: "Millimeters (mm)", factorToBase: 0.001 },
      { id: "mi", label: "Miles (mi)", factorToBase: 1609.34 },
      { id: "ft", label: "Feet (ft)", factorToBase: 0.3048 },
      { id: "in", label: "Inches (in)", factorToBase: 0.0254 }
    ]
  },
  weight: {
    id: "weight",
    label: "Weight / Mass",
    units: [
      { id: "kg", label: "Kilograms (kg)", factorToBase: 1 },
      { id: "g", label: "Grams (g)", factorToBase: 0.001 },
      { id: "mg", label: "Milligrams (mg)", factorToBase: 0.000001 },
      { id: "lb", label: "Pounds (lb)", factorToBase: 0.453592 },
      { id: "oz", label: "Ounces (oz)", factorToBase: 0.0283495 }
    ]
  },
  temperature: {
    id: "temperature",
    label: "Temperature",
    units: [
      { id: "c", label: "Celsius (°C)" },
      { id: "f", label: "Fahrenheit (°F)" },
      { id: "k", label: "Kelvin (K)" }
    ]
  }
};

export default function UnitConverterPage() {
  const [groupId, setGroupId] = useState("length");
  const [fromUnitId, setFromUnitId] = useState("m");
  const [toUnitId, setToUnitId] = useState("km");
  const [amount, setAmount] = useState("1");
  const [result, setResult] = useState(null);

  const group = useMemo(
    () => UNIT_GROUPS[groupId] || UNIT_GROUPS.length,
    [groupId]
  );

  // When group changes, reset from/to default
  const handleGroupChange = (id) => {
    const g = UNIT_GROUPS[id];
    setGroupId(id);
    if (g && g.units.length >= 2) {
      setFromUnitId(g.units[0].id);
      setToUnitId(g.units[1].id);
    }
    setResult(null);
  };

  const convert = () => {
    const value = parseFloat(amount);
    if (!value && value !== 0) {
      setResult(null);
      return;
    }

    if (groupId === "temperature") {
      // special handling
      const res = convertTemperature(value, fromUnitId, toUnitId);
      setResult(res);
    } else {
      const from = group.units.find((u) => u.id === fromUnitId);
      const to = group.units.find((u) => u.id === toUnitId);
      if (!from || !to) {
        setResult(null);
        return;
      }
      // base unit: meters or kilograms
      const inBase = value * from.factorToBase;
      const converted = inBase / to.factorToBase;
      setResult(converted);
    }
  };

  const convertTemperature = (val, from, to) => {
    if (from === to) return val;
    let inCelsius;

    // Convert from source unit to Celsius
    switch (from) {
      case "c":
        inCelsius = val;
        break;
      case "f":
        inCelsius = (val - 32) * (5 / 9);
        break;
      case "k":
        inCelsius = val - 273.15;
        break;
      default:
        inCelsius = val;
    }

    // Convert from Celsius to target
    switch (to) {
      case "c":
        return inCelsius;
      case "f":
        return inCelsius * (9 / 5) + 32;
      case "k":
        return inCelsius + 273.15;
      default:
        return inCelsius;
    }
  };

  const fmt = (n) =>
    typeof n === "number"
      ? n.toLocaleString(undefined, { maximumFractionDigits: 4 })
      : "";

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Conversion Tool</div>
          <h1 className="page-title">Unit Converter</h1>
          <p className="page-subtitle">
            Convert between common units for length, weight and temperature.
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
                <label className="label">Category</label>
                <select
                  className="select"
                  value={groupId}
                  onChange={(e) => handleGroupChange(e.target.value)}
                >
                  {Object.values(UNIT_GROUPS).map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">Value</label>
                <input
                  className="input"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 100"
                />
              </div>

              <div className="field">
                <label className="label">From</label>
                <select
                  className="select"
                  value={fromUnitId}
                  onChange={(e) => setFromUnitId(e.target.value)}
                >
                  {group.units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">To</label>
                <select
                  className="select"
                  value={toUnitId}
                  onChange={(e) => setToUnitId(e.target.value)}
                >
                  {group.units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.label}
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
            </div>

            {/* Right: result */}
            <div>
              <div className="result-box">
                <div className="result-title">Converted Value</div>
                <div className="result-value" style={{ fontSize: "1.2rem" }}>
                  {result === null ? "—" : fmt(result)}
                </div>
              </div>
              {result !== null && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  {amount || 0} {fromUnitId.toUpperCase()} = {fmt(result)}{" "}
                  {toUnitId.toUpperCase()}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
