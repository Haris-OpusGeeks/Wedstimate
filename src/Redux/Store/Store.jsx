import { configureStore } from "@reduxjs/toolkit";
// import blogSlice from "../Reducers/blogSlice";
import rootReducer from "../Reducers/rootReducer";

const store = configureStore({
    reducer: rootReducer
  });
 export default store;