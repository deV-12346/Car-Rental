"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[250px] md:h-[400px] rounded-2xl overflow-hidden mt-4 shadow-lg">
      <Image
        src="/car-banner.jpg"
        alt="Luxury Car"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
          Rent Your Dream Car Today
        </h1>

        <p className="text-gray-200 mt-3 max-w-xl text-sm md:text-lg">
          Choose from a wide collection of premium, luxury and budget-friendly cars.
          Hassle-free booking with instant confirmation.
        </p>

        <Link
          href="/cars"
          className="mt-6 bg-blue-500 hover:bg-blue-200 text-white px-6 py-3 rounded-full text-sm md:text-base font-semibold shadow-md transition"
        >
          Browse Cars
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;