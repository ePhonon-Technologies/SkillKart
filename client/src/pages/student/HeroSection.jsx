import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-16 px-4 text-center  ">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the best course for you
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow"
        >
          <Input
            type="text"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
          />
          <Button
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 "
          >
            Search
          </Button>
        </form>
        <Button onClick={()=> navigate(`/course/search?query`)} className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200 mt-4">
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
