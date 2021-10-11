import React, { useState, useContext, useEffect } from "react";

const getSymbolsURL = "https://api.binance.com/api/v3/exchangeInfo";
const AppContext = React.createContext();

const AppProvider = ({ children }) =>{
    const [ allSymbols, setAllSymbols ] = useState([]);
    const [ loading, setLoading] = useState(true);
    const [ currentSymbol, setCurrentSymbol ] = useState("");


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
    }, []);
    useEffect(() => {
      fetchSymbolsJson();
    }, [currentSymbol]);




    // MarketDepth & Trade
    //marketDepth context
    const dataDetail = {
      ASK: {
        title: "Ask",
        label: ["Price", "Quantity"],
      },
      BID: {
        title: "BID",
        label: ["Price", "Quantity"],
      },
      TR: {
        title: "Latest 50 trades",
        label: ["Price", "Quantity", "Time"],
      },
    };
    const [dataLoading, setDataLoading] = useState(true);
    const [tradeBox, setTradeBox] = useState([]);
    const [asks, setAsks] = useState([]);
    const [bids, setBids] = useState([]);
    const [currentTrades, setCurrentTrades] = useState([]);

    const fetchStreamData = async () => {
        const baseEndpoint = "wss://stream.binance.com:9443/ws/"; 

        setDataLoading(true);
        try {
          //URL Const
            const aggTrade = "@aggTrade";
            const partialBookDepth = "@depth";
            const levels = 20;
            let currentSymbolToLowecase = currentSymbol.toLowerCase();
            const tradeSocket = new WebSocket(
                `${baseEndpoint}${currentSymbolToLowecase}${aggTrade}`
            );
            const marketDepthSocket = new WebSocket(
                `${baseEndpoint}${currentSymbolToLowecase}${partialBookDepth}${levels}`
            );


            //trade 
            tradeSocket.onmessage = (event) => {
                let data = JSON.parse(event.data);
                let tradeTime = data.T;
                tradeTime = new Date(tradeTime).toLocaleTimeString()
                let tradePrice = data.p;
                let tradeQuantity = data.q;
                let singleTradeInfo = [
                    tradePrice,
                    tradeQuantity,
                    tradeTime,
                ];
                setTradeBox((oldArray) => [...oldArray, singleTradeInfo]);
            };

            //market depth
            marketDepthSocket.onmessage = (event) => {
                let data = JSON.parse(event.data);
                let askaData = data.asks;
                let bidsData = data.bids;
                let processedAsks = askaData.sort((a, b) => a[0] - b[0]);
                let processedBids = bidsData.sort((a, b) => a[0] - b[0]);
                setAsks(processedAsks);
                setBids(processedBids);
            };
            if( tradeBox && asks ){
                setDataLoading(false);
            }
        } catch (error) {
            console.log(error);
            setDataLoading(false);
        }
    };
    useEffect(() => {
        if (tradeBox.length > 50) {
            tradeBox.splice(0, 1);
            setCurrentTrades(tradeBox);
        } else {
            setCurrentTrades(tradeBox);
        }
    }, [tradeBox]);
    useEffect(() => {
        if (currentSymbol){
            setTradeBox([]);
            setCurrentTrades([]);
            setAsks([]);
            setBids([]);
            fetchStreamData();
        }
    }, [currentSymbol]);

    return (
      <AppContext.Provider
        value={{
          allSymbols,
          loading,
          currentSymbol,
          setCurrentSymbol,
          currentTrades,
          dataDetail,
          dataLoading,
          asks,
          bids,
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













    // const fetchStreamData =  async()=> {
    //     const baseEndpoint = "wss://stream.binance.com:9443/ws/stream?streams=";
    //     let currentSymbolToLowecase = currentSymbol.toLowerCase();
    //     //marketDepth
    //     const levels = 20;
    //     const partialBookDepth = `${currentSymbolToLowecase}@depth${levels}`;
    //     //TradeList
    //     const aggTrade = `${currentSymbolToLowecase}@aggTrade`;
    //     try {
    //         console.log(currentSymbol);
    //         setDataLoading(true);
    //         const combineStreams = new WebSocket(
    //             `${baseEndpoint}${partialBookDepth}/${aggTrade}`
    //         );
    //         console.log("websock is runnging")
    //         combineStreams.onmessage = (event) => {
    //             let data =  JSON.parse(event.data);
    //             console.log(data)
    //             setStreamData(data);
    //             setDataLoading(false);
    //         };
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false);
    //     }
    // }
