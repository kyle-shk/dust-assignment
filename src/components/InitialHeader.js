import { useState, useEffect, Fragment } from "react";

import Option from "./Option";
import styled from "styled-components";

import CardHeader from "./CardHeader";
import DustTime from "./DustTime";

import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../store/dust/DustSlice";
import { SIDO } from "../utils/Contents";

import {
  newStation1,
  filterGuGunDatas,
  likeHandler,
  newStation,
} from "../store/dust/DustSlice";
const Section = styled.section`
  background-color: ${(props) => props.color || "gray"};

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
  const Station = useSelector((state) => state.dust.stationName);
  const newSudo = useSelector((state) => state.dust.newSudo);
  console.log("state: ", state);
  console.log("initialState: ", initialState);

  // select SIdodata
  const [selectData, setSelectData] = useState(SIDO[0]);

  // select like
  const [Like, setLike] = useState(false);
  // select station
  const [station, setStation] = useState(Station);
  // like change
  const changeLike = () => {
    dispatch(likeHandler());
  };

  const changeSidoHandler = (e) => {
    setSelectData(e.target.value);
    dispatch(fetchData(e.target.value));
  };

  const changeGuGunHandler = (e) => {
    // dispatch(filterGuGunDatas(e.target.value));
    setStation(e.target.value);
    dispatch(newStation1(Station));
    dispatch(newStation(e.target.value));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData(selectData));
    }
  }, [dispatch, state, status, selectData]);

  const option = initialState.map((item, idx) => (
    <Option item={item} idx={idx} />
  ));
  const sido = SIDO.map((item) => <option value={item}>{item}</option>);

  const Grade = (item) => {
    if (item.datagrade.length > 0) {
      return item.datagrade.map((item) => {
        return item.grade;
      });
    } else {
      return "알수없음";
    }
  };

  const Color = (item) => {
    if (item.datacolor.length > 0) {
      return item.datacolor.map((item) => {
        return item.color;
      });
    } else {
      return "";
    }
  };
  console.log("newSudo: ", newSudo);
  return (
    <Fragment>
      <header>
        <select value={selectData} onChange={changeSidoHandler}>
          {sido}
        </select>
        <select value={station} onChange={changeGuGunHandler}>
          {option}
        </select>
      </header>
      {!isLoading && (
        <Section color={Color(newSudo)}>
          <CardHeader
            sidoName={newSudo["sidoName"]}
            stationName={newSudo["stationName"]}
          />
          <Out>
            <Main>
              <div>
                <h1>{Grade(newSudo)}</h1>
              </div>
              <DustTime
                dataTime={newSudo["dataTime"]}
                pm10Value={newSudo["pm10Value"]}
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
