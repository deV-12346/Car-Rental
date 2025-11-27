"use client";
import React from "react";
import { Cars } from "./BestCars";
import Image from "next/image";
import { Button } from "./ui/button";

interface CarProps {
  car: Cars;
}

const CarCard: React.FC<CarProps> = ({ car }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border">
      <div className="h-48 w-full overflow-hidden">
        <Image
          width={600}
          height={400}
          src={car.images?.[0]?.url || "/no-image.png"}
          alt={car.brand}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4 space-y-2 bg-indigo-50">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {`${car.brand} ${car.carModel}`}
          </h2>
          <span
            className={`outline outline-gray-300 px-3 py-1 text-xs rounded-full ${
              car.available
                ? "bg-green-200 text-green-900"
                : "bg-red-100 text-red-600"
            }`}
          >
            {car.available ? "Available" : "Unavailable"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1 text-sm text-gray-700">
          <p className="font-semibold">
            <span className="font-bold">Fuel:</span> {car.fuelType}
          </p>
          <p className="font-semibold">
            <span className="font-bold">Seats:</span> {car.seats}
          </p>
          <p className="font-semibold">
            <span className="font-bold">Type:</span> {car.type}
          </p>
          <p className="whitespace-nowrap font-semibold">
            <span className="font-bold">Gear:</span> {car.transmission}
          </p>
        </div>
        <p className="text-lg font-bold text-blue-600 mt-2 text-center">
          ₹{car.pricePerDay}/day
        </p>
        <Button className="w-full cursor-pointer">Check Availabilty</Button>
      </div>
    </div>
  );
};

export default CarCard;