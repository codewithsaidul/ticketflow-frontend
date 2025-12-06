import { baseApi } from "../baseApi";

const BOOKINGS_BASE_URL = "/bookings";
export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: `${BOOKINGS_BASE_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Event", "Seat", "Booking"],
    }),
    getMyBookings: builder.query({
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
          url: `${BOOKINGS_BASE_URL}/my-bookings`,
          params: args,
        };
      },
      providesTags: ["Booking"],
    }),
    getHostBookings: builder.query({
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
          url: `${BOOKINGS_BASE_URL}/host-bookings`,
          params: args,
        };
      },
      providesTags: ["Booking"]
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetHostBookingsQuery,
} = bookingApi;
