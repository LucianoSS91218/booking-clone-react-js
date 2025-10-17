import "./Tabs.css";
export function Tabs({ calendarTab, tabsOptions, onTabChange }) {
  return (
    <ul className="tabs">
      {Object.entries(tabsOptions).map(([key, value]) => (
        <li key={key}>
          <button
            onClick={() => onTabChange(value)}
            className={`${value === calendarTab ? "active" : ""}`}
          >
            <span>
              <div>
                <span id="name">{value}</span>
              </div>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
