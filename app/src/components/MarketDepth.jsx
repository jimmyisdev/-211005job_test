import { useEffect, useState} from 'react'
import { useGlobalContext } from "../context/Context";
// For market depth, the system should subscribe Partial Book Depth Streams(both 10 or 20 are fine).

export default function MarketDepth() {
  const { currentSymbol, baseEndpoint } = useGlobalContext();
  let currentSymbolToLowecase = currentSymbol.toLowerCase();
  const partialBookDepth = "@depth";
  const levels = 20;
  const [ asks, setAsks ] = useState([]);
  const [ bids, setBids ] = useState([]);

  function connectSocket() {
    const marketDepthSocket = new WebSocket(
      `${baseEndpoint}${currentSymbolToLowecase}${partialBookDepth}${levels}`
    );
      marketDepthSocket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        let askaData = data.asks;
        let bidsData = data.bids;
        let processedAsks = askaData.sort((a, b) => a[0] - b[0]);
        let processedBids = bidsData.sort((a, b) => a[0] - b[0]);
        setAsks(processedAsks);
        setBids(processedBids);
      };
  }
  useEffect(() => {
    if (currentSymbol) {
      setAsks([]);
      setBids([]);
      connectSocket();
    }
  }, [currentSymbol]);



  return (
    <section className="data_container">
      <div className="box_title">
        <h1>Market Deoth</h1>
      </div>
      <div className="box_content">
        <div className="sm_box">
          <div className="label">
            <h5>Ask</h5>
          </div>
          <ul className="sm_box_content">
            <li className="item_label">
              <span>price</span>
              <span>quantity</span>
            </li>
            {asks &&
              asks.map((item, index) => {
                return (
                  <li className="item_single" key={index}>
                    <span>{item[0]}</span>
                    <span>{item[1]}</span>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="sm_box">
          <div className="label">
            <h5>bid</h5>
          </div>
          <ul className="sm_box_content">
            <li className="item_label">
              <span>price</span>
              <span>quantity</span>
            </li>
            {bids &&
              bids.map((item, index) => {
                return (
                  <li className="item_single" key={index}>
                    <span>{item[0]}</span>
                    <span>{item[1]}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
}
