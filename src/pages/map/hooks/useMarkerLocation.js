import { useState, Dispatch, SetStateAction } from "react";

/**
 * Custom hook that manages the location of a marker on the map.
 * @param {{lat: number, lng: number}} initialPosition - The initial position of the marker.
 * @returns {[{lat: number, lng: number}, Dispatch<SetStateAction<{lat: number; lng: number;}>>]} - An object containing the marker's current position and functions to update it.
 */
const useMarkerLocation = (initialPosition) => {
  const [markerLocation, setMarkerLocation] = useState(initialPosition);

  const updateMarkerLocation = (lat, lng) => {
    setMarkerLocation({ lat, lng });
  };

  return [markerLocation, updateMarkerLocation];
};

export default useMarkerLocation;
