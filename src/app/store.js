import { configureStore } from "@reduxjs/toolkit";

import slipListSliceReducer from "../features/slip-list/slipListSlice";
<<<<<<< HEAD
import userReducer from "../features/user/userSlice";
=======
>>>>>>> main

export const store = configureStore({
  reducer: {
    slipList: slipListSliceReducer,
<<<<<<< HEAD
    userData: userReducer,
=======
>>>>>>> main
  },
});
