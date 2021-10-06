import React, { useState, useContext, useEffect } from "react";

const getSymbolsURL = "https://api.binance.com/api/v3/exchangeInfo";
const baseEndpoint = "wss://stream.binance.com:9443/ws/";
const AppContext = React.createContext();

const AppProvider = ({ children }) =>{
    const [ allSymbols, setAllSymbols ] = useState([]);
    const [ loading, setLoading] = useState(true);
    const [ currentSymbol, setCurrentSymbol ] = useState("")

    const fetchSymbolsJson = async()=> {
        setLoading(true)
        try {
            const response = await fetch(getSymbolsURL);
            const { symbols } = await response.json();
            const symbolsArr = await symbols.map((item) => ({symbol: item.symbol,}));
            if (symbolsArr){
                setAllSymbols(symbolsArr);
                setLoading(false)
                return
            }
        }
        catch(error){
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSymbolsJson();
    }, [])

    return (
        <AppContext.Provider
            value={{
                allSymbols,
                loading,
                currentSymbol, 
                setCurrentSymbol,
                baseEndpoint
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppContext, AppProvider }




