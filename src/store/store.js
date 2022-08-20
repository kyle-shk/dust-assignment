import { configureStore } from "@reduxjs/toolkit";
import DustReducer from "./dust/DustSlice";
const store = configureStore({
  reducer: { dust: DustReducer },
});

export default store;
