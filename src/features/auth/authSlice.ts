import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IInspector from "../../shared/interfaces/inspector";
import Post from "../../shared/enums/post";

interface IAuthState {
  user: IInspector | null;
}

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

const admin: IInspector = {
  firstName: "admin",
  middleName: "admin",
  lastName: "admin",
  post: Post.ADMIN,
  regionId: 0,
};

const inspector: IInspector = {
  firstName: "inspector",
  middleName: "inspector",
  lastName: "inspector",
  post: Post.INSPECTOR,
  regionId: 1,
};

const initialState: IAuthState = {
  // user: admin,
  user: inspector,
  // user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IInspector>) => {
      state.user = payload;
    },
    setTokens: (_, { payload }: PayloadAction<ITokens>) => {
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
    },
    signOut: (state) => {
      state.user = null;
      localStorage.setItem("accessToken", "");
      localStorage.setItem("refreshToken", "");
    },
  },
  extraReducers: {
    // [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
    //   state.isLoading = false;
    //   state.users = action.payload;
    //   state.error = "";
    // },
    // [fetchUsers.pending.type]: (state) => {
    //   state.isLoading = true;
    // },
    // [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});
export const { setUser, setTokens, signOut } = authSlice.actions;
export default authSlice.reducer;
