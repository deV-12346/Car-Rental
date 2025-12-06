"use client";

import type { Cars } from "@/components/BestCars";
import CarCard from "@/components/CarCard";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carFilterSchema } from "@/schema/filterSchema";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const Cars = () => {
  const [cars, setCars] = useState<Cars[]>([]);
  const [originalCars, setOriginalCars] = useState<Cars[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const form = useForm({
    resolver: zodResolver(carFilterSchema),
    defaultValues: {
      brand: "All",
      fuelType: "All",
      transmission: "All",
      pricePerDay: [500, 10000],
    },
  });

  const applyFilters = () => {
    const values = form.getValues();

    const brand = values.brand ?? "All";
    const fuel = values.fuelType ?? "All";
    const trans = values.transmission ?? "All";
    const [min, max] = values.pricePerDay ?? [500, 10000];

    let filtered = [...originalCars];

    // BRAND
    if (brand !== "All") {
      filtered = filtered.filter(
        (car) => car.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    // FUEL
    if (fuel !== "All") {
      filtered = filtered.filter((car) => car.fuelType === fuel);
    }

    // TRANSMISSION
    if (trans !== "All") {
      filtered = filtered.filter((car) => car.transmission === trans);
    }

    // PRICE
    filtered = filtered.filter(
      (car) => car.pricePerDay >= min && car.pricePerDay <= max
    );

    setCars(filtered);
  };

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await axios.get<ApiResponse<Cars[]>>("/api/car/getCar");

        if (res.data.success) {
          setCars(res.data.data || []);
          setOriginalCars(res.data.data || []);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse<Cars[]>>;
        toast.error(
          axiosError.response?.data.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);

    if (showFilter === true) {
      // closing the filter
      setCars(originalCars);
      form.reset({
        brand: "All",
        fuelType: "All",
        transmission: "All",
        pricePerDay: [500, 10000],
      });
    }
  };

  return (
    <div className="px-4 py-4 bg-gray-50">
      <div className="flex justify-evenly items-center mb-4">
        <h2 className="text-xl font-semibold">Available Cars</h2>
        <Button onClick={toggleFilter} className="w-30 py-3">
          {showFilter ? "Close Filter" : "Open Filter"}
        </Button>
      </div>
      {showFilter && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(applyFilters)}
            className="w-full max-w-md mx-auto border rounded-xl p-6 mt-6 grid gap-4 shadow-sm"
          >
            {/* BRAND */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Toyota">Toyota</SelectItem>
                      <SelectItem value="Honda">Honda</SelectItem>
                      <SelectItem value="Hyundai">Hyundai</SelectItem>
                      <SelectItem value="Maruti Suzuki">
                        Maruti Suzuki
                      </SelectItem>
                      <SelectItem value="Mahindra">Mahindra</SelectItem>
                      <SelectItem value="Tata">Tata</SelectItem>
                      <SelectItem value="BMW">BMW</SelectItem>
                      <SelectItem value="Mercedes">Mercedes</SelectItem>
                      <SelectItem value="Audi">Audi</SelectItem>
                      <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FUEL */}
            <FormField
              control={form.control}
              name="fuelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuel Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TRANSMISSION */}
            <FormField
              control={form.control}
              name="transmission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transmission</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PRICE RANGE */}
            <FormField
              control={form.control}
              name="pricePerDay"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Price Per Day (₹500 - ₹10000)</FormLabel>

                  <FormControl>
                    <Slider
                      min={500}
                      max={10000}
                      step={100}
                      value={field.value ?? [500, 10000]}
                      onValueChange={(v) => field.onChange(v)}
                    />
                  </FormControl>

                  <p className="text-sm mt-2">
                    ₹{(field.value ?? [500, 10000])[0]} — ₹
                    {(field.value ?? [500, 10000])[1]}
                  </p>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="col-span-3 w-full" type="submit">
              Apply Filters
            </Button>
          </form>
        </Form>
      )}

      {loading ? (
        <div className="w-full flex justify-center items-center text-2xl">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="w-full py-4 grid grid-cols-1 md:grid-cols-5 gap-6 place-items-center">
          {cars.map((car, idx) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: idx * 0.5 }}
              viewport={{ once: true }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;