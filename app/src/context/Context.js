import React, { useState, useContext, useEffect } from "react";

const getSymbolsURL = "https://api.binance.com/api/v3/exchangeInfo";
const AppContext = React.createContext();

const AppProvider = ({ children }) =>{
    const [ allSymbols, setAllSymbols] = useState([]);
    const [ display, setDisplay] = useState(false);
    const [ search, setSearch] = useState("");  
      const baseEndpoint = "wss://stream.binance.com:9443/ws/";
 

    const fetchSymbolsJson = async () => {
        const response = await fetch(getSymbolsURL);
        const { symbols } = await response.json();
        const symbolsArr = symbols.map((item) => ({ symbol: item.symbol }));
        setAllSymbols(symbolsArr);
    };

    const updateSymbol = (search) => {
        setSearch(search);
        setDisplay(false);
    };

     useEffect(() => {
        fetchSymbolsJson();
    }, []);

    return (
      <AppContext.Provider
        value={
          (allSymbols,
          setSearch,
          search,
          display,
          setDisplay,
          updateSymbol,
          baseEndpoint)
        }
      >
        {children}
      </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppContext, AppProvider }




