import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PROGRESS_API =
  "https://vite-shadcn-mern-redux-rtkquery.onrender.com/api/v1/progress";

export const courseProgressApi = createApi({
  reducerPath: "courseProgress",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PROGRESS_API,
    credentials: "include", // Fixed typo here
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),

    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
      }),
    }),

    completeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/complete`,
        method: "POST",
      }),
    }),

    inCompleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});

// Exporting hooks for each endpoint
export const {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
  useCompleteCourseMutation,
  useInCompleteCourseMutation,
} = courseProgressApi;
