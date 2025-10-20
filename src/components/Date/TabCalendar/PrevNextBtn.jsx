import "./Button.css";

export function PrevNextBtn({ click, classarrow, pathsvg }) {
  return (
    <button
      type="click"
      onClick={click}
      className={`prev-next-btn ${classarrow}`}
    >
      <span className={`span-container-btnprevnext`}>
        <span className="span-minicontainer-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20px"
          >
            <path d={pathsvg}></path>
          </svg>
        </span>
      </span>
    </button>
  );
}
