const MOCK_SUGGESTIONS = [
  {
    id: "location-1",
    state: "Buenos Aires",
    country: "Argentina",
  },

  {
    id: "location-2",
    state: "Budapest",
    country: "Hungary",
  },

  { id: "location-3", state: "Amsterdam", country: "Holland" },

  { id: "location-4", state: "Berlin", country: "Germany" },

  { id: "location-5", state: "London", country: "England" },
];
import AutocompleteMockItem from "./AutocompleteMockItem.jsx";
import { useRef, useEffect } from "react";
export default function AutocompleteMockList({ isOpen, onClose }) {
  const autocompleteDropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        autocompleteDropdownRef.current &&
        !autocompleteDropdownRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
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
          <ul role="group" aria-labelledby="group-0-heading" className="">
            <div id="group-0-heading" className="title-heading">
              Tus búsquedas recientes
            </div>
            <li className="" id="autocomplete-result-0" role="option">
              <div role="button" tabIndex="-1" className="divbutton">
                <div className="align-last-search">
                  <span
                    className="autocomplete-icon-search-history"
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="50px"
                    >
                      <path d="M13.5 22.75c5.799 0 10.5-4.701 10.5-10.5s-4.701-10.5-10.5-10.5S3 6.451 3 12.25V13a.75.75 0 0 0 1.5 0v-.75a9 9 0 1 1 9 9 .75.75 0 0 0 0 1.5M.22 10.527l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-3 3h1.06l-3-3a.75.75 0 0 0-1.06 1.06M12 6.247v6.75c0 .414.336.75.75.75H18a.75.75 0 0 0 0-1.5h-5.25l.75.75v-6.75a.75.75 0 0 0-1.5 0"></path>
                    </svg>
                  </span>
                  <div className="divcontent">
                    <div className="title-country font-country">Londres</div>
                    <div className="title-country font-people">2 adultos</div>
                  </div>
                </div>
              </div>
            </li>
            <li className="" id="autocomplete-result-1" role="option">
              <div role="button" tabIndex="-1" className="divbutton">
                <div
                  className="align-last-search"
                  data-testid="autocomplete-result"
                >
                  <span
                    className="autocomplete-icon-search-history"
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="50px"
                    >
                      <path d="M13.5 22.75c5.799 0 10.5-4.701 10.5-10.5s-4.701-10.5-10.5-10.5S3 6.451 3 12.25V13a.75.75 0 0 0 1.5 0v-.75a9 9 0 1 1 9 9 .75.75 0 0 0 0 1.5M.22 10.527l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-3 3h1.06l-3-3a.75.75 0 0 0-1.06 1.06M12 6.247v6.75c0 .414.336.75.75.75H18a.75.75 0 0 0 0-1.5h-5.25l.75.75v-6.75a.75.75 0 0 0-1.5 0"></path>
                    </svg>
                  </span>
                  <div className="divcontent">
                    <div className="title-country font-country">Madrid</div>
                    <div className="title-country font-people">2 adultos</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul role="group" aria-labelledby="group-1-heading" className="">
            <div id="group-1-heading" className="title-heading">
              Destinos de moda
            </div>
            {MOCK_SUGGESTIONS.map((location) => (
              <AutocompleteMockItem
                key={location.id}
                state={location.state}
                country={location.country}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
