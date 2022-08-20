import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const grade = {
  1: "좋음",
  2: "보통",
  3: "한때나쁨",
  4: "나쁨",
  5: "매우나쁨",
};

const color = {
  1: "red",
  2: "orange",
  3: "yellow",
  4: "green",
  5: "blue",
};

const getParameters = {
  serviceKey:
    "NBT6s4Vm9gPYCFRPOZqhwc9NdkKxfn37mMu4hY5VVPi04mz7D19xPBBIwzyJ9ArHshPPQcBKJxufOw9CXm82pw==",
  //     "아까 위에서 일반 인증키 (Encoding) 이라고 되어있던 부분을 여기 입력해주세요.",
  returnType: "json",
  numOfRows: "100",
  pageNo: "1",
  sidoName: "서울",
  ver: "1.0",
};

const POST_URL = "B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";

export const fetchData = createAsyncThunk("dust/fetchData", async () => {
  try {
    const response = await axios.get(
      POST_URL,

      { params: getParameters }
    );

    const post = response.data.response.body.items;
    console.log("post: ", post);
    return post;
  } catch (err) {
    return err.message;
  }
});

const dustSlice = createSlice({
  name: "dust",
  initialState: {
    // stationName: null,
    // dataTime: null,
    // pm10Grade: null,
    // pm10Value: null,
    // sidoName: null,
    data: [],
    status: "idle",
    error: null,
    grade: grade,
    color: color,
    newArray: [],
    like: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [fetchData.pending]: (state, action) => {
      state.isLoading = true;
      state.status = "loading";
      console.log("pending");
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = "succedded";
      state.data = action.payload;
      state.isLoading = false;
      // state.stationName = action.payload
      // state.dataTime = action.payload
      // state.pm10Grade = action.payload
      // state.pm10Value = action.payload
      // state.sidoName = action.payload
    },
    [fetchData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// export default dustSlice.actions;
export default dustSlice.reducer;
