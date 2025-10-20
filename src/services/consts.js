const BASE_URL = "https://api.geoapify.com/v1/geocode/";

export const getAutocompleteSuggestions = async ({ search }) => {
  if (search === "") return null;
  try {
    const response = await fetch(
      `${BASE_URL}autocomplete?` +
        `text=${encodeURIComponent(search)}&` +
        `type=city&` +
        `limit=8&` +
        `lang=es&` +
        `apiKey=${API_KEY}`
    );
    if (!response.ok) throw Error("Something went wrong!");
    const data = await response.json();

    const formattedSuggestions = data?.features
      ?.slice(0, 5)
      .map((place, index) => {
        return {
          id: `${place.properties.address_line1}-${index}`,
          city:
            place.properties.city ||
            place.properties.name ||
            place.properties.suburb,
          state: place.properties.state || place.properties.county,
          country: place.properties.country || "",
        };
      });

    return formattedSuggestions;
  } catch (err) {
    throw new Error("Error searching cities suggestions");
  }
};
