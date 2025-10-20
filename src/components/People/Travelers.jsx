const TRAVELERS_OPTIONS = [
  {
    id: "group_adults",
    minvalue: 1,
    maxvalue: 30,
    label: "Adults",
  },
  {
    id: "group_children",
    minvalue: 0,
    maxvalue: 10,
    label: "Children",
  },
  {
    id: "rooms",
    minvalue: 1,
    maxvalue: 30,
    label: "Rooms",
  },
];

import "./Travelers.css";
import { useEffect, useRef } from "react";
import { useBookInOut } from "../../store/useBookInOut";

export function Travelers({ isOpen, onClose }) {
  const travelersRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        travelersRef.current &&
        !travelersRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const {
    howmanytravelers,
    handleIncreaseTravelersRooms,
    isActivePets,
    togglePets,
  } = useBookInOut();

  return (
    <div
      className="absolute-container"
      data-testid="occupancy-popup"
      id=":ri:"
      ref={travelersRef}
    >
      <div className="">
        {TRAVELERS_OPTIONS.map((opt) => {
          const currentValue = howmanytravelers[opt.id];

          return (
            <div className="center-container" key={opt.id}>
              <div className="">
                <label className="label-type-title" htmlFor={opt.id}>
                  {opt.label}
                </label>
              </div>
              <div className="div-field-btn">
                <button
                  tabIndex="-1"
                  type="button"
                  aria-hidden="true"
                  className={`button-value ${
                    currentValue === opt.minvalue ? "notallowed" : ""
                  }`}
                  onClick={() => {
                    const newValue = Math.max(opt.minvalue, currentValue - 1);
                    handleIncreaseTravelersRooms(opt.id, newValue);
                  }}
                >
                  <span className="span-decrease-increase-value">
                    <span className="span-icon" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="50px"
                        fill="currentColor"
                        style={{
                          color: `${
                            currentValue === opt.minvalue ? "gray" : "#006ce4"
                          }`,
                        }}
                      >
                        <path d="M20.25 12.75H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <span className="span-value" aria-hidden="true">
                  {currentValue}
                </span>
                <button
                  tabIndex="-1"
                  type="button"
                  aria-hidden="true"
                  className="button-value"
                  onClick={() => {
                    const newValue = Math.min(opt.maxvalue, currentValue + 1);
                    handleIncreaseTravelersRooms(opt.id, Number(newValue));
                  }}
                >
                  <span className="span-decrease-increase-value">
                    <span className="span-icon" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="50px"
                      >
                        <path d="M20.25 11.25h-7.5v-7.5a.75.75 0 0 0-1.5 0v7.5h-7.5a.75.75 0 0 0 0 1.5h7.5v7.5a.75.75 0 0 0 1.5 0v-7.5h7.5a.75.75 0 0 0 0-1.5"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
              <input
                type="range"
                className="range"
                id={opt.id}
                min={opt.minvalue}
                max={opt.maxvalue}
                step="1"
                aria-valuemin={opt.minvalue}
                aria-valuemax={opt.maxvalue}
                aria-valuenow={currentValue}
                value={currentValue}
                onChange={(e) =>
                  handleIncreaseTravelersRooms(opt.id, Number(e.target.value))
                }
              />
            </div>
          );
        })}
        <div className="div-pets">
          <input
            type="checkbox"
            name="pets"
            id="pets"
            aria-checked="false"
            role="switch"
            onChange={togglePets}
            value={isActivePets}
          />
          <label htmlFor="pets" className="label-pets" aria-live="polite">
            <span
              className={`span-checkbox ${isActivePets ? "petsactive" : ""}`}
              style={{
                backgroundColor: `${isActivePets ? "#006ce4" : "gray"}`,
              }}
            ></span>
            <span className="span-question">¿Viajas con mascotas?</span>
            <span className="span-absolute"></span>
          </label>
        </div>
        <div className="" style={{ margin: 0, display: "block" }}>
          <div className="div-service-pets">
            Los animales de servicio no se consideran mascotas.
            <button type="button" className="btn-service-pets">
              <span className="span-pets">
                Más info sobre viajar con animales de servicio
              </span>
            </button>
          </div>
        </div>
      </div>
      <button type="button" className="btn-ready">
        <span className="">Listo</span>
      </button>
    </div>
  );
}
