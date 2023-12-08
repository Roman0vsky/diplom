import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import URL from "../../shared/endpoints";

// interface IProps {
//   login: string;
//   password: string;
// }

// export const userLogin = createAsyncThunk(
//   "auth/login",
//   async ({ login, password }: IProps, thunkAPI) => {
//     try {
//       // configure header's Content-Type as JSON
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const { data } = await axios.post(
//         `${URL}/login`,
//         { login, password },
//         config
//       );
//       // store user's token in local storage
//       localStorage.setItem("userToken", data.userToken);
//       return data;
//     } catch (error) {
//       // return custom error message from API if any
//       if (error instanceof Error && error.message) {
//         return thunkAPI.rejectWithValue(error.message);
//       } else {
//         return thunkAPI.rejectWithValue(error);
//       }
//     }
//   }
// );
