import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API =
  "https://vite-shadcn-mern-redux-rtkquery.onrender.com/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch-Creator_Course", "Refetch-Lectures"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "/",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch-Creator_Course"],
    }),

    getSearchCourse: builder.query({
      query: ({ query, categories, sortByPrice }) => {
        //build query string

        let queryString = `/search?query=${encodeURIComponent(query)}`;

        //append category
        if (categories && categories.length > 0) {
          queryString += `&categories=${categories
            .map(encodeURIComponent)
            .join(",")}`;
        }

        //append sort by price if available
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return {
          url: queryString,
          method: "GET",
        };
      },
    }),

    getPublishedCourse: builder.query({
      query: () => ({
        url: "/published-courses",
        method: "GET",
      }),
      providesTags: ["Refetch-Creator_Course", "Refetch-Lectures"],
    }),

    getCourse: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Refetch-Creator_Course", "Refetch-Lectures"],
    }),

    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch-Creator_Course"],
    }),

    getCourseById: builder.query({
      query: (courseId) => ({
        url: `${courseId}`,
        method: "GET",
      }),
      providesTags: ["Refetch-Creator_Course", "Refetch-Lectures"],
    }),

    createLecture: builder.mutation({
      query: ({ courseId, lectureTitle }) => ({
        url: `${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
      invalidatesTags: ["Refetch-Lectures"],
    }),

    getLecture: builder.query({
      query: (courseId) => ({
        url: `${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch-Lectures"],
    }),

    editLecture: builder.mutation({
      query: ({
        lectureTitle,
        videoInfo,
        isPreviewFree,
        courseId,
        lectureId,
      }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
      invalidatesTags: ["Refetch-Lectures"],
    }),

    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch-Lectures"],
    }),

    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
      providesTags: ["Refetch-Lectures"],
    }),

    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Refetch-Creator_Course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useGetPublishedCourseQuery,
  useGetSearchCourseQuery,
} = courseApi;
