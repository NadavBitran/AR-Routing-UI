import {
    useMapEvents,
  } from "react-leaflet";

import { useEffect } from "react";


const MapEvent = ({updateMarkerLocation}) => {
  const map = useMapEvents({
      click(e) {
        updateMarkerLocation(e.latlng.lat, e.latlng.lng);
      },
      locationfound(e){
        updateMarkerLocation(e.latlng.lat, e.latlng.lng);
        map.flyTo(e.latlng, map.getZoom());
      }
    });
    
    useEffect(() => {
      
      if(!map) {
        return; 
      }
      
      map.locate();
     
    }, [map]);

    return null;
};

export default MapEvent;