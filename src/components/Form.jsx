import "./Form.css";
import { useCallback, useMemo } from "react";
import { useId } from "react";
import { useMediaQuery } from "react-responsive";
import { Temporal } from "temporal-polyfill";
import Suggestions from "./Location/Suggestions.jsx";
import Fechas from "./Date/Fechas";
import { useBookInOut } from "../store/useBookInOut";
import { useToggle } from "../hooks/useToggle";
import { useSearch } from "../hooks/useSearch.js";
import { useSuggestions } from "../hooks/useSuggestions.js";
import debounce from "just-debounce-it";
import { Loader } from "./spinner/Loader.jsx";
import { lazy, Suspense } from "react";

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

const DAYS_NAMES = {
  1: "Lun",
  2: "Mar",
  3: "Mié",
  4: "Jue",
  5: "Vie",
  6: "Sáb",
  7: "Dom",
};

export function Form() {

  const isMobile = useMediaQuery({
    query: "(max-width: 900px)",
  });

  const inputId = useId();

  const [isOpenAutocomplete, openAutocomplete, closeAutocomplete] = useToggle();
  const [isOpenDate, openDate, closeDate] = useToggle();
  const [isOpenTravelers, openTravelers, closeTravelers] = useToggle();

  const LazyAutocompleteMock = lazy(() =>
    import("./Location/AutocompleteMockList.jsx")
  );

  const LazyTravelers = lazy(() => import("./People/Travelers.jsx"));

  const { search, updateSearch, errorForm } = useSearch();

  const { getData, citySuggestions, loading, error } = useSuggestions({
    search,
  });

  const debouncedSuggestions = useCallback(
    debounce((search) => {
      getData({ search });
    }, 300),
    [getData]
  );

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedSuggestions(newSearch);
  };

  const {
    checkInDate,
    checkOutDate,
    mode,
    displayMonths,
    timedays,
    howmanytravelers,
    isActivePets,
  } = useBookInOut();

  const night = {
    "Un fin de semana": "1 noche",
    "Una semana": "5 noches",
    "Un mes": "28 noches",
    Other: "",
  };

  const getWeekDayName = useCallback(({ year, month, day }) => {
    if (!year || !month || !day) return "";
    const date = Temporal.PlainDate.from({ year, month, day });
    return DAYS_NAMES[date.dayOfWeek];
  }, []);

  const monthName = useMemo(() => {
    return displayMonths.toSorted((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });
  }, [displayMonths]);

  const month1 = monthName?.length > 0 ? MONTHS_NAMES[monthName[0].month] : "";
  const month2 = monthName?.length > 1 ? MONTHS_NAMES[monthName[1].month] : "";
  const month3 = monthName?.length > 2 ? MONTHS_NAMES[monthName[2].month] : "";

  return (
    <div>
      <form aria-label="Buscar-alojamientos">
        <div className={`searchbox-layout- ${isMobile ? "vertical" : "wide"}`}>
          <div className="container-field">
            <div className="box">
              <div className="first-field">
                <div className="location-box">
                  <div className="align">
                    <div className="container-input">
                      <div className="container-locationicon">
                        <span className="location-icon" aria-hidden="true">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="50px"
                          >
                            <path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25m0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18m22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0m-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0m-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25m0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75z"></path>
                          </svg>
                        </span>
                      </div>

                      <input
                        type="text"
                        name="input-suggestion"
                        className=""
                        placeholder="En los alrededores de tu ubicación actual"
                        aria-label="En los alrededores de tu ubicación actual"
                        data-destination="1"
                        autoComplete="off"
                        aria-autocomplete="list"
                        aria-controls="autocomplete-results"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                        role="combobox"
                        id={inputId}
                        form=":r8:"
                        value={search}
                        onChange={handleChange}
                      />
                      {!isOpenAutocomplete && (
                        <div className="container-btn-close">
                          <button
                            type="button"
                            onClick={() => {
                              openAutocomplete();
                              closeDate();
                              closeTravelers();
                            }}
                          >
                            <span role="img" className="" aria-label="Borrar">
                              <svg
                                viewBox="0 0 128 128"
                                width="16px"
                                height="16px"
                              >
                                <path d="M69.7 64l33.1-33.2a4 4 0 0 0-5.6-5.6L64 58.3 30.8 25.2a4 4 0 1 0-5.6 5.6L58.3 64 25.2 97.2a4 4 0 1 0 5.6 5.6L64 69.7l33.2 33.1a4 4 0 0 0 5.6-5.6z"></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {isOpenAutocomplete && citySuggestions?.length === 0 ? (
                  <Suspense>
                    <LazyAutocompleteMock
                      isOpen={openAutocomplete}
                      onClose={closeAutocomplete}
                    />
                  </Suspense>
                ) : (
                  ""
                )}
                {loading && citySuggestions.length === 0 && <Loader />}
                {!loading &&
                  citySuggestions?.length > 0 &&
                  !isOpenDate &&
                  !isOpenTravelers && (
                    <div
                      className="autocomplete-results-container"
                      ref={autocompleteDropdownRef}
                    >
                      <div
                        className="wrapper-autocomplete"
                        id="autocomplete-results"
                        role="listbox"
                      >
                        <div className="container-box" role="listbox">
                          <ul>
                            {citySuggestions?.map((y) => (
                              <Suggestions
                                key={y.id}
                                city={y.city}
                                state={y.state}
                                country={y.country}
                              />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="container-field">
            <div className="box">
              <button
                data-testid="searchbox-dates-container"
                type="button"
                className="searchbox-dates-container"
                onClick={(e) => {
                  e.preventDefault();
                  openDate();
                  closeAutocomplete();
                  closeTravelers();
                }}
              >
                <span
                  className={`span-container max-width`}
                  style={{ padding: "2px 0px" }}
                >
                  <span
                    className="span-icon"
                    aria-hidden="true"
                    style={{ marginLeft: "5px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="50px"
                    >
                      <path d="M22.5 13.5v8.25a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75zm1.5 0V5.25A2.25 2.25 0 0 0 21.75 3H2.25A2.25 2.25 0 0 0 0 5.25v16.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5M7.5 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0M18 6V.75a.75.75 0 0 0-1.5 0V6A.75.75 0 0 0 18 6M5.095 14.03a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28A1.125 1.125 0 1 0 12 15a1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06M12 18a1.125 1.125 0 1 0 0 2.25A1.125 1.125 0 0 0 12 18a.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5m-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06m.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5"></path>
                    </svg>
                  </span>

                  {mode === null && (
                    <span>Fecha de entrada -- Fecha de salida</span>
                  )}

                  {mode === "calendar" ? (
                    <span>{`${getWeekDayName(checkInDate)}, ${
                      checkInDate?.day
                    } ${MONTHS_NAMES[checkInDate?.month]} -- ${getWeekDayName(
                      checkOutDate
                    )}, ${checkOutDate?.day ? checkOutDate?.day : ""} ${
                      checkOutDate?.month
                        ? MONTHS_NAMES[checkOutDate?.month]
                        : ""
                    }`}</span>
                  ) : (
                    ""
                  )}

                  {displayMonths?.length > 0 && mode === "flexible" && (
                    <span id="choose-days-months">{`${
                      timedays.flexibleOption
                    } en ${month1}${monthName.length > 1 ? "," : ""} ${month2}${
                      monthName.length > 1 ? "," : ""
                    } ${month3} (${night[timedays?.flexibleOption]})`}</span>
                  )}
                </span>
              </button>
              {isOpenDate && (
                <div style={{ position: "relative" }}>
                  <Fechas isOpen={isOpenDate} onClose={closeDate} />
                </div>
              )}
            </div>
          </div>

          <div className="container-field">
            <div className="box" tabIndex="-1">
              <button
                aria-controls=":ri:"
                aria-expanded="false"
                aria-label="Número de personas y de habitaciones. Selección actual: 2 adultos · 0 niños · 1 habitación"
                type="button"
                className="third-field-btn"
                onClick={(e) => {
                  e.preventDefault();
                  openTravelers();
                  closeAutocomplete();
                  closeDate();
                }}
              >
                <span
                  className={`span-container ${isActivePets ? "fitwidth" : ""}`}
                >
                  <span className="span-icon" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="50px"
                    >
                      <path d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0M18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0M3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0"></path>
                    </svg>
                  </span>
                  {`${howmanytravelers.group_adults} adultos ${
                    howmanytravelers.group_children
                  } Niños ${isActivePets ? "Mascotas" : ""} ${
                    howmanytravelers.rooms
                  } Habitacion `}
                </span>
                <span className="arrow-icon" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="arrowbottom"
                    width="50px"
                  >
                    <path d="M19.268 8.913a.9.9 0 0 1-.266.642l-6.057 6.057A1.3 1.3 0 0 1 12 16c-.35.008-.69-.123-.945-.364L4.998 9.58a.91.91 0 0 1 0-1.284.897.897 0 0 1 1.284 0L12 13.99l5.718-5.718a.897.897 0 0 1 1.284 0 .88.88 0 0 1 .266.642"></path>
                  </svg>
                </span>
              </button>
              <div style={{ position: "relative" }}>
                {isOpenTravelers && (
                  <Suspense>
                    <LazyTravelers
                      isOpen={isOpenTravelers}
                      onClose={closeTravelers}
                    />
                  </Suspense>
                )}
              </div>
            </div>
          </div>

          <div
            className="container-field"
            style={{ backgroundColor: "#ffb700" }}
          >
            <button
              title="Buscar hoteles"
              type="submit"
              className="container-submit"
            >
              <span className="span-search">Buscar</span>
            </button>
          </div>
        </div>

        <input type="hidden" name="ssne_untouched" defaultValue="Madrid" />
      </form>
    </div>
  );
}
