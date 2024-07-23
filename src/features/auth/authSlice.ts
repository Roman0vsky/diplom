import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IInspector from "../../shared/interfaces/inspector";
import IAdmin from "../../shared/interfaces/admin";
import Post from "../../shared/enums/post";

interface IAuthState {
  user: IInspector | IAdmin | null;
}

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

// const admin: IAdmin = {
//   login: "admin",
//   lastName: "admin",
//   firstName: "admin",
//   middleName: "admin",
//   id: 0,
//   workerId: 0,
//   post: Post.ADMIN,
//   region: { name: "region1", id: 1 },
// };

const inspector: IInspector = {
  lastName: "inspector",
  firstName: "inspector",
  middleName: "inspector",
  login: "inspector",
  id: 0,
  workerId: 0,
  post: Post.INSPECTOR,
  region: { name: "region2", id: 2 },
  inspectorId: 0,
};

const initialState: IAuthState = {
  // user: admin,
  user: inspector,
  // user: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (
      state,
      { payload }: PayloadAction<IInspector | IAdmin | null>
    ) => {
      state.user = payload;
    },
    setTokens: (_, { payload }: PayloadAction<ITokens>) => {
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
    },
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});
export const { setUser, setTokens, signOut } = authSlice.actions;
export default authSlice.reducer;
