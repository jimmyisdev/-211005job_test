import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "../context/Context";

// For trades, the system should subscribe Aggregate Trade Streams.

export default function TradeList() {
  const { searchSymbol, baseEndpoint } = useGlobalContext();
  const aggTrade = "@aggTrade";
  const [tradeBox, setTradeBox] = useState([]);
  const [currentTrades, setCurrentTrades] = useState([]);

  function connectSocket(){
    // const tradeSocket = new WebSocket(
    //   `${baseEndpoint}${searchSymbol}${aggTrade}`
    // );
    const tradeSocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/ltcbtc${aggTrade}`
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
  };
  }
  useEffect(() => {
    setTradeBox([])
    setCurrentTrades([])
    connectSocket();
  }, [searchSymbol]);


  useEffect(() => {
    if (tradeBox.length > 50) {
      tradeBox.splice(0, 1);
      setCurrentTrades(tradeBox);

    }else{
      setCurrentTrades(tradeBox);
    }
  }, [tradeBox]);

  return (
    <section className="data_container">
      <div className="box_title">
        <h1>Trade List</h1>
      </div>
      <div className="box_content">
        <ul className="sm_box_content">
          <li className="item_label">
            <span>Time</span>
            <span>Price</span>
            <span>Quantity</span>
          </li>
          {currentTrades &&
            currentTrades.map((item, index) => {
              return (
                <li className="item_single" key={index}>
                  <span>{item.tradeTime}</span>
                  <span>{item.tradePrice}</span>
                  <span>{item.tradeQuantity}</span>
                </li>
              );
            })}
        </ul>
      </div>
      <div></div>
    </section>
  );
}
