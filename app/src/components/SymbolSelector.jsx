import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from '../context/Context';

// Symbol selector is a free text field. 
// But it should have auto complete function when the user types 2 or more characters.

export default function SymbolSelector() {
  const { allSymbols, loading, setCurrentSymbol } = useGlobalContext();
  const [ display, setDisplay ] = useState(false);
  const [ options, setOptions ] = useState([]);
  const [ search, setSearch ] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    let currentSearch = search.toUpperCase();
    let currentAutoSymbols = [];
    currentAutoSymbols = allSymbols.filter(
      ({ symbol }) => symbol.indexOf(currentSearch) > -1
    );
    setOptions(currentAutoSymbols)
  }, [search]);


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
  const updateSymbol = (symbol) => {
    setSearch(symbol);
    setDisplay(false);
    setCurrentSymbol(search);
  };



  if (loading) {
    return (
      <section className="box_content">
        <h1>loading</h1>
      </section>
    );
  }

    return (
      <section>
        <div className="box_title">
          <h1>Symbol Selector</h1>
        </div>
        <div className="box_content">
          <div ref={wrapperRef} className="search_area">
            <input
              onClick={() => setDisplay(!display)}
              placeholder="Input Symbol"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {display && (
              <div className="autoContainer">
                {options &&
                  options.map((value, i) => {
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

