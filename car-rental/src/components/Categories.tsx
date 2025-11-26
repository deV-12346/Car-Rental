"use client";
import React from "react";
import { FaCarSide, FaBolt, FaBus} from "react-icons/fa";

const categories = [
  { title: "SUV", icon: <FaCarSide className="text-3xl text-blue-500" /> },
  { title: "Electric", icon: <FaBolt className="text-3xl text-green-500" /> },
  { title: "Luxury", icon: <FaCarSide className="text-3xl text-yellow-500" /> },
  { title: "Family", icon: <FaBus className="text-3xl text-purple-500" /> },
];

const Categories = () => {
  return (
    <div className="mt-10">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
        Popular Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-4 flex flex-col justify-center items-center hover:shadow-md transition cursor-pointer"
          >
            {cat.icon}
            <p className="mt-2 font-medium text-gray-700">{cat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
