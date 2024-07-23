import { createApi } from "@reduxjs/toolkit/query/react";
import { ENDPOINTS } from "../../shared/endpoints";
import IClient from "../../shared/interfaces/client";
import ISocialWorker from "../../shared/interfaces/socialWorker";
import FunctionalClass from "../../shared/enums/functionalClassRUS";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import ISocialWorkerAssignedToClient from "../../shared/interfaces/socialWorkerAssignedToClient";
import INurse from "../../shared/interfaces/nurse";
import ICategory from "../../shared/interfaces/category";
import IInspectorReport from "../../shared/interfaces/inspectorReport";
import ISocialWorkerReport from "../../shared/interfaces/socialWorkerReport";

export const inspectorApi = createApi({
  reducerPath: "inspectorApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["SocialWorkers", "Clients", "Coordinates", "Nurses", "Favors"],
  endpoints: (builder) => ({
    getSocialWorker: builder.query<ISocialWorker, number>({
      query: (id) => ({
        url: `${ENDPOINTS.INSPECTOR.SOCIAL_WORKER}/${id}`,
      }),
      providesTags: ["SocialWorkers"],
    }),
    getSocialWorkers: builder.query<ISocialWorker[], number>({
      query: (id) => ({
        url: `${ENDPOINTS.INSPECTOR.SOCIAL_WORKERS}/${id}`,
      }),
      providesTags: ["SocialWorkers"],
    }),
    getSocialWorkersByRegionID: builder.query<ISocialWorker[], number>({
      query: (regionId) => ({
        url: `${ENDPOINTS.INSPECTOR.SOCIAL_WORKERS_BY_REGION_ID}/${regionId}`,
      }),
      providesTags: ["SocialWorkers"],
    }),
    getSocialWorkersAssignedToClient: builder.query<
      ISocialWorkerAssignedToClient[],
      number
    >({
      query: (clientId) => ({
        url: `${ENDPOINTS.INSPECTOR.SOCIAL_WORKERS_ASSIGNED_TO_CLIENT}?id=${clientId}&getLast=false`,
      }),
      providesTags: ["SocialWorkers"],
    }),
    getUnFinishedSocialWorkerAssignedToClient: builder.query<
      ISocialWorkerAssignedToClient,
      number
    >({
      query: (clientId) => ({
        url: `${ENDPOINTS.INSPECTOR.SOCIAL_WORKERS_ASSIGNED_TO_CLIENT}?id=${clientId}&getLast=true`,
      }),
      providesTags: ["SocialWorkers"],
    }),
    createSocialWorker: builder.mutation<void, ISocialWorker>({
      query: (socialWorker) => ({
        url: ENDPOINTS.INSPECTOR.SOCIAL_WORKERS,
        method: "POST",
        body: {
          lastName: socialWorker.lastName,
          firstName: socialWorker.firstName,
          middleName: socialWorker.middleName,
          post: socialWorker.post,
          inspectorId: socialWorker.inspectorId,
        },
      }),
      invalidatesTags: ["SocialWorkers"],
    }),
    updateSocialWorker: builder.mutation<void, ISocialWorker>({
      query: (socialWorker) => ({
        url: `${ENDPOINTS.INSPECTOR.SOCIAL_WORKERS}/${socialWorker.workerId}`,
        method: "PATCH",
        body: {
          lastName: socialWorker.lastName,
          firstName: socialWorker.firstName,
          middleName: socialWorker.middleName,
        },
      }),
      invalidatesTags: ["SocialWorkers"],
    }),
    deleteSocialWorker: builder.mutation<void, number>({
      query: (id) => ({
        url: `web/workers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SocialWorkers"],
    }),
    getClients: builder.query<IClient[], void | number>({
      query: (regionId) => ({
        url: regionId
          ? `${ENDPOINTS.INSPECTOR.CLIENTS_BY_REGION_ID}/${regionId}`
          : ENDPOINTS.INSPECTOR.CLIENTS,
      }),
      providesTags: ["Clients"],
    }),
    createClient: builder.mutation<
      void,
      {
        firstName: string;
        middleName: string;
        lastName: string;
        address: string;
        functionalClass: FunctionalClass | string;
        regionId: number;
        gpwVeteran: boolean;
        warVictim: boolean;
        lonelyInvalid: boolean;
        lonelyOldPerson: boolean;
        cottage: boolean;
      }
    >({
      query: (client) => ({
        url: ENDPOINTS.INSPECTOR.CLIENT,
        method: "POST",
        body: client,
      }),
      invalidatesTags: ["Clients"],
    }),
    updateClient: builder.mutation<
      void,
      {
        firstName: string;
        middleName: string;
        lastName: string;
        address: string;
        functionalClass: FunctionalClass | string;
        regionId: number;
        gpwVeteran: boolean;
        warVictim: boolean;
        lonelyInvalid: boolean;
        lonelyOldPerson: boolean;
        cottage: boolean;
        id: number;
      }
    >({
      query: ({ id, ...client }) => ({
        url: `${ENDPOINTS.INSPECTOR.CLIENT}/${id}`,
        method: "PATCH",
        body: client,
      }),
      invalidatesTags: ["Clients"],
    }),
    deleteClient: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.INSPECTOR.CLIENT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
    assignSocialworker: builder.mutation<
      void,
      { clientId: number; socialWorkerId: number }
    >({
      query: (args) => ({
        url: ENDPOINTS.INSPECTOR.ASSIGN_SOCIAL_WORKER,
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["SocialWorkers"],
    }),
    detachSocialworker: builder.mutation<
      void,
      { clientId: number; socialWorkerId: number }
    >({
      query: (args) => ({
        url: ENDPOINTS.INSPECTOR.DETACH_SOCIAL_WORKER,
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["SocialWorkers"],
    }),
    getNurses: builder.query<INurse[], number>({
      query: (clientId) => ({
        url: `${ENDPOINTS.INSPECTOR.NURSE}?clientId=${clientId}`,
      }),
      providesTags: ["Nurses"],
    }),
    createNurse: builder.mutation<void, { clientId: number; month: Date }>({
      query: (nurse) => ({
        url: ENDPOINTS.INSPECTOR.NURSE,
        method: "POST",
        body: nurse,
      }),
      invalidatesTags: ["Nurses"],
    }),
    deleteNurse: builder.mutation<void, number>({
      query: (nurseId) => ({
        url: `${ENDPOINTS.INSPECTOR.NURSE}/${nurseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Nurses"],
    }),
    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: ENDPOINTS.INSPECTOR.CATEGORIES,
      }),
      providesTags: ["Favors"],
    }),
    createCategory: builder.mutation<void, { name: string; shortName: string }>(
      {
        query: (category) => ({
          url: ENDPOINTS.INSPECTOR.CATEGORIES,
          method: "POST",
          body: category,
        }),
        invalidatesTags: ["Favors"],
      }
    ),
    updateCategory: builder.mutation<
      void,
      { id: number; name: string; shortName: string }
    >({
      query: ({ id, ...category }) => ({
        url: `${ENDPOINTS.INSPECTOR.CATEGORIES}/${id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: ["Favors"],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.INSPECTOR.CATEGORIES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favors"],
    }),
    createFavour: builder.mutation<
      void,
      {
        name: string;
        shortName: string;
        categoryId: number;
        normDescription: string;
        functionalClasses: string[];
      }
    >({
      query: (favour) => ({
        url: ENDPOINTS.INSPECTOR.FAVORS,
        method: "POST",
        body: favour,
      }),
      invalidatesTags: ["Favors"],
    }),
    updateFavour: builder.mutation<
      void,
      {
        id: number;
        name: string;
        shortName: string;
        categoryId: number;
        normDescription: string;
        functionalClasses: string[];
      }
    >({
      query: ({ id, ...favour }) => ({
        url: `${ENDPOINTS.INSPECTOR.FAVORS}/${id}`,
        method: "PATCH",
        body: favour,
      }),
      invalidatesTags: ["Favors"],
    }),
    deleteFavour: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.INSPECTOR.FAVORS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favors"],
    }),
    getInspectorReport: builder.mutation<
      IInspectorReport,
      { year: number; month: number }
    >({
      query: (data) => ({
        method: "POST",
        url: ENDPOINTS.INSPECTOR.INSPECTOR_REPORT,
        body: data,
      }),
    }),
    getSocialWorkerReport: builder.mutation<
      ISocialWorkerReport,
      { year: number; month: number; id: number }
    >({
      query: ({ id, ...data }) => ({
        method: "POST",
        url: `${ENDPOINTS.INSPECTOR.SOCIAL_WORKER_REPORT}/${id}`,
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSocialWorkerQuery,
  useGetSocialWorkersQuery,
  useGetSocialWorkersByRegionIDQuery,
  useGetSocialWorkersAssignedToClientQuery,
  useGetUnFinishedSocialWorkerAssignedToClientQuery,
  useCreateSocialWorkerMutation,
  useUpdateSocialWorkerMutation,
  useDeleteSocialWorkerMutation,

  useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,

  useAssignSocialworkerMutation,
  useDetachSocialworkerMutation,

  useGetNursesQuery,
  useCreateNurseMutation,
  useDeleteNurseMutation,

  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateFavourMutation,
  useUpdateFavourMutation,
  useDeleteFavourMutation,

  useGetInspectorReportMutation,
  useGetSocialWorkerReportMutation,
} = inspectorApi;
