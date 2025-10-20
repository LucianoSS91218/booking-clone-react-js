import "./DatePicker.css";
import { Temporal } from "temporal-polyfill";
const MONTHS_NAMES = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "Jule",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "Dicember",
};

export function DatePicker({
  currentDate,
  weekDays,
  calendarCells,
  isDisabledDate,
  handleClick,
  handleMouseEnter,
  handleMouseLeave,
  checkin,
  checkout,
  hoverDate,
}) {

  const todayISO = Temporal.Now.plainDateISO();

  return (
    <div className="container-datepicker">
      <h3>{`${MONTHS_NAMES[currentDate.month]} of ${currentDate.year}`}</h3>
      <table className="" role="grid">
        <thead aria-hidden="true">
          <tr>
            {weekDays.map((day) => (
              <th scope="col" className="" key={day}>
                <div>{day}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* MAPEAR LAS SEMANAS usando tu estructura */}
          {calendarCells.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                const isInRange =
                  day > checkin?.day &&
                  hoverDate <= checkin?.day &&
                  hoverDate > checkin?.day
                    ? "in-range"
                    : "";

                const dayClassname = isInRange ? "in-range" : "";

                return (
                  <td key={dayIndex}>
                    <span
                      role="button"
                      key={dayIndex}
                      onClick={() => {
                        if (day === undefined) return;

                        const disabled = isDisabledDate(
                          currentDate.year,
                          currentDate.month,
                          day
                        );

                        if (disabled) return;

                        handleClick(day, currentDate.month, currentDate.year);
                      }}
                      onMouseEnter={() => {
                        if (!day) return;
                        handleMouseEnter(day);
                      }}
                      onMouseLeave={() => {
                        if (!day) return;
                        handleMouseLeave();
                      }}
                      className={`span-container-daycell ${
                        !day ||
                        isDisabledDate(currentDate.year, currentDate.month, day)
                          ? "day-disabled"
                          : ""
                      } 
    
    ${
      (currentDate.month === todayISO.month + 1 && day <= hoverDate) ||
      (hoverDate > checkin?.day && day < hoverDate && day > checkin?.day)
        ? "in-range"
        : ""
    }


    ${Number(day) === checkin?.day ? "check-in-day" : ""}
    ${Number(day) === checkout?.day ? "check-out-day" : ""}

    ${
      Number(day) === todayISO.day &&
      currentDate.month === todayISO.month &&
      "current-day"
    }
  `}
                    >
                      <span>{day || ""}</span>
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
