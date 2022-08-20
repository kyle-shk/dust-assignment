import { useState, useEffect, Fragment } from "react";

import Option from "./Option";
import styled from "styled-components";

import CardHeader from "./CardHeader";
import DustTime from "./DustTime";

import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../store/dust/DustSlice";
import { SIDO } from "../utils/Contents";

import { filterGuGunDatas } from "../store/dust/DustSlice";
const Section = styled.section`
  background-color: skyblue;

  border-radius: 10px;
  width: 60%;
  margin: 10px auto;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    background: white;
    padding: 20px;
    border-radius: 10px;
  }
`;

const Out = styled.div``;

const Spinner = styled.div`
  border: 10px solid #f3f3f3;
  border-top: 10px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const InitialHeader = () => {
  const dispatch = useDispatch();
  let state = useSelector((state) => state.dust.data);
  const isLoading = useSelector((state) => state.dust.isLoading);
  const status = useSelector((state) => state.dust.status);
  const initialState = useSelector((state) => state.dust.initialdata);
  console.log("state: ", state);
  console.log("initialState: ", initialState);

  // select SIdodata
  const [selectData, setSelectData] = useState(SIDO[0]);

  // select stationName
  // console.log("station: ", station);
  // const [station, setStation] = useState(state[0].stationName);

  const changeSidoHandler = async (e) => {
    setSelectData(e.target.value);
    dispatch(fetchData(e.target.value));
  };

  const changeGuGunHandler = (e) => {
    dispatch(filterGuGunDatas(e.target.value));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData(selectData));
    }
  }, [dispatch, state, status, selectData]);

  const option = state.map((item, idx) => <Option item={item} idx={idx} />);
  const sido = SIDO.map((item) => <option value={item}>{item}</option>);
  return (
    <Fragment>
      <header>
        <select value={selectData} onChange={changeSidoHandler}>
          {sido}
        </select>
        <select value={state.stationName} onChange={changeGuGunHandler}>
          {option}
        </select>
      </header>
      {!isLoading && (
        <Section>
          <CardHeader
            sidoName={state["sidoName"]}
            stationName={state["stationName"]}
          />
          <Out>
            <Main>
              <div>
                <h1>좋음</h1>
              </div>
              <DustTime
                dataTime={state["dataTime"]}
                pm10Value={state["pm10Value"]}
              />
            </Main>
          </Out>
        </Section>
      )}
      {isLoading && <Spinner />}
    </Fragment>
  );
};

export default InitialHeader;
