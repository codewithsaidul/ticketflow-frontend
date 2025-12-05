import { baseApi } from "../baseApi";

export const seatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEventSeats: builder.query({
      query: (eventId) => `/seats/${eventId}`,
      providesTags: ["Seat"],
    }),
    syncSeats: builder.mutation({
      query: (data) => ({
        url: "/seats/sync",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetEventSeatsQuery, useSyncSeatsMutation } = seatApi;
