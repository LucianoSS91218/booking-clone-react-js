import { useState, useEffect, useRef } from "react";

export default function useInput() {
  const [value, updateValue] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = value;
      return;
    }

    if (value === "") {
      setError("You can't search for a movie with an empty field");
      return;
    }

    if (!value.match(/^[a-zA-Z\s'-]+$/)) {
      setError("You can't search for a movie with numbers or symbols.");
      return;
    }

    if (value.length < 3) {
      setError("The movie must contain at least 4 characters");
      return;
    }
    setError(null);
  }, [value]);

  return { isFirstInput, value, updateValue, error };
}
