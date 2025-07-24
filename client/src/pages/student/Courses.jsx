import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect } from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { toast } from "sonner";

const courses = [1, 2, 3, 4, 5, 6, 7, 8];

const Courses = () => {
  const { data, isLoading, isSuccess, error } = useGetPublishedCourseQuery();
  console.log(data);

  if (error) {
    toast.error(error.data?.message);
    return <h1>Some error occured while fetching courses </h1>;
  }

  return (
    <div className="bg-gray-50 w-full h-screen dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our courses</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
            {courses.length === 0 ? (
              <h1>You haven't enrolled yet</h1>
            ) : (
              <>
                {data?.courses &&
                  data.courses.map((course, index) => <Course course={course}/>)}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
