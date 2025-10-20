import "./FooterCalendar.css";

const OPTIONS_CALENDAR = [
  { name: "Exact Dates" },
  { name: "1 day" },
  { name: "2 days" },
  { name: "3 days" },
  { name: "7 days" },
];

import { useBookInOut } from "../../../store/useBookInOut";

export function FooterCalendar() {
  const { handleCalendarTime, timedays } = useBookInOut();

  return (
    <ul>
      {OPTIONS_CALENDAR.map((opt) => (
        <li key={opt.name} role="group">
          <label key={opt.name}>
            <input
              className=""
              name={opt.name}
              type="checkbox"
              value={opt.name}
              onChange={() => handleCalendarTime(opt.name)}
            />
            <span
              className={`span-container-flexibledates ${
                opt.name === timedays?.dateOption ? "active" : ""
              }`}
            >
              {opt.name !== "Fechas Exactas" && (
                <span className="span-icon-container">
                  <span className="lastSpan-icon-svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="50px"
                      fill="currentColor"
                      style={{
                        color:
                          opt.name === timedays?.dateOption ? "#006ce4" : "",
                      }}
                    >
                      <path d="M21.14 22.94a1 1 0 0 1-1 1H3.86a1 1 0 1 1 0-2h16.28a1 1 0 0 1 1 1M4 10h7v7a1 1 0 0 0 2 0v-7h7a1 1 0 0 0 0-2h-7V1a1 1 0 0 0-2 0v7H4a1 1 0 0 0 0 2"></path>
                    </svg>
                  </span>
                </span>
              )}

              <span className="span-flexible-name">{opt.name}</span>
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
