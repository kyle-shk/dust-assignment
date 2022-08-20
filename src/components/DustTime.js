import { Fragment } from "react";
import styled from "styled-components";

const DustBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;
const DustTime = ({ pm10Value, dataTime }) => {
  return (
    <Fragment>
      <DustBottom>
        <div>
          <span>미세먼지 수치: {pm10Value}</span>
        </div>
        <div>
          <p>{dataTime}기준</p>
        </div>
      </DustBottom>
    </Fragment>
  );
};
export default DustTime;
