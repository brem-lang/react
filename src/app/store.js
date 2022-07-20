import { configureStore } from "@reduxjs/toolkit";

import slipListSliceReducer from "../features/slip-list/slipListSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    slipList: slipListSliceReducer,
    userData: userReducer,
  },
});
