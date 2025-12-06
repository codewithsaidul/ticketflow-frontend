import { baseApi } from "../baseApi";

const EVENTS_BASE_URL = "events";
export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_BASE_URL}`,
        method: "POST",
        body: data
      }),
      
    }),
    getSingleEvent: builder.query({
      query: (slug) => `/events/${slug}`,
      transformResponse: (response) => response.data,
      providesTags: ["Event"],
    }),
    getAllEvents: builder.query({
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
          url: `${EVENTS_BASE_URL}`,
          params: args,
        };
      },
      providesTags: ["Event"],
    }),
    getMyEvents: builder.query({
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
          url: `${EVENTS_BASE_URL}/my-events`,
          params: args,
        };
      },
      providesTags: ["Event"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetSingleEventQuery,
  useGetAllEventsQuery,
  useGetMyEventsQuery,
} = eventApi;
