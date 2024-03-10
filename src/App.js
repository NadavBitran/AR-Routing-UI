import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './layouts/header';

import RouteManager from './pages/route-manager';
import Map from './pages/map';
import SendDataToServer from './pages/send-data-to-server'

import { useAppDataJson, useEndpointLocation} from './common/hooks';
import { ENDPOINT } from './common/constants/endpoints';

import { EndpointLocationContext } from './common/hooks/useEndpointLocation';

export default function App() {
    const [currEndpoint, setCurrEndpoint] = useEndpointLocation();
    const app = useAppDataJson({
        routeList: [],
        latlng: { lat: 0, lng: 0 },
    });

    return (
        <>
        <Header title={''} />
        <EndpointLocationContext.Provider value={{currEndpoint, setCurrEndpoint}}>
            {
                currEndpoint === ENDPOINT.MAP ? (
                    <Map saveMarkerLocation={app.setMapLatLngExpression}  />
                ) : 
                currEndpoint === ENDPOINT.ROUTE_MANAGER ? (
                    <RouteManager saveRouteList={app.setRouteListOfAppData}  />
                ) : (
                    <SendDataToServer json={app.json} />
                )
            }
        </EndpointLocationContext.Provider>
        </>
    );
}
