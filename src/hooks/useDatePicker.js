import { useState } from "react";
import { Temporal } from "temporal-polyfill";

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year, month) {
  return Temporal.PlainDate.from({ year: year, month: month, day: 1 })
    .daysInMonth;
}

export function useDatePicker({ isCheckOutDate = false }) {
  const [currentDate, setCurrentDate] = useState(() => {
    const today = Temporal.Now.plainDateISO().with({ day: 1 });
    const nextMonth = today.with({ day: 1 }).add({ months: 1 });

    return !isCheckOutDate ? today : nextMonth;
  });

  const previousMonth = () => {
    const calculateNextMonth = Temporal.PlainDate.from({
      year: currentDate.year,
      month: currentDate.month,
      day: 1,
    });

    const generateMonth = calculateNextMonth.subtract({ months: 1 });
    setCurrentDate(generateMonth);
  };

  const nextMonth = () => {
    const today = Temporal.Now.plainDateISO();
    const currentMonthStart = today.with({ day: 1 });
    const maxMonth = currentMonthStart.add({ months: 14 });

    if (
      isCheckOutDate &&
      currentDate.year === maxMonth.year &&
      currentDate.month === maxMonth.month
    )
      return;

    const calculateNextMonth = Temporal.PlainDate.from({
      year: currentDate.year,
      month: currentDate.month,
      day: 1,
    });

    setCurrentDate(calculateNextMonth.add({ months: 1 }));
  };

  const blanks = Array.from({ length: currentDate.dayOfWeek });

  const days = Array.from(
    { length: getDaysInMonth(currentDate.year, currentDate.month) },
    (_, i) => i + 1
  );

  const calendarCells = [...blanks, ...days];

  const groupIntoWeeks = (cells) => {
    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }

    return weeks;
  };

  const daysInMonthSliced = groupIntoWeeks(calendarCells);

  function isDisabledDate(year, month, day) {
    if (!day) return true; 
    const selectedDate = Temporal.PlainDate.from({ year, month, day });
    const today = Temporal.Now.plainDateISO();


    return Temporal.PlainDate.compare(selectedDate, today) < 0;
  }

  function isDisabledArrowLeft() {
    const today = Temporal.Now.plainDateISO();

    return !isCheckOutDate && currentDate.month === today.month;
  }

  function isDisabledArrowRight() {
    const today = Temporal.Now.plainDateISO();
    const currentMonthStart = today.with({ day: 1 });
    const maxMonth = currentMonthStart.add({ months: 15 });
    return (
      isCheckOutDate &&
      currentDate.month === maxMonth.month &&
      currentDate.year == maxMonth.year
    );
  }

  return [
    weekdays,
    currentDate,
    daysInMonthSliced,
    previousMonth,
    nextMonth,
    isDisabledDate,
    isDisabledArrowLeft,
    isDisabledArrowRight,
  ];
}
