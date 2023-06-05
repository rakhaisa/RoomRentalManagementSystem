import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Tenants",
    "Dashboard",
     /*"Rooms",
    "Payments",
    "Invoice",
    "Messages",
    "Maintenance",
    "Tasks",
    "Reports",
    "Performance",*/
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["user"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
      
  }),
});

export const {
  useGetUserQuery,
  useGetDashboardQuery,
 
} = api;