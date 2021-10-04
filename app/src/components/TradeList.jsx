import React, { useEffect, useState } from 'react'
// For trades, the system should subscribe Aggregate Trade Streams.

export default function TradeList() {
  const baseEndpoint = "wss://stream.binance.com:9443/ws/";
  const SymbolName = ("BNBBTC").toLowerCase();
  const aggTrade = "@aggTrade";
  const tradeSocket = new WebSocket(`${baseEndpoint}${SymbolName}${aggTrade}`);
  const [ tradeBox, setTradeBox ] = useState([]);
  const [ currentTrades, setCurrentTrades ] =useState([])

  tradeSocket.onmessage = (event) => {
  
    let data = JSON.parse(event.data);
    let tradeTime = data.T;
    let tradePrice = data.p;
    let tradeQuantity = data.q;
    let singleTradeInfo = {
      tradeTime: new Date(tradeTime).toLocaleTimeString(),
      tradePrice, 
      tradeQuantity,
    };
    setTradeBox( oldArray => [...oldArray, singleTradeInfo]);
    setCurrentTrades(tradeBox);
  };
  useEffect(() => {
    if (tradeBox.length > 50) {
      setCurrentTrades(tradeBox.slice([tradeBox.length - 50]));
    }
  }, [tradeBox]);

    return (
      <div>
        <div className="box_title">
          <h1>Trade List</h1>
        </div>
        <div className="box_content">
          <ul>
            <li className="trade_item">
              <span>Index</span>
              <span>Time</span>
              <span>Price</span>
              <span>Quantity</span>
            </li>
            {currentTrades &&
              currentTrades.map((item, index) => {
                return (
                  <li className="trade_item" key={index}>
                    <span>{index + 1}</span>
                    <span>{item.tradeTime}</span>
                    <span>{item.tradePrice}</span>
                    <span>{item.tradeQuantity}</span>
                  </li>
                );
              })}
          </ul>
        </div>
        <div></div>
      </div>
    );
}
