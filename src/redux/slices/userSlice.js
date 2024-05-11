import { createSlice } from "@reduxjs/toolkit";
import { getDecodedToken } from "../../config/ApiConfig";

const userData = getDecodedToken();

const initialState = {
  isLoggedIn: false,
  user: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // if (userData) {
      state.isLoggedIn = true;
      state.user = action.payload;
      // }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
