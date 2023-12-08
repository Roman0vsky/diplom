import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { ENDPOINTS } from "../../shared/endpoints";
import IInspector from "../../shared/interfaces/inspector";

interface ISigninProps {
  login: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/`,
    // credentials: "include",
    prepareHeaders: (headers) => {
      // const token = localStorage.getItem("accessToken");
      // if (token) {
      //   headers.set("authorization", `Bearer ${token}`);
      //   return headers;
      // }
    },
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: ({ login, password }: ISigninProps) => ({
        url: ENDPOINTS.SIGNIN,
        method: "POST",
        body: { login: login, password: password },
      }),
    }),
    getCode: builder.query<string, void>({
      query: () => ({
        url: ENDPOINTS.CODE,
      }),
    }),
    getUser: builder.query<IInspector, void>({
      query: () => ({
        url: ENDPOINTS.USER,
      }),
    }),
  }),
});

export const { useSigninMutation, useGetCodeQuery, useLazyGetUserQuery } =
  authApi;
