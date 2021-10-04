import { useState} from 'react'


// For market depth, the system should subscribe Partial Book Depth Streams(both 10 or 20 are fine).

export default function MarketDepth() {
  const baseEndpoint = "wss://stream.binance.com:9443/ws/";
  const symbolName = "BNBBTC".toLowerCase();
  const partialBookDepth = "@depth";
  const levels = 20;
  const marketDepthSocket = new WebSocket(
    `${baseEndpoint}${symbolName}${partialBookDepth}${levels}`
  );
  const [ asks,  setAsks ] = useState([])
  const [ bids,  setBids ]= useState([])

  marketDepthSocket.onmessage = (event) => {
    let data = JSON.parse(event.data);
    // let askaData = (data.asks).sort((a, b) => a[0] - b[0]);
    // let bidsData = (data.bids).sort((a, b) => a[0] - b[0]);
    let askaData = data.asks;
    let bidsData = data.bids;


    setAsks(askaData);
    setBids(bidsData);

  };


    return (
      <div>
        <div className="box_title">
          <h1>Market Deoth</h1>
        </div>

        <div className="box_content">
          <div className="ask_box">
            <div className="label">
              <h5>Ask</h5>
            </div>
            <ul className="ask_content">
              <li className="market_item">
                <span>price</span>
                <span>quantity</span>
              </li>
              {asks &&
                asks.map((item) => {
                  return (
                    <li className="market_item">
                      <span>{item[0]}</span>
                      <span>{item[1]}</span>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="bid">
            <div className="label">
              <h5>bid</h5>
            </div>
            <ul className="ask_content">
              <li className="market_item">
                <span>price</span>
                <span>quantity</span>
              </li>
              {bids &&
                bids.map((item) => {
                  return (
                    <li className="market_item">
                      <span>{item[0]}</span>
                      <span>{item[1]}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
}
