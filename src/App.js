import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './layouts/header';
import Footer from './layouts/footer';

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
                    <Route path="/map" element={<Map />} />
                    <Route path="/route-manager" element={<RouteManager />} />
                </Routes>
                {/* TODO: create a function for `action` that saves the lat and lng */}
                <Footer text="Continue" action={() => {}} />
            </BrowserRouter>
        </AppContextProvider>
    );
}
