import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { getSymbol } from '../redux/reducers/symbolReducer';



// Symbol selector is a free text field. 
//But it should have auto complete function when the user types 2 or more characters.



export default function SymbolSelector() {
  //  const dispatch = useDispatch();
  //  const [ serachTerm, setSearchTerm] = useState("a");
  //  const searchValue = useRef("");
  // function handleSubmit(e) {
  //   e.preventDefault();
  // }
  //  useEffect(() => {
  //    dispatch(getSymbol(serachTerm));
  //  }, [serachTerm]);

  //  useEffect(() => {
  //   searchValue.current.focus();
  //  }, [])
    


    return (
      <div>
        <div className="box_title">
          <h1>Symbol Selector</h1>
        </div>
        <div className="box_content">
          {/* <form onSubmit={handleSubmit}>
          <input
            type="text"
            ref={searchValue}
            onChange={() => setSearchTerm(searchValue.current.value)}
            autoComplete="on"
          />
          </form> */}
          <div>
            
          </div>
        </div>
      </div>
    );
}
