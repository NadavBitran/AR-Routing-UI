import React from 'react';

import { AppContext } from '../../common/contexts/AppContext';

import Header from '../../layouts/header';
import Footer from '../../layouts/footer';

import useAppContext from '../../common/hooks/useAppContext';
import { useNavigate } from 'react-router-dom';
import useMarkerLocation from './hooks/useMarkerLocation';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MapEvent from './components/MapEvent';
import MapSearchBar from './components/MapSearchBar';

import {
    MAP_INITIAL_VALUES,
    MAP_PAGE_FOOTER_BUTTON_TEXT,
    MAP_HEADER_TITLE,
    MAP_TILES_PROPETIES,
} from './constants/mapConstants';
import '../../styles/Map.css';

/**
 * Represents a Map component.
 * @returns {React.JSX.Element} The Map component.
 */
export default function Map() {
    const {
        markerLocation,
        latestMarkerUpdateOperation,
        updateMarkerLocation,
    } = useMarkerLocation(MAP_INITIAL_VALUES.INITIAL_POSITION);
    const appData = useAppContext();
    const navigate = useNavigate();

    // TEMPOREY FUNCTIONS:
    const continueToRouteManager = () => {
        // update the app context with the marker location
        navigate('/route-manager');
    };
    const startMapTutorial = () => {
        // starting tutorial
    };
    const handleFooterButtonClick = (buttonIndex) => {
        switch (buttonIndex) {
            case MAP_PAGE_FOOTER_BUTTON_TEXT.TUTORIAL:
                startMapTutorial();
                break;
            case MAP_PAGE_FOOTER_BUTTON_TEXT.CONTINUE:
                continueToRouteManager();
                break;
            default:
                break;
        }
    };

    return (
        <div className={'map'}>
            <Header title={MAP_HEADER_TITLE} />
            <div className={'mapOuter-container'}>
                <MapSearchBar updateMarkerLocation={updateMarkerLocation} />
                <MapContainer
                    center={MAP_INITIAL_VALUES.INITIAL_POSITION}
                    zoom={MAP_INITIAL_VALUES.INITIAL_ZOOM}
                    scrollWheelZoom={
                        MAP_INITIAL_VALUES.INITIAL_SCROLL_WHEEL_ZOOM
                    }
                >
                    <TileLayer
                        attribution={MAP_TILES_PROPETIES.ATTRIBUTION}
                        url={MAP_TILES_PROPETIES.URL}
                    />
                    <Marker position={markerLocation}></Marker>
                    <MapEvent
                        markerLocation={markerLocation}
                        updateMarkerLocation={updateMarkerLocation}
                        latestMarkerUpdateOperation={
                            latestMarkerUpdateOperation
                        }
                    />
                </MapContainer>
            </div>
            <Footer
                buttonsKey={[
                    MAP_PAGE_FOOTER_BUTTON_TEXT.TUTORIAL,
                    MAP_PAGE_FOOTER_BUTTON_TEXT.CONTINUE,
                ]}
                buttonsContent={[
                    MAP_PAGE_FOOTER_BUTTON_TEXT.TUTORIAL,
                    MAP_PAGE_FOOTER_BUTTON_TEXT.CONTINUE,
                ]}
                buttonOnClickIndicator={handleFooterButtonClick}
            />
        </div>
    );
}
