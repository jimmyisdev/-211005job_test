import MarketDepth from "./components/MarketDepth";
import SymbolSelector from "./components/SymbolSelector";
import TradeList from "./components/TradeList";
import "./styles.scss";

function App() {
  return (
    <div className="App">
      <SymbolSelector />
      <MarketDepth/>
      <TradeList/>
    </div>
  );
}

export default App;
