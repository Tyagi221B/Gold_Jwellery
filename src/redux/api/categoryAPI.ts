import { MessageResponse, NewCategoryResponse } from "@/types/api-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryAPI = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/category/`,
  }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    allCategory: builder.query({
      query: () => "all",
      providesTags: ["category"],
    }),

    newCategory: builder.mutation<MessageResponse, NewCategoryResponse>({
      query: ({ id, cateforyFormData }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: cateforyFormData,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useAllCategoryQuery,
  useNewCategoryMutation,
} = categoryAPI;
