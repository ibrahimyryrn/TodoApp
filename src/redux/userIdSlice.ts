import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserIdState {
  userId: string;
}

export const initialState: UserIdState = { userId: "" };

export const userIdSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    setuserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { setuserId } = userIdSlice.actions;
export default userIdSlice.reducer;
