import { IApiResponse } from "@/types";
import { baseApi } from "../baseApi";
import { IBooking } from "@/types/bookings.types";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Event", "Seat"],
    }),
    getMyBookings: builder.query<
      IApiResponse<IBooking>,
      Record<string, string> | void
    >({
      query: (params) => ({
        url: "/bookings/my-bookings",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Booking"],
    }),
  }),
});

export const { useCreateBookingMutation, useGetMyBookingsQuery} = bookingApi;
