import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';

import Header from './layouts/header';

//import PopupWindow from './Components/PopupWindow';
//import RouteManager from './Components/RouteManager';

import RouteManager from './pages/route-manager';
import Map from './pages/map';

import { AppContextProvider } from './common/contexts/AppContext';

export default function App() {
    return (
        <AppContextProvider>
            <BrowserRouter>
                <Header title={''} />
                <Routes>
                    <Route path="/"              element={<Navigate to="/map" replace />}/>
                    <Route path="/map"           element={<Map />} />
                    <Route path="/route-manager" element={<RouteManager />} />
                </Routes>
            </BrowserRouter>
        </AppContextProvider>
    );
}
