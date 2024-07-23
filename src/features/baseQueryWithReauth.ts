import baseURL, { ENDPOINTS } from "../shared/endpoints";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { signOut } from "./auth/authSlice";
import IAuthResponse from "../shared/interfaces/authResponse";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseURL}/`,
  prepareHeaders: (headers) => {
    headers.set("ngrok-skip-browser-warning", "69420");
    if (headers.has("authorization")) {
      return headers;
    }
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(refreshToken);

    const refreshResult = await baseQuery(
      {
        url: ENDPOINTS.AUTH.REFRESH_TOKEN,
        // headers: { authorization: `Bearer ${refreshToken}` },
        headers: { Authorization: `Bearer ${refreshToken}` },
      },
      api,
      extraOptions
    );
    const tokens: IAuthResponse = refreshResult.data as IAuthResponse;

    if (tokens) {
      // store the new token in the store or wherever you keep it
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // refresh failed - do something like redirect to login or show a "retry" button
      api.dispatch(signOut());
    }
  }
  return result;
};
