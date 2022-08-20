import { Fragment } from "react";
import styled from "styled-components";
const CardHeader = ({ sidoName, stationName }) => {
  const Top = styled.div`
    text-align: left;
    margin-left: 10px;
    display: flex;
    /* margin-top: 10px; */
    h2 {
      margin-right: 10px;
    }
  `;
  return (
    <Fragment>
      <Top>
        <h2>{stationName}</h2>
        <h4>{sidoName}</h4>
      </Top>
    </Fragment>
  );
};

export default CardHeader;
