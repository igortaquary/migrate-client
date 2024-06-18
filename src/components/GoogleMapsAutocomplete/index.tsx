import { useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";

export const GoogleMapsAutocomplete = () => {
  const [location, setLocation] = useState<any>();

  const handleChangeLocation = async (loc: any) => {
    setLocation(loc);

    try {
      if (loc?.value?.place_id) {
        console.log(loc.value.place_id);
        const results = await geocodeByPlaceId(loc.value.place_id);

        const result = results[0];
        console.log(result);
        if (result) {
          const latitude = result.geometry.location.lat();
          const longitude = result.geometry.location.lng();
        } else {
          console.log("Sem resultados de endereço");
        }
        //setAddress(result)
      }
    } catch (error) {
      console.log(error);
    }

    let a = {
      label: "Park Sul Park Studios - Brasília, DF",
      value: {
        description: "Park Sul Park Studios - Brasília, DF",
        matched_substrings: [{ length: 10, offset: 9 }],
        place_id: "ChIJP4gzmjEwWpMRwI0lpN71qEM",
        reference: "ChIJP4gzmjEwWpMRwI0lpN71qEM",
        structured_formatting: {
          main_text: "Park Studios",
          main_text_matched_substrings: [{ length: 10, offset: 0 }],
          secondary_text: "Park Sul - Brasília, DF",
        },
        terms: [
          { offset: 0, value: "Park Sul" },
          { offset: 9, value: "Park Studios" },
          { offset: 24, value: "Brasília" },
          { offset: 34, value: "DF" },
        ],
        types: ["premise", "geocode"],
      },
    };
  };

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        minLengthAutocomplete={3}
        autocompletionRequest={{
          componentRestrictions: {
            country: ["br"],
          },
        }}
        apiOptions={{
          language: "pt-BR",
          region: "br",
        }}
        selectProps={{
          placeholder: "Selecione...",
          value: location,
          onChange: handleChangeLocation,
        }}
      />
    </div>
  );
};
