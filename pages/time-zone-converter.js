import { useState } from "react";
import Link from "next/link";

// Simple fixed-offset time zones (no DST handling)
const TIMEZONES = [
  { id: "UTC", label: "UTC (Coordinated Universal Time)", offsetMinutes: 0 },
  { id: "Asia/Kolkata", label: "IST (UTC+5:30)", offsetMinutes: 5.5 * 60 },
  { id: "Asia/Dubai", label: "Gulf (UTC+4)", offsetMinutes: 4 * 60 },
  { id: "Europe/London", label: "UK (UTC+0)", offsetMinutes: 0 },
  { id: "Europe/Berlin", label: "CET (UTC+1)", offsetMinutes: 1 * 60 },
  { id: "America/New_York", label: "ET (UTC-5 approx.)", offsetMinutes: -5 * 60 },
  { id: "America/Los_Angeles", label: "PT (UTC-8 approx.)", offsetMinutes: -8 * 60 },
  { id: "Asia/Tokyo", label: "JST (UTC+9)", offsetMinutes: 9 * 60 },
  { id: "Australia/Sydney", label: "AET (UTC+10 approx.)", offsetMinutes: 10 * 60 }
];

function formatDateTime(dt) {
  const pad = (n) => String(n).padStart(2, "0");
  const year = dt.getFullYear();
  const month = pad(dt.getMonth() + 1);
  const day = pad(dt.getDate());
  const hours = pad(dt.getHours());
  const minutes = pad(dt.getMinutes());
  return {
    display: `${day}-${month}-${year} ${hours}:${minutes}`
  };
}

export default function TimeZoneConverterPage() {
  const today = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const defaultDate = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
    today.getDate()
  )}`;

  const [fromZoneId, setFromZoneId] = useState("Asia/Kolkata");
  const [toZoneId, setToZoneId] = useState("UTC");
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("09:00");
  const [result, setResult] = useState(null);

  const handleConvert = () => {
    if (!date || !time) {
      setResult(null);
      return;
    }

    const [year, month, day] = date.split("-").map((v) => parseInt(v, 10));
    const [hour, minute] = time.split(":").map((v) => parseInt(v, 10));

    if (
      Number.isNaN(year) ||
      Number.isNaN(month) ||
      Number.isNaN(day) ||
      Number.isNaN(hour) ||
      Number.isNaN(minute)
    ) {
      setResult(null);
      return;
    }

    const fromZone = TIMEZONES.find((z) => z.id === fromZoneId);
    const toZone = TIMEZONES.find((z) => z.id === toZoneId);
    if (!fromZone || !toZone) {
      setResult(null);
      return;
    }

    const baseUtcMs = Date.UTC(year, month - 1, day, hour, minute);
    const fromOffset = fromZone.offsetMinutes;
    const toOffset = toZone.offsetMinutes;

    const utcMs = baseUtcMs - fromOffset * 60000;
    const targetLocalMs = utcMs + toOffset * 60000;
    const target = new Date(targetLocalMs);

    const formatted = formatDateTime(target);

    const inputMidnight = new Date(Date.UTC(year, month - 1, day));
    const targetMidnight = new Date(
      Date.UTC(target.getFullYear(), target.getMonth(), target.getDate())
    );
    const diffDays =
      (targetMidnight.getTime() - inputMidnight.getTime()) /
      (1000 * 60 * 60 * 24);

    let dayNote = "";
    if (diffDays === 1) dayNote = "Next day in target time zone";
    else if (diffDays === -1) dayNote = "Previous day in target time zone";
    else if (diffDays > 1) dayNote = `${diffDays} days ahead in target time zone`;
    else if (diffDays < -1)
      dayNote = `${Math.abs(diffDays)} days behind in target time zone`;

    setResult({
      display: formatted.display,
      dayNote
    });
  };

  return (
    <div className="page-root">
      <main className="page-container">
        <header className="page-header">
          <div className="badge">Time Tool</div>
          <h1 className="page-title">Time Zone Converter</h1>
          <p className="page-subtitle">
            Convert a date and time from one time zone to another using fixed UTC offsets.
          </p>
          <div className="nav-links" style={{ marginTop: 10 }}>
            <Link href="/" className="nav-pill">← All Tools</Link>
          </div>
        </header>

        <div className="card">
          <div className="grid grid-2">
            <div>
              <div className="field">
                <label className="label">From time zone</label>
                <select
                  className="select"
                  value={fromZoneId}
                  onChange={(e) => setFromZoneId(e.target.value)}
                >
                  {TIMEZONES.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">To time zone</label>
                <select
                  className="select"
                  value={toZoneId}
                  onChange={(e) => setToZoneId(e.target.value)}
                >
                  {TIMEZONES.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">Date</label>
                <input
                  className="input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Time</label>
                <input
                  className="input"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={handleConvert}
              >
                Convert Time
              </button>
            </div>

            <div>
              <div className="result-box">
                <div className="result-title">Converted Time</div>
                <div className="result-value" style={{ fontSize: "1.1rem" }}>
                  {result ? result.display : "—"}
                </div>
              </div>
              {result?.dayNote && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  {result.dayNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
