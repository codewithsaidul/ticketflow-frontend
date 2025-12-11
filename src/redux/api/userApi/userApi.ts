import { baseApi } from "../baseApi";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
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
          url: `${USER_URL}`,
          params: args,
        };
      },
      providesTags: ["User"],
    }),
    updateUserStatus: build.mutation({
      query: ({ userId, status}) => ({
        url: `${USER_URL}/${userId}/userStatus`,
        method: "PATCH",
        body: status
      }),
      invalidatesTags: ["User"]
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["User"]
    })
  }),
});

export const { useGetAllUsersQuery, useUpdateUserStatusMutation, useDeleteUserMutation } = userApi;
