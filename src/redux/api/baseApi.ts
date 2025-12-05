import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRefresh } from '../baseQueryWithRefresh';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['User', 'Event', 'Seat', 'Booking', "Stats"],
  endpoints: () => ({}),
});