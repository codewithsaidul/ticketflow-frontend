import { baseApi } from "../baseApi";

const PAYMENT_BASE_URL = "/payment";


export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initPayment: builder.mutation({
      query: (bookingId) => ({
        url: `${PAYMENT_BASE_URL}/init-payment/${bookingId}`,
        method: "POST",
      }),
      invalidatesTags: ["Event", "Seat", "Booking"],
    }),
  }),
});

export const { useInitPaymentMutation } = bookingApi;
