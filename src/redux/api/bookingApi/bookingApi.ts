import { baseApi } from "../baseApi";




export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (data) => ({
                url: "/bookings",
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Event", "Seat"]
        })
    })
})


export const { useCreateBookingMutation } = bookingApi