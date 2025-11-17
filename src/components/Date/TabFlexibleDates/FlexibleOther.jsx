import { memo } from "react";
function FlexibleOther({ inputOther, setInputValue }) {
  return (
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
  );
}
export default memo(FlexibleOther);
//me hizo pensar si se puede utilizar lazy para DatePicker y Flexible.jsx
