import {React} from "react";

import useAppContext from "../../common/hooks/useAppContext";
import { useNavigate } from "react-router-dom";

import "../../styles/Map.css";

import Header from "../../layouts/header/header";
import Footer from "../../layouts/footer/footer";

import{ MapContainer, 
        TileLayer, 
        Marker } from "react-leaflet";

import MapEvent from "./components/MapEvent";
import MapSearchBar from "./components/MapSearchBar";

import useMarkerLocation from "./hooks/useMarkerLocation";

import { MAP_INITIAL_VALUES , 
         MAP_PAGE_FOOTER_BUTTON_TEXT , 
         MAP_TILES_PROPETIES , 
         MAP_HEADER_TITLE} from "./constants/mapConstants";


/**
 * Represents a Map component.
 * @returns {React.Component} The Map component.
 */
const Map = () => {
  const {markerLocation , latestMarkerUpdateOperation , updateMarkerLocation} = useMarkerLocation(MAP_INITIAL_VALUES.INITIAL_POSITION);
  const appData = useAppContext();
  const navigate = useNavigate();




  // TEMPOREY FUNCTIONS:
  const continueToRouteManager = () => {
    // update the app context with the marker location
    navigate("/route-manager");
   }
   const startMapTutorial = () => {
    // starting tutorial
   }
  const handleFooterButtonClick = (buttonIndex) => {
      switch(buttonIndex){
          case MAP_PAGE_FOOTER_BUTTON_TEXT.TUTORIAL:
              startMapTutorial();
              break;
          case MAP_PAGE_FOOTER_BUTTON_TEXT.CONTINUE:
              continueToRouteManager();
              break;
          default:
              break;
      }
   }
   

  
  return (
    <div className={"map"}>
      <Header title={MAP_HEADER_TITLE}/>
      <div className={"mapOuter-container"}>
        <MapSearchBar updateMarkerLocation={updateMarkerLocation}/>
          <MapContainer 
            center={MAP_INITIAL_VALUES.INITIAL_POSITION} 
            zoom={MAP_INITIAL_VALUES.INITIAL_ZOOM} 
            scrollWheelZoom={MAP_INITIAL_VALUES.INITIAL_SCROLL_WHEEL_ZOOM}
          >
            <TileLayer
              attribution={MAP_TILES_PROPETIES.ATTRIBUTION}
              url={MAP_TILES_PROPETIES.URL}
            />
            <Marker position={markerLocation}></Marker>
            <MapEvent 
                  markerLocation={markerLocation}
                  updateMarkerLocation={updateMarkerLocation}
                  latestMarkerUpdateOperation={latestMarkerUpdateOperation} />
        </MapContainer>
      </div>
      <Footer 
        buttonsKey={[MAP_PAGE_FOOTER_BUTTON_TEXT.TUTORIAL, MAP_PAGE_FOOTER_BUTTON_TEXT.CONTINUE]}
        buttonsContent={[MAP_PAGE_FOOTER_BUTTON_TEXT.TUTORIAL, MAP_PAGE_FOOTER_BUTTON_TEXT.CONTINUE]}
        buttonOnClickIndicator={handleFooterButtonClick}
        />
    </div>
  );
};

export default Map;
