import { createApi } from "@reduxjs/toolkit/query/react";
import { ENDPOINTS } from "../../shared/endpoints";
import IInspector from "../../shared/interfaces/inspector";
import IAdmin from "../../shared/interfaces/admin";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import IPassword from "../../shared/interfaces/password";

interface ISigninProps {
  login: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: ({ login, password }: ISigninProps) => ({
        url: ENDPOINTS.AUTH.SIGNIN,
        method: "POST",
        body: { login: login, password: password },
      }),
    }),
    getUser: builder.mutation<IInspector | IAdmin, void>({
      query: () => ({
        url: ENDPOINTS.AUTH.USER,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: ENDPOINTS.AUTH.PERSONAL_INFO,
        method: "PATCH",
        body: data,
      }),
    }),
    updatePassword: builder.mutation<void, IPassword>({
      query: (data) => ({
        url: ENDPOINTS.AUTH.PASSWORD,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useGetUserMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
} = authApi;
