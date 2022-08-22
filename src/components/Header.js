import React, { useState } from "react";
import { fetchData } from "../store/dust/DustSlice";
import { useDispatch, useSelector } from "react-redux";
import { SIDO } from "../utils/Contents";

const Header = () => {
  // const state = useSelector((state) => state.dust.data);
  const dispatch = useDispatch();
  const Sido = useSelector((state) => state.dust.newSudo);
  const initialState = useSelector((state) => state.dust.initialState);
  console.log("123: ", initialState);
  const changeSidoHandler = async (e) => {
    setSelectData(e.target.value);
    dispatch(fetchData(e.target.value));
  };
  // select SIdodata
  // const [selectData, setSelectData] = useState(SIDO[0]);
  const [selectData, setSelectData] = useState(Sido.sidoName);
  // const [selectData, setSelectData] = useState(initialState);
  const sido = SIDO.map((item) => <option value={item}>{item}</option>);
  return (
    <header>
      <select value={selectData} onChange={changeSidoHandler}>
        {sido}
      </select>
    </header>
  );
};

export default Header;
