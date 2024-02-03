import { createContext , useState} from 'react';


export const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
    
    const [appData , setAppData] = useState({});

    return (
        <AppContext.Provider value={{ appData , setAppData}}>
            {children}
        </AppContext.Provider>
    );
};
