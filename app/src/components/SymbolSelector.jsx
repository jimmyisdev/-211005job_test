import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../context/Context';

// Symbol selector is a free text field. 
//But it should have auto complete function when the user types 2 or more characters.

export default function SymbolSelector() {
  //global context
  const { allSymbols, setSearch, search, display, setDisplay, updateSymbol } = useGlobalContext();

  //local
  const wrapperRef = useRef(null);
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  return (
    <div>
      <div className="box_title">
        <h1>Symbol Selector</h1>
      </div>
      <div className="box_content">
        <div ref={wrapperRef}>
          <input
            id="auto"
            onClick={() => setDisplay(!display)}
            placeholder="Type to search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {display && (
            <div className="autoContainer">
              {allSymbols
                .filter(
                  ({ symbol }) =>
                    symbol.indexOf(search.toUpperCase()) > -1
                )
                .map((value, i) => {
                  return (
                    <div
                      onClick={() => updateSymbol(value.symbol)}
                      className="option"
                      key={i}
                      tabIndex="0"
                    >
                      <span>{value.symbol}</span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
