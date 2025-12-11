import { baseApi } from "../baseApi";

const ADMIN_URL = "/admins";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (payload) => ({
        url: `${ADMIN_URL}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    getAllAdmins: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              params.append(key, String(value));
            }
          });
        }

        return {
          url: `${ADMIN_URL}`,
          params: args,
        };
      },
      providesTags: ["User"],
    }),
    updateAdmin: build.mutation({
      query: ({ staffId, payload}) => ({
        url: `${ADMIN_URL}/${staffId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllAdminsQuery, useCreateAdminMutation, useUpdateAdminMutation } = adminApi;
