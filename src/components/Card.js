import styled from "styled-components";
import CardHeader from "./CardHeader";
import DustTime from "./DustTime";
// import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";
import { fetchData } from "../store/dust/DustSlice";
// import axios from "axios";

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

const Card = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.dust.data);
  const isLoading = useSelector((state) => state.dust.isLoading);
  const status = useSelector((state) => state.dust.status);
  console.log("isLoading!!: ", isLoading);

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [state, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [dispatch, state, fetchData]);

  return (
    <Fragment>
      {!isLoading &&
        state.map((item) => (
          <Section>
            <CardHeader
              sidoName={item.sidoName}
              stationName={item.stationName}
            />
            <Out>
              <Main>
                <div>
                  <h1>좋음</h1>
                </div>
                <DustTime dataTime={item.dataTime} pm10Value={item.pm10Value} />
              </Main>
            </Out>
          </Section>
        ))}
      {isLoading && <Spinner></Spinner>}
    </Fragment>
  );
};

export default Card;
