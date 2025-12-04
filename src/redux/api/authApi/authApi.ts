import { baseApi } from "../baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload) => {
        return {
          url: `${AUTH_URL}/login`,
          method: "POST",
          body: payload,
          credentials: "include",
        };
      },
      invalidatesTags: ["User"],
    }),
    me: build.query({
      query: () => {
        return {
          url: `${AUTH_URL}/me`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["User"],
    }),
    logout: build.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useMeQuery,
  useLogoutMutation,
} = authApi;