// import Bottom from "../components/Bottom";
// import { Fragment } from "react";
// const Like = () => {
//   return (
//     <Fragment>
//       <Bottom />
//     </Fragment>
//   );
// };

// export default Like;

import React, { useState, useEffect } from "react";
import axios from "axios";
const getParameters = {
  serviceKey:
    "/gSrNLJJIL6v8Agde0RJ3atI7TV+vU21Qn0ptieqzbXotwzXc+vJQNL5yRaiGRa3P6F3pVBU5kW4Ybj36dAULw==",
  returnType: "json",
  numOfRows: "100",
  sidoName: "부산",
  pageNo: "1",
  ver: "1.0",
};
function Like() {
  // loading
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
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

  return <div>ff</div>;
}

export default Like;
