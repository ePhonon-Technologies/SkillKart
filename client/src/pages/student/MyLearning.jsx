import React from "react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const {data, isLoading} = useLoadUserQuery();

  const myLearning = data?.user.enrolledCourses || [];
  return (
    <div className="max-w-4xl mx-auto mt-14 px-4 md:px-0">
      <h1 className="font-bold text-2xl text-left mb-2">My learning</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, index) => (
            <MyLearningSkeleton />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[750px]">
          {myLearning.map((course, index) => (
            <Course course={course}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => {
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
