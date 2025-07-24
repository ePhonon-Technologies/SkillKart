import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
