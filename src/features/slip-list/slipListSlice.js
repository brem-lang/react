import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  miList: [],
  mroList: [],
  dmList: [],
  faList: [],
  fgList: [],
  maList: [],
  mrList: [],
  serviceCall: [],
  miRList: [],
  scList: [],
  mroRList: [],
  dmRList: [],
  fgRList: [],
  faRList: [],
  maRList: [],
  slipState: true,
};

export const listSlice = createSlice({
  name: "slipList",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    miListData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { miListData } = listSlice.actions;

export default listSlice.reducer;
