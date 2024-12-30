import { combineReducers } from "@reduxjs/toolkit";
import {DESTROY_SESSION} from '../Constants/types'
import categorySlice from "./categorySlice";
import authSlice from "./authSlice";
import packageSlice from "./packageSlice";
import dealSlice from "./dealSlice";
import dashbaordSlice from "./dashboardSlice";
import profileSlice from "./profileSlice";
import chatSlice from "./chatSlice";
import preferenceSlice from "./preferenceSlice";
import leadsSlice from "./leadsSlice";
import notificationSlice from "./notificationSlice.js";
import blogSlice from "./blogSlice.js";
import eventSlice from "./eventSlice.js";


const appReducer = combineReducers({
  coupleLogin: authSlice,
  categoryData: categorySlice,
  dealReducer: dealSlice,
  packageReducer: packageSlice,
  dasboardReducer: dashbaordSlice,
  profileReducer : profileSlice,
  chatReducer : chatSlice,
  preferenceReducer : preferenceSlice,
  leadsReducer : leadsSlice,
  notificationReducer : notificationSlice,
  blogReducer:blogSlice,
  eventReducer: eventSlice,
});

const rootReducer = (state, action) => {
    if (action.type === DESTROY_SESSION) {
      state = undefined;
    }
  
    return appReducer(state, action);
  };

  export default rootReducer;