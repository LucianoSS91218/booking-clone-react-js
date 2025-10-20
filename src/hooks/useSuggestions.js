import { useState, useRef, useCallback } from "react";
import { getAutocompleteSuggestions } from "../services/urlapi.js";

export function useSuggestions({ search }) {
  const [citySuggestions, setCitiesSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorFetch, setError] = useState(null);

  const previousSearch = useRef({ search });

  const getData = useCallback(
    async ({ search }) => {
      if (search === previousSearch.current) return;

      try {
        setLoading(true);
        setError(null);
        previousSearch.current = search;

        const response = await getAutocompleteSuggestions({ search });

        setCitiesSuggestions(response);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [citySuggestions]
  );

  return { citySuggestions, loading, error: errorFetch, getData };
}
