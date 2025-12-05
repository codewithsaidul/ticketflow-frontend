import { baseApi } from "../baseApi";




export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleEvent: builder.query({
            query: (slug) => `/events/${slug}`,
            transformResponse: (response) => response.data,
            providesTags: ["Event"]
        })
    })
})


export const { useGetSingleEventQuery } = eventApi