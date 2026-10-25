import type { IUser } from "@/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  user: IUser | null;
  loading: boolean;
}

const initialState: IUserState = {
  user: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, logoutUser } = userSlice.actions;

export default userSlice.reducer;
