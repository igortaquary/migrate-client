import { Location } from "../../types/location.types";

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";

//driving, walking (prefere caminhos e calçadas, quando disponível), bicycling (que usa ciclovias e ruas preferenciais, quando disponíveis), transit ou flying.

export const Map = ({
  origin,
  destination,
  mode = "driving",
}: {
  origin: Location;
  destination?: Location;
  mode?: string;
}) => {
  let stringParams = "";
  let mapMode = "directions";
  const concatLocation = (location: Location) =>
    location.address +
    ", " +
    location.district +
    ", " +
    location.city +
    ", " +
    location.state +
    ", " +
    location.country;

  if (destination) {
    const params = {
      key: key,
      origin: concatLocation(origin),
      destination: concatLocation(destination),
      mode,
    };

    stringParams = new URLSearchParams(params).toString();
  } else {
    const params = {
      key: key,
      center: origin.latitude + "," + origin.longitude,
      zoom: "19",
    };

    stringParams = new URLSearchParams(params).toString();
    mapMode = "view";
  }

  const mapsUrl = `https://www.google.com/maps/embed/v1/${mapMode}?${stringParams}`;

  return (
    <iframe
      src={mapsUrl}
      width='100%'
      height='450'
      allowFullScreen={false}
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'
    ></iframe>
  );
};
