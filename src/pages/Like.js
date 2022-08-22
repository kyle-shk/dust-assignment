import styled from "styled-components";
import CardHeader from "../components/CardHeader";
import DustTime from "../components/DustTime";

import React, { Fragment } from "react";
import { useSelector } from "react-redux";
// import { likeHandler } from "../store/dust/DustSlice";

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

function Like() {
  const newArray = useSelector((state) => state.dust.newArray);
  const isLoading = useSelector((state) => state.dust.isLoading);

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

  return (
    <Fragment>
      {!isLoading &&
        newArray.length > 0 &&
        newArray.map((item) => (
          // console.log('item["datagrade"][0]', item["datagrade"][0].grade)
          <Section color={Color(item)}>
            <CardHeader
              sidoName={item.sidoName}
              stationName={item.stationName}
            />
            <Out>
              <Main>
                <div>
                  <h1>{Grade(item)}</h1>
                </div>
                <DustTime dataTime={item.dataTime} pm10Value={item.pm10Value} />
              </Main>
            </Out>
          </Section>
        ))}
      {isLoading && <Spinner></Spinner>}
    </Fragment>
  );
}

export default Like;
