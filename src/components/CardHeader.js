import { Fragment, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { likeHandler, newStation, newArray } from "../store/dust/DustSlice";
const CardHeader = ({ sidoName, stationName }) => {
  const Top = styled.div`
    text-align: left;
    margin-left: 10px;
    display: flex;
    /* margin-top: 10px; */
    justify-content: space-between;
    align-items: center;
    h2 {
      margin-right: 10px;
    }
  `;
  // select like
  const [Like, setLike] = useState(false);
  // station
  const [station, setStation] = useState(stationName);
  const dispatch = useDispatch();
  // like change
  const changeLike = () => {
    console.log("station: ", station);
    setLike(!Like);
    dispatch(likeHandler(Like));
    dispatch(newStation(station));
  };
  return (
    <Fragment>
      <Top>
        <div>
          <span>{stationName}</span>
          <span>{sidoName}</span>
        </div>
        <div onClick={changeLike}>
          {Like && <i class="fa-solid fa-star"></i>}
          {!Like && <i class="fa-regular fa-star"></i>}
        </div>
      </Top>
    </Fragment>
  );
};

export default CardHeader;
