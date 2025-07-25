import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="xl:ml-[150px]">
      <div className="hidden lg:block w-[250px] sm:w-[200px] space-y-8 border-r border-gray-300 dark:bg-gray-700 dark:border-gray-700 bg-[#f0f0f0] p-5 fixed top-0 left-0 h-screen">
        <div className="mt-20 space-y-8">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="mt-20 sm:w-[400px]  lg:w-[700px] xl:w-[1200px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
