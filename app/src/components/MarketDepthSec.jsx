import { useGlobalContext } from "../context/Context";
import DataDisplay from "./DataDisplay";
import Loading from "./Loading";
// For market depth, the system should subscribe Partial Book Depth Streams(both 10 or 20 are fine).

export default function MarketDepthSec() {
    const { dataLoading, dataDetail, asks, bids, currentSymbol } =
      useGlobalContext();

    if (dataLoading) {
        return (
            <Loading />
        );
    }
    return (
      <section>
        <div className="box_title">
          <h2>
            {currentSymbol && `${currentSymbol}`} - Market
            Depth
          </h2>
        </div>
        <div className="box_content">
          <DataDisplay dataTheme={dataDetail.ASK} dataContent={asks} />
          <DataDisplay dataTheme={dataDetail.BID} dataContent={bids} />
        </div>
      </section>
    );
}
