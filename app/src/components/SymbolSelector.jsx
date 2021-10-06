import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from '../context/Context';

// Symbol selector is a free text field. 
// But it should have auto complete function when the user types 2 or more characters.

export default function SymbolSelector() {
  const {
    setSearchTerm,
    searchTerm,
    searchResult,
    updateSymbol,
  } = useGlobalContext();
  const [ display, setDisplay ] = useState(false);
  const wrapperRef = useRef(null);
  const searchValue = useRef("")
  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };
  function searchSymbol (){
    setSearchTerm(searchValue.current.value);
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });
    return (
      <section>
        <div className="box_title">
          <h1>Symbol Selector</h1>
        </div>
        <div className="box_content">
          <div ref={wrapperRef}>
            <input
              placeholder="Input Symbol"
              onClick={() => setDisplay(!display)}
              ref={searchValue}
              // value={searchTerm}
              onChange={() => searchSymbol()}
            />
            {display && (
              <div className="autoContainer">
                {searchResult &&
                  searchResult.map((value, i) => {
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
      </section>
    );
}
