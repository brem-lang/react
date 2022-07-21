import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  auth: {},
  persist: JSON.parse(localStorage.getItem("persist")) || false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    usergdata: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { usergdata } = userSlice.actions;

export default userSlice.reducer;
