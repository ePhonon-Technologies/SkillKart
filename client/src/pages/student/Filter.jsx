import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import React, { useState } from "react";

const categories = [
  { id: "next", label: "NEXT JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Developement" },
  { id: "full stack developement", label: "Full Stack Developement" },
  { id: "docker", label: "Docker" },
];

const Filter = ({ handleFilterChange, query }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter options</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to high</SelectItem>
              <SelectItem value="high">High to low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      {query && (
        <div>
          <h1 className="font-semibold mb-2">CATEGORY</h1>
          {categories.map((category) => (
            <div className="flex items-center space-x-2 my-2">
              <Checkbox
                id={category.id}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
