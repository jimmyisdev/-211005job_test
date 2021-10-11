import { useGlobalContext } from "../context/Context";
import DataDisplay from "./DataDisplay";
import Loading from "./Loading";

// For trades, the system should subscribe Aggregate Trade Streams.

export default function TradeListSec() {
  const { dataLoading, dataDetail, currentTrades, currentSymbol } =
    useGlobalContext();


  if (dataLoading) {
    return (
        <Loading/>
    );
  }
  return (
    <section className="data_container">
      <div className="box_title">
        <h2>
          {currentSymbol && `${currentSymbol} - `} Trade List
        </h2>
      </div>
      <div className="box_content">
        <DataDisplay dataTheme={dataDetail.TR} dataContent={currentTrades} />
      </div>
    </section>
  );
}
