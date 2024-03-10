import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './layouts/header';

import RouteManager from './pages/route-manager';
import Map from './pages/map';
import JsonResult from './pages/json-result'

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
                    <JsonResult json={app.json} />
                )
            }
        </EndpointLocationContext.Provider>
        </>
    );

    // return (
    //     <BrowserRouter>
    //         <Header title={''} />
    //         <Routes>
    //             <Route
    //                 path="/"
    //                 element={<Navigate to={ENDPOINT.NAVIGATION + ENDPOINT.MAP} replace />}
    //             />
    //             <Route
    //                 path={ENDPOINT.NAVIGATION + ENDPOINT.MAP}
    //                 element={<Map saveMarkerLocation={app.setMapLatLngExpression} />}
    //             />
    //             <Route
    //                 path={ENDPOINT.NAVIGATION + ENDPOINT.ROUTE_MANAGER}
    //                 element={<RouteManager saveRouteList={app.setRouteListOfAppData} />}
    //             />
    //             <Route
    //                 path={ENDPOINT.NAVIGATION + ENDPOINT.JSON_RESULT}
    //                 element={<JsonResult json={app.json} />}
    //             />
    //         </Routes>
    //     </BrowserRouter>
    // );
}
