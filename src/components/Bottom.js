import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
const LI = styled.li`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33333%;
  border: 1px solid yellow;
  &:hover {
    background-color: pink;
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 0;
`;

const DIV = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
`;

const Foot = styled.footer`
  position: fixed;
  bottom: 0;

  /* margin-left: 2px; */
  width: 100%;
  padding: 5px;
  border-top: 1px solid black;
  background-color: gray;
`;
const Bottom = () => {
  const [Name, setName] = useState({
    a: "",
    b: "",
    c: "",
  });
  const toggleHandler = (e) => {
    // ...Name,
    // [e.target.name] = 'color',
  };
  return (
    <Foot>
      <nav>
        <Ul>
          <LI>
            <DIV to="/Initial">
              <i className="fa-solid fa-location-dot"></i>
              <p>내 지역보기</p>
            </DIV>
          </LI>
          <LI>
            <DIV to="/">
              <i className="fa-solid fa-map-location-dot"></i>
              <p>전체 시도보기</p>
            </DIV>
          </LI>
          <LI>
            <DIV to="/Like">
              <i className="fa-solid fa-star"></i>
              <p>즐겨찾기</p>
            </DIV>
          </LI>
        </Ul>
      </nav>
    </Foot>
  );
};

export default Bottom;
