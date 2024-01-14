import {
    useMapEvents,
  } from "react-leaflet";

import { useEffect } from "react";
import {MARKER_UPDATE_OPERATION} from '../constants/mapConstants';

const MapEvent = ({markerLocation , updateMarkerLocation , latestMarkerUpdateOperation}) => {
  const map = useMapEvents({
      click(e) {
        updateMarkerLocation(e.latlng.lat, e.latlng.lng , MARKER_UPDATE_OPERATION.CLICK);
      },
      locationfound(e){
        updateMarkerLocation(e.latlng.lat, e.latlng.lng , MARKER_UPDATE_OPERATION.USER_LOCATION);
        map.setView(e.latlng);
      }
      
      
    });
    
    useEffect(() => {
      
      if(!map) {
        return; 
      }
      
      map.locate();
     
    }, [map]);

    useEffect(() => {

      if(latestMarkerUpdateOperation === MARKER_UPDATE_OPERATION.SEARCH){
        map.flyTo(markerLocation , map.getZoom());
      }
      
    }, [markerLocation , latestMarkerUpdateOperation , map])


    return null;
};

export default MapEvent;