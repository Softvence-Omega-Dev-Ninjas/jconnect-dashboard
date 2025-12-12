import { baseApi } from "../../api/baseApi";


export const disputesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDisputes: builder.query<void, void>({
      query: () => "/disputes",
      providesTags: ["Disputes"],
    }),
  }),
});

export const { useGetDisputesQuery } = disputesApi;