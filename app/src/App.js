
import HeaderSec from "./components/HeaderSec";
import MarketDepthSec from "./components/MarketDepthSec";
import SymbolSelector from "./components/SymbolSelector";
import TradeListSec from "./components/TradeListSec";
import "./styles.scss";



function App() {

  return (
    <div className="App">
      <HeaderSec />
      <SymbolSelector />
      <MarketDepthSec />
      <TradeListSec/>
    </div>
  );
}

export default App;
