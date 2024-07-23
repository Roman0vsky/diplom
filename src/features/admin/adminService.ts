import { createApi } from "@reduxjs/toolkit/query/react";
import { ENDPOINTS } from "../../shared/endpoints";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import IInspector from "../../shared/interfaces/inspector";
import IRegion from "../../shared/interfaces/region";
import Post from "../../shared/enums/post";
import IAdminReport from "../../shared/interfaces/adminReport";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Inspectors", "Regions"],
  endpoints: (builder) => ({
    getCode: builder.mutation<{ code: string }, number | string>({
      query: (id) => ({
        url: `${ENDPOINTS.ADMIN.CODE}/${id}`,
        method: "POST",
      }),
    }),
    getInspectors: builder.query<IInspector[], void>({
      query: () => ({
        url: ENDPOINTS.ADMIN.INSPECTORS,
      }),
      providesTags: ["Inspectors"],
    }),
    createInspector: builder.mutation<void, IInspector>({
      query: (inspector) => ({
        url: ENDPOINTS.ADMIN.INSPECTORS,
        method: "POST",
        body: {
          lastName: inspector.lastName,
          firstName: inspector.firstName,
          middleName: inspector.middleName,
          login: inspector.login,
          regionId: inspector.region.id,
          post: Post.INSPECTOR,
        },
      }),
      invalidatesTags: ["Inspectors"],
    }),
    updateInspector: builder.mutation<void, IInspector>({
      query: (inspector) => ({
        url: `${ENDPOINTS.ADMIN.INSPECTORS}/${inspector.workerId}`,
        method: "PATCH",
        body: {
          lastName: inspector.lastName,
          firstName: inspector.firstName,
          middleName: inspector.middleName,
          regionId: inspector.region.id,
        },
      }),
      invalidatesTags: ["Inspectors"],
    }),
    deleteInspector: builder.mutation<void, number>({
      query: (id) => ({
        url: `web/workers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inspectors"],
    }),
    getRegions: builder.query<IRegion[], void>({
      query: () => ({
        url: ENDPOINTS.ADMIN.REGIONS,
      }),
      providesTags: ["Regions"],
    }),
    createRegion: builder.mutation<void, string>({
      query: (name) => ({
        url: ENDPOINTS.ADMIN.REGIONS,
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["Regions"],
    }),
    updateRegion: builder.mutation<void, IRegion>({
      query: (region) => ({
        url: `${ENDPOINTS.ADMIN.REGIONS}/${region.id}`,
        method: "PATCH",
        body: { name: region.name },
      }),
      invalidatesTags: ["Regions"],
    }),
    deleteRegion: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.ADMIN.REGIONS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Regions"],
    }),
    getAdminReport: builder.mutation<
      IAdminReport,
      { year: number; month: number }
    >({
      query: (data) => ({
        method: "POST",
        url: ENDPOINTS.ADMIN.REPORT,
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCodeMutation,

  useGetInspectorsQuery,
  useCreateInspectorMutation,
  useUpdateInspectorMutation,
  useDeleteInspectorMutation,

  useGetRegionsQuery,
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,

  useGetAdminReportMutation,
} = adminApi;
