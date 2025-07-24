import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const COURSE_PURCHASE_API =
  "https://vite-shadcn-mern-redux-rtkquery.onrender.com/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi", // Corrected from `reducePath` to `reducerPath`
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/create-checkout-session",
        method: "POST",
        body: { courseId },
      }),
    }),

    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),

    getPurchasedCourses: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseApi;
