import React, { useState, useContext, useEffect } from "react";

const getSymbolsURL = "https://api.binance.com/api/v3/exchangeInfo";
//connect webSocket
const baseEndpoint = "wss://stream.binance.com:9443/ws/";

const AppContext = React.createContext();

const AppProvider = ({ children }) =>{
    const [ allSymbols, setAllSymbols ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState("")
    const [ searchResult, setSearchResult ] = useState([]);
    const [ display, setDisplay ] = useState( false );
    const [ currentSymbol, setCurrentSymbol ] = useState("");  

    async function fetchSymbolsJson (){
        try {
            const response = await fetch(getSymbolsURL);
            const { symbols } = await response.json();
            const symbolsArr = symbols.map((item) => ({ symbol: item.symbol }));
            setAllSymbols(symbolsArr); 
        } catch (error) {
            console.log(error)
        }
    };

    const filterSearchTerm = (searchTerm) => {
        if (allSymbols) {
            const filterResult = allSymbols.filter(
                ({ symbol }) => symbol.indexOf(searchTerm.toUpperCase()) > -1
            );
            if (filterResult) {
                setDisplay(true);
                setSearchResult(filterResult);
            } else {
                setDisplay(false);
                setSearchResult([]);
            }
        }
    };

    const updateSymbol = (searchTerm) => {
        // setSearchTerm(currentSymbol);
        setDisplay(false);
    };
    function displayToggle (){
        console.log("click")
        setDisplay(!display);
    }


    useEffect(() => {
        fetchSymbolsJson();
    }, [])

    // useEffect(() => {
    //     filterSearchTerm()
    // }, [searchTerm]);

    return (
        <AppContext.Provider
            value={(
                allSymbols,
                filterSearchTerm,
                setSearchTerm,
                searchTerm,
                searchResult,
                displayToggle,
                updateSymbol,
                baseEndpoint
                )}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppContext, AppProvider }




