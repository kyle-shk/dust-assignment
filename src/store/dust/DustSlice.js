import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const grade = [
  { gradeId: 1, grade: "좋음" },
  { gradeId: 2, grade: "보통" },
  { gradeId: 3, grade: "한때나쁨" },
  { gradeId: 4, grade: "나쁨" },
  { gradeId: 5, grade: "매우나쁨" },
];

const color = [
  { colorId: 1, color: "red" },
  { colorId: 2, color: "orange" },
  { colorId: 3, color: "yellow" },
  { colorId: 4, color: "green" },
  { colorId: 5, color: "pink" },
];

const getParameters = {
  serviceKey:
    "NBT6s4Vm9gPYCFRPOZqhwc9NdkKxfn37mMu4hY5VVPi04mz7D19xPBBIwzyJ9ArHshPPQcBKJxufOw9CXm82pw==",
  //     "아까 위에서 일반 인증키 (Encoding) 이라고 되어있던 부분을 여기 입력해주세요.",
  returnType: "json",
  numOfRows: "100",
  pageNo: "1",

  ver: "1.0",
};

const POST_URL = "B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";

export const fetchData = createAsyncThunk("dust/fetchData", async (sido) => {
  try {
    const response = await axios.get(
      POST_URL,

      { params: { ...getParameters, sidoName: sido } }
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
    stationName: null,
    // dataTime: null,
    // pm10Grade: null,
    // pm10Value: null,
    // sidoName: null,
    data: [],
    initialdata: [],
    status: "idle",
    error: null,
    grade: grade,
    color: color,
    newArray: [],
    like: false,
    isLoading: false,
  },
  reducers: {
    filterGuGunDatas(state, action) {
      state.stationName = action.payload;
      // state.initialdata = state.data.filter(
      //   (item) => item.stationName === state.stationName
      // );
    },
  },
  extraReducers: {
    [fetchData.pending]: (state, action) => {
      state.isLoading = true;
      state.status = "loading";
      console.log("pending");
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = "succedded";

      state.data = action.payload;
      state.initialdata = action.payload.map((content) => {
        const datacolor = state.color.filter(
          (color) => color.colorId === parseInt(content.pm10Grade)
        );
        const datagrade = state.grade.filter(
          (grade) => grade.gradeId === parseInt(content.pm10Grade)
        );
        return { ...content, datacolor, datagrade };
      }, {});
      state.isLoading = false;
    },
    [fetchData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// export default dustSlice.actions;
export default dustSlice.reducer;
export const { filterGuGunDatas } = dustSlice.actions;
