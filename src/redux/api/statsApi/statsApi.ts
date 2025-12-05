import { baseApi } from "../baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: (role) => `/stats?role=${role}`,
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = statsApi;
