import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Option from "./Option";
import styled from "styled-components";

import CardHeader from "./CardHeader";
import DustTime from "./DustTime";

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
const getParameters = {
  serviceKey:
    "/gSrNLJJIL6v8Agde0RJ3atI7TV+vU21Qn0ptieqzbXotwzXc+vJQNL5yRaiGRa3P6F3pVBU5kW4Ybj36dAULw==",
  returnType: "json",
  numOfRows: "100",
  sidoName: "서울",
  pageNo: "1",
  ver: "1.0",
};
const InitialHeader = () => {
  // loading
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);
  // select data
  const [selectData, setSelectData] = useState({
    sidoName: "서울",
    stationName: "중구",
    dataTime:
      new Date().getFullYear() +
      "-0" +
      new Date().getMonth() +
      "-0" +
      new Date().getDay() +
      " " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes(),

    pm10Value: 10,
  });
  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get(
      "B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty",
      { params: getParameters }
    );
    console.log("res: ", response);
    const post = response.data.response.body.items;
    console.log(post);
    setData(post);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onChange = (e) => {
    // find object -> data
    const selectStation = data.find(
      (item) => item.stationName === e.target.value
    );
    // .find((item) => item === e.target.value);

    setSelectData(selectStation);
  };
  const option = data.map((item, idx) => <Option item={item} idx={idx} />);

  return (
    <Fragment>
      <header>
        <select value={option.stationName} onChange={onChange}>
          {option}
        </select>
      </header>
      {!isLoading && (
        <Section>
          <CardHeader
            sidoName={selectData.sidoName}
            stationName={selectData.stationName}
          />
          <Out>
            <Main>
              <div>
                <h1>좋음</h1>
              </div>
              <DustTime
                dataTime={selectData.dataTime}
                pm10Value={selectData.pm10Value}
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
