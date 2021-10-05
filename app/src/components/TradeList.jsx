import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "../context/Context";

// For trades, the system should subscribe Aggregate Trade Streams.

export default function TradeList() {
  const { search, baseEndpoint } = useGlobalContext();
  const SymbolName = (search).toLowerCase();
  const aggTrade = "@aggTrade";

  const [tradeBox, setTradeBox] = useState([]);
  const [currentTrades, setCurrentTrades] = useState([]);



  function connectSocket(){
    const tradeSocket = new WebSocket(
        `${baseEndpoint}${SymbolName}${aggTrade}`
      );
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
    setTradeBox((oldArray) => [...oldArray, singleTradeInfo]);
    setCurrentTrades((oldArray) => [...oldArray, tradeBox]);
  };
  }


  useEffect(() => {
    if (tradeBox.length > 50) {
      setCurrentTrades(tradeBox.slice([tradeBox.length - 50, tradeBox.length]));
      setTradeBox(tradeBox.slice(0, tradeBox.length - 50));
      setTradeBox(tradeBox.splice(0, tradeBox.length - 50));
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
