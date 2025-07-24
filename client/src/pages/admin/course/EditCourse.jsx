import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-lg">
          Add detail information regarding course
        </h1>
        <Link>
          <Button className="hover:text-blue-600" variant="link">
            <Link to="lecture">Go to lectures page</Link>
          </Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  );
};

export default EditCourse;
