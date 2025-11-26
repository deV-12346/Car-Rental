import { z } from "zod";

export const carFilterSchema = z.object({
  brand: z.enum([
    "All",            // 👈 Default option
    "Toyota",
    "Honda",
    "Hyundai",
    "Maruti Suzuki",
    "Mahindra",
    "Tata",
    "BMW",
    "Mercedes",
    "Audi",
    "Volkswagen"
  ]).default("All"),

  fuelType: z.enum(["All", "Diesel", "Petrol"]).default("All"),

  transmission: z.enum(["All", "Automatic", "Manual"]).default("All"),

  pricePerDay: z
    .tuple([
      z.number().min(500),
      z.number().max(10000)
    ])
    .default([500, 10000])
});