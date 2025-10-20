import "./AutocompleteDropdown.css";

export function AutocompleteDropdown({ state, country }) {
  return (
    <li className="" id={location.id} key={location.id} role="option">
      <div role="button" tabindex="-1" className="divbutton">
        <div className="align-last-search" data-testid="autocomplete-result">
          <span className="span-autocomplete-default" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50px"
            >
              <path d="M15 8.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0m1.5 0a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0M12 1.5a6.75 6.75 0 0 1 6.75 6.75c0 2.537-3.537 9.406-6.75 14.25-3.214-4.844-6.75-11.713-6.75-14.25A6.75 6.75 0 0 1 12 1.5M12 0a8.25 8.25 0 0 0-8.25 8.25c0 2.965 3.594 9.945 7 15.08a1.5 1.5 0 0 0 2.5 0c3.406-5.135 7-12.115 7-15.08A8.25 8.25 0 0 0 12 0"></path>
            </svg>
          </span>
          <div className="divcontent">
            <div className="title-country font-country">{state}</div>
            <div className="title-country font-people">{country}</div>
          </div>
        </div>
      </div>
    </li>
  );
}
