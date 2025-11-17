
const MONTHS_NAMES = {
  1: "Jan",
  2: "Feb",
  3: "March",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const DAYS_NAMES = {
  1: "Lun",
  2: "Mar",
  3: "Mié",
  4: "Jue",
  5: "Vie",
  6: "Sáb",
  7: "Dom",
};

import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import { Temporal } from "temporal-polyfill";
import { Tabs } from "./Tabs";
import { PrevNextBtn } from "./TabCalendar/PrevNextBtn";
import DatePicker from "./TabCalendar/DatePicker";
import { FooterCalendar } from "./TabCalendar/FooterCalendar";
import { Flexible } from "./TabFlexibleDates/Flexible";
import "./Fechas.css";
import { useDatePicker } from "../../hooks/useDatePicker";
import { useBookInOut } from "../../store/useBookInOut";
import { DATE_TABS } from "../../consts";

export default function Fechas({ isOpen, onClose }) {
  const [calendarTab, setCalendarTab] = useState("Calendario");

  const onTabChange = (tab) => {
    setCalendarTab(tab === "Calendario" ? "Calendario" : "Fechas Flexibles");
  };

  const [
    weekdays1,
    currentDate1,
    daysInMonthSliced1,
    previousMonth1,
    nextMonth1,
    isDisabledDate1,
    isDisabledArrowLeft1,
    isDisabledArrowRight1,
  ] = useDatePicker({});

  const [
    weekdays2,
    currentDate2,
    daysInMonthSliced2,
    previousMonth2,
    nextMonth2,
    isDisabledDate2,
    isDisabledArrowLeft2,
    isDisabledArrowRight2,
  ] = useDatePicker({ isCheckOutDate: true });

  const { mode, checkInDate, checkOutDate, handleCheckIn, handleCheckOut } =
    useBookInOut();

  const searchboxRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchboxRef.current &&
        !searchboxRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflowY = "auto";
    };
  }, [isOpen, onClose]);

  const [hoverDate, setHoverDate] = useState(null);

  function handleMouseEnter(date) {
    if (checkInDate.day !== null && checkOutDate.day === null) {
      setHoverDate(date);
    }
  }

  function handleMouseLeave() {
    setHoverDate(null);
  }

  const isisDisabledArrowLeft = isDisabledArrowLeft1();

  const isisDisabledArrowRight = isDisabledArrowRight2();

  const getWeekDayName = ({ year, month, day }) => {
    if (!year || !month || !day) return "";

    const date = Temporal.PlainDate.from({
      year: year,
      month: month,
      day: day,
    });
    return DAYS_NAMES[date.dayOfWeek];
  };

  return ReactDOM.createPortal(
    <div className="searchbox-wrapper" ref={searchboxRef}>
      <div>
        <nav>
          <div className="container-tabs">
            <Tabs
              calendarTab={calendarTab}
              tabsOptions={DATE_TABS}
              onTabChange={onTabChange}
            />
          </div>
          <div
            className="calendar-searchboxdatepicker"
            style={{ display: "block" }}
          >
            {calendarTab === DATE_TABS.CALENDAR && (
              <div style={{ padding: "0px" }}>
                <div tabIndex="-1" className="searchbox-datepicker-calendar">
                  {!isisDisabledArrowLeft && (
                    <PrevNextBtn
                      click={() => {
                        previousMonth1();
                        previousMonth2();
                      }}
                      classarrow="arrowleft"
                      pathsvg="M14.09 19.24a.87.87 0 0 1-.64-.27l-6.06-6.06c-.25-.25-.39-.59-.39-.94s.12-.69.36-.94l6.06-6.06a.909.909 0 0 1 1.3 1.27l-.02.02-5.69 5.72 5.72 5.72c.35.35.36.91.02 1.27l-.02.02a.9.9 0 0 1-.64.27"
                    />
                  )}
                  {!isisDisabledArrowRight && (
                    <PrevNextBtn
                      click={() => {
                        nextMonth1();
                        nextMonth2();
                      }}
                      classarrow="arrowright"
                      pathsvg="M9.91 19.24c.24 0 .47-.09.64-.27l6.06-6.06c.25-.25.39-.59.39-.94s-.12-.69-.36-.94l-6.06-6.06a.909.909 0 0 0-1.3 1.27l.02.02 5.69 5.72-5.72 5.72c-.35.35-.36.91-.02 1.27l.02.02c.17.17.4.27.64.27"
                    />
                  )}

                  <div className="divide-datepicker">
                    <DatePicker
                      currentDate={currentDate1}
                      weekDays={weekdays1}
                      calendarCells={daysInMonthSliced1}
                      isDisabledDate={isDisabledDate1}
                      handleClick={handleCheckIn}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                      checkin={checkInDate}
                      hoverDate={hoverDate}
                    />
                    <DatePicker
                      currentDate={currentDate2}
                      weekDays={weekdays2}
                      calendarCells={daysInMonthSliced2}
                      isDisabledDate={isDisabledDate2}
                      handleClick={handleCheckOut}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                      checkout={checkOutDate}
                      hoverDate={hoverDate}
                    />
                  </div>
                </div>

                <div>
                  <div className="datepicker-footer">
                    <fieldset>
                      <div className="flexible-dates-container">
                        <FooterCalendar />
                      </div>
                    </fieldset>
                  </div>
                </div>

                {mode === "calendar" ? (
                  <span>{`${getWeekDayName(checkInDate)}, ${checkInDate?.day} ${
                    MONTHS_NAMES[checkInDate?.month]
                  } -- ${getWeekDayName(checkOutDate)}, ${
                    checkOutDate?.day ? checkOutDate?.day : ""
                  } ${
                    checkOutDate?.month ? MONTHS_NAMES[checkOutDate?.month] : ""
                  }`}</span>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>

          {calendarTab === DATE_TABS.FLEXIBLE_DATES && (
            <Flexible onConfirm={onClose} />
          )}
        </nav>
      </div>
    </div>,
    document.getElementById("checkin-checkout-flexible-booking")
  );
}
