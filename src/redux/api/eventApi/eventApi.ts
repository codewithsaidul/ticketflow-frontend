import { baseApi } from "../baseApi";

const EVENTS_BASE_URL = "events";
export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleEvent: builder.query({
      query: (slug) => `/events/${slug}`,
      transformResponse: (response) => response.data,
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

export const { useGetSingleEventQuery, useGetMyEventsQuery } = eventApi;
