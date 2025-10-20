export function FlexibleDays({ option, day, handleOptionFlexible }) {
  return (
    <div className="common-options-container">
      <input
        name="optionsGroup"
        type="radio"
        id={`radio-${option.id}`}
        checked={day === option.value}
        onChange={() => handleOptionFlexible(option.value)}
      />
      <span>{option.label}</span>
    </div>
  );
}
