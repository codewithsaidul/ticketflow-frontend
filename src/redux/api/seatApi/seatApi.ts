import { baseApi } from "../baseApi";




export const seatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEventSeats: builder.query({
            query: (eventId) => `/seats/${eventId}`,
            providesTags: ["Seat"]
        })
    })
})


export const { useGetEventSeatsQuery } = seatApi