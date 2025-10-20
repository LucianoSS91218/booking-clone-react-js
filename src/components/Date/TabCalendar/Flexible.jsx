import { Temporal } from "temporal-polyfill";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "./Flexible.css";
import { useCarouselRef } from "../../../hooks/useCarouselRef";
import { useBookInOut } from "../../../store/useBookInOut";
import { FlexibleDays } from "./FlexibleDays";
import { CarouselMonths } from "./CarouselMonths";
import { useState, useEffect } from "react";

const OPTIONS = [
  { id: "sdf945", value: "Un fin de semana", label: "Un fin de semana" },
  { id: "ert679", value: "Una semana", label: "Una semana" },
  { id: "kty823", value: "Un mes", label: "Un mes" },
  { id: "mjh503", value: "Other", label: "Otro" },
];

const MONTHS_NAMES = {
  1: "Ene",
  2: "Feb",
  3: "Mar",
  4: "Abr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Ago",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dic",
};

export function Flexible({ onConfirm }) {
  const {
    flexibleDate,
    displayMonths,
    timedays,
    handleFlexibleMonths,
    handleFlexibleTime,
  } = useBookInOut();

  const [closeButton, setCloseButton] = useState(false);

  const [inputOther, setInputValue] = useState(1);

  const todayISO = Temporal.Now.plainDateISO();

  const next12Months = Array.from({ length: 12 }, (_, i) =>
    todayISO.add({ months: i })
  );

  const { carouselContainerRef, scroll } = useCarouselRef();

  const night = {
    "Un fin de semana": "1 noche",
    "Una semana": "5 noches",
    "Un mes": "28 noches",
    Otro: "",
  };

  const monthName = displayMonths.toSorted((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year; // 2025 antes que 2026
    }
    return a.month - b.month;
  });

  const month1 = monthName?.length > 0 ? MONTHS_NAMES[monthName[0].month] : "";
  const month2 = monthName?.length > 1 ? MONTHS_NAMES[monthName[1].month] : "";
  const month3 = monthName?.length > 2 ? MONTHS_NAMES[monthName[2].month] : "";

  useEffect(() => {
    if (timedays.flexibleOption !== null && flexibleDate.length > 0) {
      setCloseButton(true);
    }
  }, [flexibleDate.length, timedays.flexibleOption]);

  return (
    <div className="flexible-container">
      <h3 id="howlongh3">¿Cuanto tiempo queres estar?</h3>

      <div className="container-options-radio">
        {OPTIONS.map((option) => (
          <FlexibleDays
            key={option.id}
            option={option}
            day={timedays.flexibleOption}
            handleOptionFlexible={handleFlexibleTime}
          />
        ))}
      </div>
      {timedays.flexibleOption === "Other" ? (
        <div
          className="custom-days-container"
          data-testid="flexible-dates-custom-days"
        >
          <legend id="duration-check-in-day-label-id" className="">
            Número de noches y día de check-in
          </legend>
          <div className="inline-select">
            <div className="child-first-field">
              <div className="child-child-first-field">
                <div className="div-input">
                  <input
                    type="number"
                    name=""
                    className=""
                    aria-labelledby="duration-check-in-day-label-id"
                    min="1"
                    max="90"
                    id=":r3t:"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputOther}
                  />
                  <div className="div-sibling-input"></div>
                </div>
                <div className="div-title-night">noche</div>
              </div>
            </div>
            <div className="child-last-field">
              <div className="" style={{ position: "relative" }}>
                <select
                  className=""
                  name=""
                  aria-labelledby="duration-check-in-day-label-id"
                  id=":r3u:"
                >
                  <option value="1" data-key="1">
                    Desde el lunes
                  </option>
                  <option value="2" data-key="2">
                    Desde el martes
                  </option>
                  <option value="3" data-key="3">
                    Desde el miércoles
                  </option>
                  <option value="4" data-key="4">
                    Desde el jueves
                  </option>
                  <option value="5" data-key="5">
                    Desde el viernes
                  </option>
                  <option value="6" data-key="6">
                    Desde el sábado
                  </option>
                  <option value="7" data-key="7">
                    Desde el domingo
                  </option>
                </select>
                <span className="span-container-icon">
                  <span className="span-child-icon" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20px"
                      fill="currentColor"
                      style={{ color: "#1a1a1a" }}
                    >
                      <path d="M19.268 8.913a.9.9 0 0 1-.266.642l-6.057 6.057A1.3 1.3 0 0 1 12 16c-.35.008-.69-.123-.945-.364L4.998 9.58a.91.91 0 0 1 0-1.284.897.897 0 0 1 1.284 0L12 13.99l5.718-5.718a.897.897 0 0 1 1.284 0 .88.88 0 0 1 .266.642"></path>
                    </svg>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <h3 id="whengo">¿Cuando queres ir?</h3>
      <p id="maxselectparagraph">Selecciona hasta 3 meses</p>

      <div className="contentWrapper">
        {carouselContainerRef.current?.scrollLeft > 0 && (
          <button type="click" className="arrow-btn">
            <span>
              <BsFillArrowLeftCircleFill
                size="20"
                className="carouselLeftNav arrowicon"
                onClick={() => scroll("left")}
              />
            </span>
          </button>
        )}

        <button className="arrow-btn">
          <span>
            <BsFillArrowRightCircleFill
              size="20"
              className="carouselRightNav arrowicon"
              onClick={() => scroll("right")}
            />
          </span>
        </button>

        <ul className="months-list" ref={carouselContainerRef}>
          {next12Months.map((m) => {
            const value = `${m.month}-${m.year}`;
            return (
              <CarouselMonths
                key={value}
                value={value}
                handleFlexible={handleFlexibleMonths}
                flexibledate={flexibleDate}
                month={m.month}
                year={m.year}
              />
            );
          })}
        </ul>
      </div>
      <hr></hr>
      <div className="submit">
        {displayMonths.length === 0 && timedays?.flexibleOption === null && (
          <span id="choose-days-months">Selecciona dias y meses</span>
        )}
        {displayMonths.length > 0 && timedays?.flexibleOption === null && (
          <span id="choose-days-months">Selecciona dias preferidos</span>
        )}
        {displayMonths.length === 0 && timedays?.flexibleOption !== null && (
          <span id="choose-days-months">Selecciona meses preferidos</span>
        )}
        {displayMonths.length > 1 && timedays?.flexibleOption !== null && (
          <span id="choose-days-months">{`${
            timedays?.flexibleOption
          } en ${month1}${monthName.length > 1 ? "," : ""} ${month2}${
            monthName.length === 2 ? "," : ""
          } ${month3} (${night[timedays?.flexibleOption]})`}</span>
        )}
        <button
          type="click"
          onClick={() => {
            if (closeButton) {
              onConfirm();
            }
          }}
          className={`btntoggle ${closeButton === true ? "toggleactive" : ""}`}
        >
          <span>Seleccionar las fechas</span>
        </button>
      </div>
    </div>
  );
}
