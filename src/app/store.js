import { configureStore } from "@reduxjs/toolkit";

import slipListSliceReducer from "../features/slip-list/slipListSlice";

export const store = configureStore({
  reducer: {
    slipList: slipListSliceReducer,
  },
});
