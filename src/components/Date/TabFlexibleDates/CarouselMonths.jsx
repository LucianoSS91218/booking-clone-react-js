import { CiCalendarDate } from "react-icons/ci";

const MONTHS_NAMES = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export function CarouselMonths({
  value,
  handleFlexible,
  flexibledate,
  month,
  year,
}) {
  return (
    <li className="item">
      <label
        id={value}
        htmlFor={`month-item-${value}`}
        className={`month-card ${
          flexibledate.includes(value) ? "selected" : ""
        } ${flexibledate.length === 3 ? "disabled" : ""}`}
      >
        <input
          name={value}
          id={value}
          type="checkbox"
          checked={flexibledate.includes(value)}
          onChange={() => handleFlexible(value, month, year)}
        />
        <span className="span-container-text">
          <div className="month-content">
            <span aria-hidden="true">
              <CiCalendarDate
                size="18"
                className={`icondate ${
                  flexibledate.length === 3 ? "disabled" : ""
                } ${flexibledate.date?.includes(value) ? "selected" : ""}`}
              />
            </span>
            <span
              className={`monthname ${
                flexibledate.length === 3 ? "disabled" : ""
              } ${flexibledate.includes(value) ? "selected" : ""}`}
            >
              {MONTHS_NAMES[month]}
            </span>
            <span
              className={`year ${flexibledate.length === 3 ? "disabled" : ""} ${
                flexibledate.includes(value) ? "selected" : ""
              }`}
            >
              {year}
            </span>
          </div>
        </span>
      </label>
    </li>
  );
}
